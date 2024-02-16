import { Stack, pipelines, App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { ChildPipeline, ChildPipelineProps } from '.';

// Note: I gave up on mocking/testing fs because the only options are a global mock (which breaks cdk synth), or a spy (which jest no longer allows for fs since it's a built-in module)

describe('ChildPipeline', () => {
  test('default properties', () => {
    const app = new App({
      outdir: './dist',
    });

    const stack = new Stack(app, 'TestStack');
    const props: ChildPipelineProps = {
      pipelineName: 'test-pipeline',
      projectNames: ['test-project'],
      affectedPaths: ['src/'],
      synth: createSynthStep(['test-project']),
    };

    // Instantiate the ChildPipeline construct
    new ChildPipeline(stack, 'TestChildPipeline', props);

    // Prepare the template
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::CodePipeline::Pipeline', 1);
    template.hasResourceProperties('AWS::CodePipeline::Pipeline', {
      Name: 'test-pipeline',
    });
  });

  test('tags are added correctly', () => {
    const stack = new Stack();
    const props: ChildPipelineProps = {
      pipelineName: 'tags-test-pipeline',
      projectNames: ['tags-test-project'],
      affectedPaths: ['src/tags/'],
      synth: createSynthStep(['tags-test-project']),
    };

    // Instantiate the ChildPipeline construct
    new ChildPipeline(stack, 'TagsTestChildPipeline', props);

    // Prepare the template
    const template = Template.fromStack(stack);

    // Check if the tags are added to the pipeline
    template.hasResourceProperties('AWS::CodePipeline::Pipeline', {
      Tags: [
        {
          Key: 'ProjectNames',
          Value: 'tags-test-project',
        },
      ],
    });
  });
});

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
