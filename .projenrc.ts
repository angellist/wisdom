import { awscdk, javascript } from 'projen';
import { Job, JobPermission } from 'projen/lib/github/workflows-model';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'William Czubakowski',
  authorAddress: 'williamczuba@gmail.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.2.0',
  name: 'parent-child-pipelines',
  projenrcTs: true,
  repositoryUrl: 'git@github.com:angellist/parent-child-pipelines.git',
  docgen: true,
  dependabot: true,
  packageManager: javascript.NodePackageManager.BUN,
  prettier: true,
  prettierOptions: {
    settings: {
      bracketSameLine: true,
      bracketSpacing: true,
      jsxSingleQuote: true,
      singleQuote: true,
    },
  },
  eslintOptions: {
    prettier: true,
    tsconfigPath: './tsconfig.dev.json',
    dirs: ['src', 'test', 'example'],
  },
  tsconfigDev: {
    include: ['src', 'test', 'example'],
    compilerOptions: {
      rootDir: 'src',
      outDir: 'dist',
    },
  },
  deps: [
    '@aws-sdk/credential-providers',
    '@aws-sdk/client-codepipeline',
    'aws-cdk-lib@^2.96.0',
  ],
  peerDeps: ['aws-cdk-lib@^2.96.0'],
  bundledDeps: [
    '@aws-sdk/credential-providers',
    '@aws-sdk/client-codepipeline',
    '@aws-sdk/credential-provider-node',
    'yargs',
    'minimatch',
  ],
  // jest config
  jestOptions: {
    jestConfig: {
      testEnvironment: 'node',
      testMatch: ['**/*.spec.ts'],
    },
  },

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.addScripts({
  'execute-child-pipelines': 'npx ts-node src/execute-child-pipelines/index.ts',
});
const buildWorkflow = project.github!.workflows.find(
  (wf) => wf.name === 'build',
)!;

const buildJob = buildWorkflow.getJob('build')! as Job;

buildWorkflow.updateJob('build', {
  ...buildJob,
  steps: [
    {
      name: 'Checkout',
      uses: 'actions/checkout@v4',
      with: {
        ref: '${{ github.event.pull_request.head.ref }}',
        repository: '${{ github.event.pull_request.head.repo.full_name }}',
      },
    },
    {
      name: 'Setup Node.js',
      uses: 'actions/setup-node@v4',
      with: {
        'node-version': '18.x',
      },
    },
    {
      name: 'Install dependencies',
      run: 'npm install -g bun && bun install',
    },
    {
      name: 'build',
      run: 'npx projen build',
    },
    {
      name: 'Find mutations',
      id: 'self_mutation',
      run: `git add . && git diff --staged --patch --exit-code > .repo.patch || echo "self_mutation_happened=true" >> $GITHUB_ENV`,
    },
    {
      name: 'Upload patch',
      if: 'steps.self_mutation.outputs.self_mutation_happened',
      uses: 'actions/upload-artifact@v4',
      with: {
        name: '.repo.patch',
        path: '.repo.patch',
        overwrite: true,
      },
    },
    {
      name: 'Fail build on mutation',
      if: 'steps.self_mutation.outputs.self_mutation_happened',
      run: `echo "::error::Files were changed during build (see build log). If this was triggered from a fork, you will need to update your branch." && cat .repo.patch && exit 1`,
    },
    {
      name: 'Backup artifact permissions',
      run: 'cd dist && getfacl -R . > permissions-backup.acl',
      continueOnError: true,
    },
    {
      name: 'Upload artifact',
      uses: 'actions/upload-artifact@v4',
      with: {
        name: 'build-artifact',
        path: 'dist',
        overwrite: true,
      },
    },
  ],
});

const releaseWorkflow = project.github?.workflows.find(
  (w) => w.name === 'release',
)!;

const releaseJob = releaseWorkflow.getJob('release')! as Job;

releaseWorkflow.updateJob('release', {
  ...releaseJob,
  steps: [
    {
      name: 'Checkout',
      uses: 'actions/checkout@v4',
      with: {
        'fetch-depth': 0,
      },
    },
    {
      name: 'Set git identity',
      run: `git config user.name "github-actions"
git config user.email "github-actions@github.com"`,
    },
    {
      name: 'Setup Node.js',
      uses: 'actions/setup-node@v4',
      with: {
        'node-version': '18.x',
      },
    },
    {
      name: 'Install dependencies',
      run: 'npm install -g bun && bun install --frozen-lockfile',
    },
    {
      name: 'release',
      run: 'npx projen release',
    },
    {
      name: 'Check if version has already been tagged',
      id: 'check_tag_exists',
      run: `TAG=$(cat dist/dist/releasetag.txt)
([ ! -z "$TAG" ] && git ls-remote -q --exit-code --tags origin $TAG && (echo "exists=true" >> $GITHUB_OUTPUT)) || (echo "exists=false" >> $GITHUB_OUTPUT)
cat $GITHUB_OUTPUT`,
    },
    {
      name: 'Check for new commits',
      id: 'git_remote',
      run:
        `echo "latest_commit=$(git ls-remote origin -h` +
        ' ${{ github.ref }} ' +
        `| cut -f1)" >> $GITHUB_OUTPUT
cat $GITHUB_OUTPUT`,
    },
    {
      name: 'Backup artifact permissions',
      if: '${{ steps.git_remote.outputs.latest_commit == github.sha }}',
      run: 'cd dist && getfacl -R . > permissions-backup.acl',
      continueOnError: true,
    },
    {
      name: 'Upload artifact',
      if: '${{ steps.git_remote.outputs.latest_commit == github.sha }}',
      uses: 'actions/upload-artifact@v4',
      with: {
        name: 'build-artifact',
        path: 'dist',
        overwrite: true,
      },
    },
  ],
});

const releaseNPMJob = releaseWorkflow.getJob('release_npm')! as Job;

releaseWorkflow.updateJob('release_npm', {
  ...releaseNPMJob,
  permissions: {
    contents: JobPermission.READ,
  },
  steps: [
    {
      name: 'Checkout',
      uses: 'actions/checkout@v4',
      with: {
        'fetch-depth': 0,
      },
    },
    {
      name: 'Set git identity',
      run: `git config user.name "github-actions"
git config user.email "github-actions@github.com"`,
    },
    {
      name: 'Setup Node.js',
      uses: 'actions/setup-node@v4',
      with: {
        'node-version': '18.x',
        'registry-url': 'https://registry.npmjs.org/',
      },
    },
    {
      name: 'Install dependencies',
      run: 'npm install -g bun && bun install --frozen-lockfile',
    },
    {
      name: 'Build and package',
      run: 'npx projen build',
    },
    {
      name: 'Publish to npm',
      run: 'npx projen publish:js',
      env: {
        NODE_AUTH_TOKEN: '${{ secrets.NPM_TOKEN }}',
      },
    },
  ],
});

project.synth();
