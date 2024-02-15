import { execSync } from 'child_process';
import * as fs from 'fs';
import {
  CodePipelineClient,
  StartPipelineExecutionCommand,
} from '@aws-sdk/client-codepipeline';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { fromSSO } from '@aws-sdk/credential-providers';
import { Minimatch } from 'minimatch';
import { IAppMap } from '../types';

/**
 * Overview: This script is used to invoke pipelines that have been affected by a change based on the appMap, which is generated from the childPipeline construct.
 * PRE-REQUISITES: Synth all of the pipelines before running `nx run-many --target=synth --parallel --maxParallel=6`
 * 1. Reads the dist/childPipeline.appMap.json file
 * 1. Uses git to get a list of all affected files for the incoming commit
 * 1. Uses nx affected to get a list of all affected projects for the incoming commit
 * 1. Looks up the child pipeline names to invoke from the appMap.json for the affected projects, files and paths (glob paths are supported)
 * 1. Uses StartPipelineExecution API to execute the child pipes
 */

const isLocal = !process.env.IS_CODEBUILD;

// we call this at the bottom of the file
export class PipelineInvoker {
  readonly codepipeline: CodePipelineClient;

  constructor(profile?: string | undefined, region?: string | undefined) {
    // create a pipeline client using the default credentials
    this.codepipeline = new CodePipelineClient({
      region: region ?? 'us-west-2',
      credentials: isLocal ? fromSSO({ profile: profile }) : defaultProvider(),
    });
  }

  // Orchestrates the pipeline invoke process
  run = async () => {
    // 1. Read the appMap.json file
    const appMap = this.getAppMap();
    // Note: it's format is { [filePath]: [pipelineName] }, where filePath could be a glob path

    // 2. Get the list of changed files
    const changedFiles = this.getGitFileChanges();

    // 3. Get a list of affected projects
    const changedProjects = this.affectedProjects();

    // 4. Get the list of pipelines to invoke
    const pipelinesToInvoke = this.getPipelinesToInvoke(
      appMap,
      changedFiles,
      changedProjects,
    );

    // 5. Invoke the pipelines
    await this.invokePipelines(pipelinesToInvoke);
  };

  // run nx affected against the main branch to get the list of affected projects
  private affectedProjects = (): string[] => {
    const output = execSync(
      'pnpm nx print-affected --base=origin/main',
    ).toString();
    // Find the index of the first occurrence of '{' which denotes the start of JSON
    const jsonStartIndex = output.indexOf('{');

    // If '{' is found, parse the JSON from that point, otherwise return an empty array
    if (jsonStartIndex !== -1) {
      const jsonOutput = output.substring(jsonStartIndex);
      return JSON.parse(jsonOutput).projects;
    } else {
      console.error('print-affected command failed and returned: ', output);
      throw new Error('No JSON output detected in the command output.');
    }
  };

  // invoke the pipelines
  private invokePipelines = async (pipelinesToInvoke: string[]) => {
    // loop through the pipelines and invoke them
    for (const pipelineName of pipelinesToInvoke) {
      const input = {
        name: pipelineName,
      };
      console.log(`Invoking pipeline with input: ${JSON.stringify(input)}`);
      const command = new StartPipelineExecutionCommand(input);
      await this.codepipeline.send(command);
    }
  };

  getPipelinesToInvoke = (
    appMap: IAppMap,
    changedFiles: string[],
    changedProjects: string[],
  ): string[] => {
    const pipelinesToInvoke: Set<string> = new Set();

    // loop through the changed files and get the pipelines to invoke
    for (const changedFile of changedFiles) {
      for (const [globPath, pipelineNames] of Object.entries(
        appMap.pathsToPipelines,
      )) {
        const matcher = new Minimatch(globPath);
        if (matcher.match(changedFile)) {
          pipelineNames.forEach((pipelineName: string) =>
            pipelinesToInvoke.add(pipelineName),
          );
        }
      }
    }

    // loop through the changed projects and get the pipelines to invoke
    for (const changedProject of changedProjects) {
      const pipelineNames = appMap.projectsToPipelines[changedProject];
      if (pipelineNames) {
        pipelineNames.forEach((pipelineName) =>
          pipelinesToInvoke.add(pipelineName),
        );
      }
    }

    return Array.from(pipelinesToInvoke);
  };

  private getAppMap = (): IAppMap => {
    // read the appMap.json file
    const fileName = `dist/childPipeline.appMap.json`;

    if (!fs.existsSync(fileName)) {
      console.error(
        "appMap.json doesn't exist. Please make sure you build all of the pipelines first.",
      );
      process.exit(1);
    }
    // either create or add to the 'dist/appMap.json' that stores the mapping
    const appMap = JSON.parse(fs.readFileSync(fileName, 'utf-8'));

    // return the appMap
    return appMap;
  };

  // get a list of pipelines that need to be invoked when the infra project has changes
  private getGitFileChanges = (): string[] => {
    // do a git diff to get the list of changed files
    const changedFiles = execSync(
      'git diff --name-only origin/main',
    ).toString();

    // parse the output to get the list of changed files
    return changedFiles.split('\n');
  };
}
