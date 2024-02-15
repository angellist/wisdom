import {
  BuildSpec,
  ComputeType,
  LinuxBuildImage,
} from 'aws-cdk-lib/aws-codebuild';
import {
  CodePipelineProps,
  CodePipeline,
  ShellStep,
  IFileSetProducer,
} from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

// NOTE: Synth will be overridden by the parent pipeline, so make sure to pass in the correct synth commands here and ignore
export interface ParentPipelineProps {
  // These commands should synth the parent and child pipelines to allow for self mutation (e.g. `cdk synth --app 'npx ts-node <path-to-app-for-parent-pipeline>'` and same for child pipeline's apps)
  // if you don't want self-mutation, be sure to set selfMutation to false in the pipelineProps
  readonly synthCommands: string[];
  readonly input: IFileSetProducer;

  // You can override most pipeline props here, but synth will always be the same, so feel free to use a dummy shell step.
  readonly pipelineProps?: CodePipelineProps;

  // the path of the appMap file to create. This is used to map the affectedPaths and projectNames to the pipelineNames.
  // If provided, make sure to update all of the child pipelines should use the same file name
  // If not provided, the default is 'dist/childPipeline.appMap.json'
  readonly appMapFilePath?: string;
}

export class ParentPipeline extends CodePipeline {
  constructor(scope: Construct, id: string, props: ParentPipelineProps) {
    super(scope, id, {
      pipelineName: 'ParentPipeline',
      // Below installs node v18 and sets the IS_CODEBUILD env var to true
      codeBuildDefaults,
      ...props.pipelineProps,
      // TODO: use a lambda step instead of a shell step - it'll be much easier to manage but requires more work
      // I'm thinking of making a custom simple LambdaStep since we don't actually synth here, but I need to double check steps already implement IFileSetProducer:
      //  https://arc.net/l/quote/idirwtvq
      synth: new ShellStep('Pre-Synth', {
        input: props.input,
        commands: [
          // remove the dist folder to clear out any old appMap.json files
          'rm -rf dist',
          ...props.synthCommands,
          // run the execute-child-pipelines script
          `npx run execute-child-pipeline --filePath=${props.appMapFilePath ?? 'dist/childPipeline.appMap.json'}`,
        ],
      }),
    });

    // add the pipeline notifications
    // this.buildPipeline();
    // new PipelineNotifier(this, 'ParentPipelineNotifier', {
    //   pipeline: pipeline.pipeline,
    //   tokenSecretName: 'PipelineNotifierSecret',
    // });
  }
}

const codeBuildDefaults = {
  // use a larger compute type for codebuild
  buildEnvironment: {
    computeType: ComputeType.LARGE,
    buildImage: LinuxBuildImage.STANDARD_7_0,
    environmentVariables: {
      // increase memory limit for codebuild
      NODE_OPTIONS: {
        value: '--max-old-space-size=12288',
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
};
