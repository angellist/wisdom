import {
  awscdk, javascript
} from 'projen';
import { JobPermission } from 'projen/lib/github/workflows-model';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'William Czubakowski',
  authorAddress: 'williamczuba@gmail.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
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
  bundledDeps: [
    '@aws-sdk/credential-providers',
    '@aws-sdk/client-codepipeline',
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
const workflow = project.github!.workflows.find((wf) => wf.name === 'build')!;
// new job just to install npm and bun that we'll require to run before the build
const setupNodeStep = {
  name: 'Setup Node.js',
  uses: 'actions/setup-node@v4',
  with: {
    'node-version': '18.x',
  },
};
const installBunStep = {
  name: 'Install bun',
  run: 'npm i -g bun',
};
const installDependenciesJob = {
  runsOn: ['ubuntu-latest'],
  steps: [setupNodeStep, installBunStep],
  permissions: {
    contents: JobPermission.WRITE,
  }
};

workflow.addJob('install-dependencies', installDependenciesJob);

const existingJob = workflow.getJob('build')!
workflow.updateJob('build', {
  ...existingJob,
  needs: ['install-dependencies'],
});


// // there's a bug in the .github/workflows such that bun is not installed prior to running bun install.
// // this looks for "bun install" in all files in .github/workflows and replaces it with "npm i -g bun && bun install"
// // It skips replacing where the line already includes npm i -g bun to avoid adding it multiple times
// const buildWorkflow = project.tryFindObjectFile('.github/workflows/build.yml');
// // packageJson.patch(JsonPatch.add('/author/name', 'A. Mused'));
// /*
// obs:
//   build:
//     runs-on: ubuntu-latest
//     permissions:
//       contents: write
//     outputs:
//       self_mutation_happened: ${{ steps.self_mutation.outputs.self_mutation_happened }}
//     env:
//       CI: "true"
//     steps:
//       - name: Checkout
//         uses: actions/checkout@v4
//         with:
//           ref: ${{ github.event.pull_request.head.ref }}
//           repository: ${{ github.event.pull_request.head.repo.full_name }}
//       - name: Setup Node.js
//         uses: actions/setup-node@v4
//         with:
//           node-version: 18.x
//       - name: Install dependencies
//         run: bun install
//         */
// if (buildWorkflow) {
//   buildWorkflow.patch(JsonPatch.add('jobs/build/steps', 'npm i -g bun'));
// }

project.synth();
