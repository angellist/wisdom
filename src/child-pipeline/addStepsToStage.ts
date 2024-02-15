import { CfnOutput } from 'aws-cdk-lib';

import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { CodeBuildStep, StageDeployment } from 'aws-cdk-lib/pipelines';
// Adds a step to run after the stage is deployed using the credentials from the provided role via an assume role.
// This is usually for integration and e2e testing purposes.
// It sets LAMBDA_TASK_ROOT to a dummy value so this runs like a lambda would.
// commands are the commands to run AFTER the stage has been deployed
// testAssumeRole is the iam Role code build should use to run the commands - this role should have the necessary permissions to run the commands and allow codeBuild from the childPipeline's account to assume it
// envFromCfnOutputs - enables setting env variables from the outputs of the cfn stack if needed
// e.g. pipeline.addStepsToStage(testStage, ['npx nx run document-service:test'], testAssumeRole);
// or without nx: pipeline.addStepsToStage(testStage, ['npx jest --config jest.config.e2e.ts --runInBand'], testAssumeRole);
export const addStepsToStage = ({
  stage,
  commands,
  testRoleARN,
  installCommands,
  envFromCfnOutputs,
  env,
  name,
}: {
  stage: StageDeployment;
  commands: string[];
  testRoleARN: string;
  installCommands?: string[];
  envFromCfnOutputs?: Record<string, CfnOutput>;
  env?: Record<string, string>;
  name?: string;
}) => {
  const stepName = name || 'Test';
  stage.addPost(
    new CodeBuildStep(stepName, {
      commands: [
        // install commands
        ...(installCommands || []),
        // assume role and export creds so we can run commands in the test stage
        `export $(printf "AWS_ACCESS_KEY_ID=%s AWS_SECRET_ACCESS_KEY=%s AWS_SESSION_TOKEN=%s" \
        $(aws sts assume-role \
        --role-arn ${testRoleARN} \
        --role-session-name CodeBuildAssumeRole \
        --query "Credentials.[AccessKeyId,SecretAccessKey,SessionToken]" \
        --output text))`,
        // run the test commands
        ...commands,
      ],
      env: {
        ...env,
        IS_CODEBUILD: 'true',
        // add LAMBDA_TASK_ROOT so we think we're operating in a lambda
        LAMBDA_TASK_ROOT: 'dummyvalue',
      },
      envFromCfnOutputs,
      rolePolicyStatements: [
        // allow codeBuild to assume the testRole
        new PolicyStatement({
          actions: ['sts:AssumeRole'],
          resources: [testRoleARN],
        }),
      ],
    }),
  );
};
