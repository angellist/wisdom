import * as cdk from 'aws-cdk-lib';
import { pipelines } from 'aws-cdk-lib';
import { CodePipelineSource } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { ParentPipeline } from '../src/index'; // Adjust the import path as necessary

export class ParentPipelineExample extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const connectionProps: pipelines.ConnectionSourceOptions = {
      connectionArn:
        'arn:aws:codestar-connections:AWS_REGION:AWS_ACCOUNT_ID:connection/GENERATED_ID',
      codeBuildCloneOutput: true,
      triggerOnPush: false,
    };
    const input = CodePipelineSource.connection(
      'williamczuba/some-repo',
      'main',
      connectionProps,
    );

    const parentPipeline = new ParentPipeline(this, 'ParentPipeline', {
      input: input,
      synthCommands: [
        `npm install pnpm@$(node -p "require('./package.json').engines.pnpm.replace('=', '')") --omit=dev -g`,
        'pnpm install',
        `pnpm nx run-many --target=synth --parallel --maxParallel=6 -p document-service`,
      ],
    });
  }
}
