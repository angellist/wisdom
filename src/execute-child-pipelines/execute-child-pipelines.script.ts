import * as fs from 'fs';
import yargs from 'yargs';
import { PipelineInvoker } from './pipeline-invoker';

const ExecuteChildPipelines = () => {
  console.log('parsing arguments...');
  const argv = yargs(process.argv.slice(2))
    .option('filePath', {
      describe: 'Path to the appMap.json file',
      type: 'string',
    })
    .option('profile', {
      describe: 'AWS profile to use',
      type: 'string',
    })
    .option('region', {
      describe: 'AWS region',
      type: 'string',
    })
    .parseSync(); // Use parseSync() instead of .argv

  // take in the profile and region from the passed arguments --profile and --region
  const profile = argv.profile;
  const region = argv.region;
  let filePath = argv.filePath;

  if (!filePath) {
    console.log(
      'No filePath provided, using the default dist/appMap.json file path',
    );
    filePath = 'dist/appMap.json';
  } else {
    console.log('using provided appMap.json filePath:', filePath);
  }
  // check if the file exists
  if (!fs.existsSync(filePath)) {
    console.error(
      'Did you make sure to build the code first? The appMap.json file does not exist at the path:',
      filePath,
    );
    process.exit(1);
  }

  if (profile) {
    console.log('using AWS Credentials associated with profile:', profile);
  } else {
    console.log(
      'using default AWS Credentials, to use a specific profile, pass --profile',
    );
  }

  if (region) {
    console.log('using AWS region:', region);
  } else {
    console.log(
      'using default AWS region or us-west-2 if not set, to use a specific region, pass --region',
    );
  }

  console.log('Invoking child pipelines...');
  const pipelineInvoke = new PipelineInvoker(profile, region);
  pipelineInvoke
    .run()
    .then(() => {
      console.log('Child pipelines invoked successfully');
    })
    .catch((error) => {
      console.error('Error invoking child pipelines:', error);
      process.exit(1);
    });
};
export default ExecuteChildPipelines;
