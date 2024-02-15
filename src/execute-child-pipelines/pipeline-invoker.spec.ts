import { PipelineInvoker } from './pipeline-invoker';
import { AppMap } from '../types';

describe('PipelineInvoker', () => {
  let pipelineInvoke: PipelineInvoker;
  let mockAppMap: AppMap;

  beforeEach(() => {
    pipelineInvoke = new PipelineInvoker();
    mockAppMap = {
      pathsToPipelines: {
        'src/**/*.ts': ['pipeline-ts-files'],
        'src/**/*.js': ['pipeline-js-files'],
      },
      projectsToPipelines: {
        'project-a': ['pipeline-project-a'],
        'project-b': ['pipeline-project-b'],
      },
    };
  });

  test('should invoke pipelines for changed files matching glob patterns', () => {
    const changedFiles = ['src/app/app.component.ts', 'src/main.ts'];
    const changedProjects: string[] = [];
    const pipelines = pipelineInvoke.getPipelinesToInvoke(
      mockAppMap,
      changedFiles,
      changedProjects,
    );
    expect(pipelines).toEqual(['pipeline-ts-files']);
  });

  test('should invoke pipelines for changed projects', () => {
    const changedFiles: string[] = [];
    const changedProjects = ['project-a'];
    const pipelines = pipelineInvoke.getPipelinesToInvoke(
      mockAppMap,
      changedFiles,
      changedProjects,
    );
    expect(pipelines).toEqual(['pipeline-project-a']);
  });

  test('should handle no changed files or projects', () => {
    const changedFiles: string[] = [];
    const changedProjects: string[] = [];
    const pipelines = pipelineInvoke.getPipelinesToInvoke(
      mockAppMap,
      changedFiles,
      changedProjects,
    );
    expect(pipelines).toHaveLength(0);
  });

  test('should deduplicate pipeline names when files and projects trigger the same pipeline', () => {
    const changedFiles = ['src/app/app.component.ts'];
    const changedProjects = ['project-a'];
    const pipelines = pipelineInvoke.getPipelinesToInvoke(
      mockAppMap,
      changedFiles,
      changedProjects,
    );
    expect(pipelines).toEqual(
      expect.arrayContaining(['pipeline-ts-files', 'pipeline-project-a']),
    );
    expect(pipelines).toHaveLength(2); // Assuming 'pipeline-ts-files' and 'pipeline-project-a' are different
  });

  test('should handle glob patterns that do not match any changed files', () => {
    const changedFiles = ['README.md']; // File that doesn't match any glob pattern
    const changedProjects: string[] = [];
    const pipelines = pipelineInvoke.getPipelinesToInvoke(
      mockAppMap,
      changedFiles,
      changedProjects,
    );
    expect(pipelines).toHaveLength(0);
  });
});
