import * as fs from 'fs';
import { Tags } from 'aws-cdk-lib';

import { CodePipelineProps, CodePipeline } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

import { StripStep } from './strip-step';
import { IAppMap } from '../types';

//  Important: in your synth's pipelines.ConnectionSourceOptions make sure triggerOnPush is set to false!
// Don't forget `crossAccountKeys: true` if deploying cross-account
export interface ChildPipelineProps extends CodePipelineProps {
  // these are the project names for organizing your application. e.g. ['document-service', 'user-service']
  // If you have a 1:1 relationship between projects and pipelines, you can just pass in the pipeline name
  // We allow multiple project names to be passed in so that we can run the same pipeline for multiple projects if they are highly coupled
  // This is particularly useful for monorepos where a single commit may affect multiple projects, see nx for some examples
  readonly projectNames: string[];

  // these are the code paths that, when changed in a git commit, should cause this pipeline to be executed.
  readonly affectedPaths: string[];

  // the path of the appMap file to create. This is used to map the affectedPaths and projectNames to the pipelineNames.
  // If provided, make sure to update the ParentPipeline to use the same file name and all the child pipelines should use the same file name
  // If not provided, the default is 'dist/childPipeline.appMap.json'
  readonly appMapFilePath?: string;

  // if true, the assets will be stripped from the pipeline artifacts.
  // This is useful for nodejs projects where the assets are not needed for the deployment
  readonly stripAssets?: boolean;
}

export class ChildPipeline extends CodePipeline {
  readonly parentScope: Construct;
  readonly appMapFilePath: string;

  constructor(scope: Construct, id: string, props: ChildPipelineProps) {
    super(scope, id, {
      ...props,
    });

    this.appMapFilePath =
      props.appMapFilePath ?? 'dist/childPipeline.appMap.json';

    if (props.stripAssets) {
      this.addWave('PruneCDKOutput', {
        pre: [StripStep(this.cloudAssemblyFileSet)],
      });
    }

    this.parentScope = scope;

    this.createAppMapJSON(
      props.pipelineName ?? 'ChildPipeline', // if no pipelineName is provided, default to 'ChildPipeline'
      props.affectedPaths,
      props.projectNames,
    );
    Tags.of(this).add('ProjectNames', props.projectNames.join(', '));
  }

  // TODO: uncomment below when you add the pipeline notifier construct
  // Builds the pipeline and adds the notifier construct such that failures ping slack, and all status changes update to github
  // This should be called after all stages and tests have been added
  // NOTE: After calling, NO CHANGES CAN BE MADE TO THE PIPELINE WITHOUT REBUILDING IT, so this should be called last
  // buildAndAddNotifier = () => {
  //   this.buildPipeline();
  //   new PipelineNotifier(this.parentScope, 'PipelineNotifier', {
  //     pipeline: this.pipeline,
  //     tokenSecretName: 'PipelineNotifierSecret',
  //   });
  // };

  // creates a AppMap JSON file that collected the AffectedPaths -> pipelineNames and projectNames -> pipelineNames so the Parent pipeline knows which pipes to execute for a given git commit
  private createAppMapJSON = (
    pipelineName: string,
    affectedPaths: string[],
    projectNames: string[],
  ) => {
    const fileName = this.appMapFilePath;
    // either create or add to the 'dist/appMap.json' that stores the mapping
    const appMap: IAppMap = fs.existsSync(fileName)
      ? JSON.parse(fs.readFileSync(fileName, 'utf-8'))
      : {};

    const pathsToPipelines = appMap.pathsToPipelines ?? {};
    const projectsToPipelines = appMap.projectsToPipelines ?? {};

    affectedPaths.forEach((pathName) => {
      const affectedPipelineNames = (
        pathsToPipelines[pathName] ? pathsToPipelines[pathName] : []
      ) as string[];

      // if the affectedPipelineNames already includes the pathName, skip adding it to prevent dupes
      if (affectedPipelineNames.includes(pathName)) {
        return;
      }

      pathsToPipelines[pathName] = [...affectedPipelineNames, pipelineName];
    });

    projectNames.forEach((projectName) => {
      const affectedPipelineNames = (
        projectsToPipelines[projectName] ? projectsToPipelines[projectName] : []
      ) as string[];

      // if the affectedPipelineNames already includes the projectName, skip adding it to prevent dupes
      if (affectedPipelineNames.includes(projectName)) {
        return;
      }

      projectsToPipelines[projectName] = [
        ...affectedPipelineNames,
        pipelineName,
      ];
    });

    appMap.pathsToPipelines = pathsToPipelines;
    appMap.projectsToPipelines = projectsToPipelines;

    fs.writeFileSync(fileName, JSON.stringify(appMap, null, 2));
  };
}
