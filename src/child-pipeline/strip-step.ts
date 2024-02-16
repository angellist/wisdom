import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { CodeBuildStep, IFileSetProducer } from 'aws-cdk-lib/pipelines';

// This step is responsible for stripping the assets from the assembly and uploading the stripped assembly to the S3 bucket.
// This helps specifically with Node.js projects, where the assets are not needed in the final assembly.
export const StripStep = (cloudAssemblyFileSet: IFileSetProducer | undefined) =>
  new CodeBuildStep('StripAssetsFromAssembly', {
    input: cloudAssemblyFileSet,
    commands: [
      'S3_PATH=${CODEBUILD_SOURCE_VERSION#"arn:aws:s3:::"}',
      'ZIP_ARCHIVE=$(basename $S3_PATH)',
      'echo $S3_PATH',
      'echo $ZIP_ARCHIVE',
      'ls',
      'rm -rfv asset.*',
      'zip -r -q -A $ZIP_ARCHIVE *',
      'ls',
      'aws s3 cp $ZIP_ARCHIVE s3://$S3_PATH',
    ],
    rolePolicyStatements: [
      new PolicyStatement({
        resources: ['*'],
        actions: ['s3:*'],
      }),
      new PolicyStatement({
        resources: ['*'],
        actions: ['kms:GenerateDataKey'],
      }),
    ],
  });
