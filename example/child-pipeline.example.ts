import { pipelines } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import {
  BuildSpec,
  ComputeType,
  LinuxBuildImage,
} from 'aws-cdk-lib/aws-codebuild';
import { CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { ChildPipeline } from '../src/index';

// This is an example of how to use the ChildPipeline construct in a stack
// You would do this for each child pipeline you want to create.
export class ChildPipelineExample extends cdk.Stack {
  projectNames = ['some-repo'];

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new ChildPipeline(scope, id, {
      projectNames: this.projectNames,
      // You would replace this with the affected paths that should trigger this child pipeline.
      // you would use separate paths for each child pipeline
      affectedPaths: [
        'src/**',
        'package.json',
        'pnpm-lock.yaml',
        'pnpm-workspace.yaml',
        'tools/**',
        'dist/childPipeline.appMap.json',
      ],
      pipelineName: 'some-repo-pipeline',

      selfMutation: false,
      crossAccountKeys: true, // Required if deploying cross-account

      // Below installs node v18 and sets the IS_CODEBUILD env var to true
      codeBuildDefaults: {
        // use a larger compute type for codebuild
        buildEnvironment: {
          computeType: ComputeType.LARGE,
          buildImage: LinuxBuildImage.STANDARD_7_0,
          environmentVariables: {
            // increase memory limit for codebuild
            NODE_OPTIONS: {
              value: '--max-old-space-size=6144',
            },
          },
        },
        partialBuildSpec: BuildSpec.fromObject({
          version: '0.2',
          env: {
            'exported-variables': ['IS_CODEBUILD'],
          },
          phases: {
            install: {
              'runtime-versions': {
                nodejs: 18,
              },
              commands: ['export IS_CODEBUILD="true"'],
            },
          },
        }),
      },
      synth: createSynthStep(this.projectNames),
    });
  }
}

const createSynthStep = (projectNames: string[]) => {
  const connectionProps: pipelines.ConnectionSourceOptions = {
    connectionArn:
      'arn:aws:codestar-connections:AWS_REGION:AWS_ACCOUNT_ID:connection/GENERATED_ID',
    codeBuildCloneOutput: true,
    triggerOnPush: false,
  };

  const commands = [
    // install pnpm
    `npm install pnpm@$(node -p "require('./package.json').engines.pnpm.replace('=', '')") --omit=dev -g`,
    // install dependencies
    'pnpm install',
    // test, build and synth the project(s)
    ...projectNames.flatMap((projectName) => [
      `pnpm nx run ${projectName}:build`,
      // Run Unit tests too as a sanity check in case the github action was skipped
      `pnpm nx run ${projectName}:test`,
    ]),
    // Only synth once even if there are multiple projects because we don't want to synth multiple times
    `pnpm nx run ${projectNames[0]}:synth`,
  ];

  return new ShellStep('Synth', {
    input: CodePipelineSource.connection(
      'williamczuba/some-repo',
      'main',
      connectionProps,
    ),
    commands,
  });
};
