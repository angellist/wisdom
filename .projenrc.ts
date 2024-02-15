import { awscdk, javascript } from 'projen';

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
project.synth();
