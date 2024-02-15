# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ChildPipeline <a name="ChildPipeline" id="parent-child-pipelines.ChildPipeline"></a>

#### Initializers <a name="Initializers" id="parent-child-pipelines.ChildPipeline.Initializer"></a>

```typescript
import { ChildPipeline } from 'parent-child-pipelines'

new ChildPipeline(scope: Construct, id: string, props: ChildPipelineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#parent-child-pipelines.ChildPipeline.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#parent-child-pipelines.ChildPipeline.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#parent-child-pipelines.ChildPipeline.Initializer.parameter.props">props</a></code> | <code><a href="#parent-child-pipelines.ChildPipelineProps">ChildPipelineProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="parent-child-pipelines.ChildPipeline.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="parent-child-pipelines.ChildPipeline.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="parent-child-pipelines.ChildPipeline.Initializer.parameter.props"></a>

- *Type:* <a href="#parent-child-pipelines.ChildPipelineProps">ChildPipelineProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#parent-child-pipelines.ChildPipeline.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#parent-child-pipelines.ChildPipeline.addStage">addStage</a></code> | Deploy a single Stage by itself. |
| <code><a href="#parent-child-pipelines.ChildPipeline.addWave">addWave</a></code> | Add a Wave to the pipeline, for deploying multiple Stages in parallel. |
| <code><a href="#parent-child-pipelines.ChildPipeline.buildPipeline">buildPipeline</a></code> | Send the current pipeline definition to the engine, and construct the pipeline. |

---

##### `toString` <a name="toString" id="parent-child-pipelines.ChildPipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addStage` <a name="addStage" id="parent-child-pipelines.ChildPipeline.addStage"></a>

```typescript
public addStage(stage: Stage, options?: AddStageOpts): StageDeployment
```

Deploy a single Stage by itself.

Add a Stage to the pipeline, to be deployed in sequence with other
Stages added to the pipeline. All Stacks in the stage will be deployed
in an order automatically determined by their relative dependencies.

###### `stage`<sup>Required</sup> <a name="stage" id="parent-child-pipelines.ChildPipeline.addStage.parameter.stage"></a>

- *Type:* aws-cdk-lib.Stage

---

###### `options`<sup>Optional</sup> <a name="options" id="parent-child-pipelines.ChildPipeline.addStage.parameter.options"></a>

- *Type:* aws-cdk-lib.pipelines.AddStageOpts

---

##### `addWave` <a name="addWave" id="parent-child-pipelines.ChildPipeline.addWave"></a>

```typescript
public addWave(id: string, options?: WaveOptions): Wave
```

Add a Wave to the pipeline, for deploying multiple Stages in parallel.

Use the return object of this method to deploy multiple stages in parallel.

Example:

```ts
declare const pipeline: pipelines.CodePipeline;

const wave = pipeline.addWave('MyWave');
wave.addStage(new MyApplicationStage(this, 'Stage1'));
wave.addStage(new MyApplicationStage(this, 'Stage2'));
```

###### `id`<sup>Required</sup> <a name="id" id="parent-child-pipelines.ChildPipeline.addWave.parameter.id"></a>

- *Type:* string

---

###### `options`<sup>Optional</sup> <a name="options" id="parent-child-pipelines.ChildPipeline.addWave.parameter.options"></a>

- *Type:* aws-cdk-lib.pipelines.WaveOptions

---

##### `buildPipeline` <a name="buildPipeline" id="parent-child-pipelines.ChildPipeline.buildPipeline"></a>

```typescript
public buildPipeline(): void
```

Send the current pipeline definition to the engine, and construct the pipeline.

It is not possible to modify the pipeline after calling this method.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#parent-child-pipelines.ChildPipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#parent-child-pipelines.ChildPipeline.isPipeline">isPipeline</a></code> | Return whether the given object extends `PipelineBase`. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="parent-child-pipelines.ChildPipeline.isConstruct"></a>

```typescript
import { ChildPipeline } from 'parent-child-pipelines'

ChildPipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="parent-child-pipelines.ChildPipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isPipeline` <a name="isPipeline" id="parent-child-pipelines.ChildPipeline.isPipeline"></a>

```typescript
import { ChildPipeline } from 'parent-child-pipelines'

ChildPipeline.isPipeline(x: any)
```

Return whether the given object extends `PipelineBase`.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="parent-child-pipelines.ChildPipeline.isPipeline.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#parent-child-pipelines.ChildPipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#parent-child-pipelines.ChildPipeline.property.cloudAssemblyFileSet">cloudAssemblyFileSet</a></code> | <code>aws-cdk-lib.pipelines.FileSet</code> | The FileSet tha contains the cloud assembly. |
| <code><a href="#parent-child-pipelines.ChildPipeline.property.synth">synth</a></code> | <code>aws-cdk-lib.pipelines.IFileSetProducer</code> | The build step that produces the CDK Cloud Assembly. |
| <code><a href="#parent-child-pipelines.ChildPipeline.property.waves">waves</a></code> | <code>aws-cdk-lib.pipelines.Wave[]</code> | The waves in this pipeline. |
| <code><a href="#parent-child-pipelines.ChildPipeline.property.pipeline">pipeline</a></code> | <code>aws-cdk-lib.aws_codepipeline.Pipeline</code> | The CodePipeline pipeline that deploys the CDK app. |
| <code><a href="#parent-child-pipelines.ChildPipeline.property.selfMutationEnabled">selfMutationEnabled</a></code> | <code>boolean</code> | Whether SelfMutation is enabled for this CDK Pipeline. |
| <code><a href="#parent-child-pipelines.ChildPipeline.property.selfMutationProject">selfMutationProject</a></code> | <code>aws-cdk-lib.aws_codebuild.IProject</code> | The CodeBuild project that performs the SelfMutation. |
| <code><a href="#parent-child-pipelines.ChildPipeline.property.synthProject">synthProject</a></code> | <code>aws-cdk-lib.aws_codebuild.IProject</code> | The CodeBuild project that performs the Synth. |
| <code><a href="#parent-child-pipelines.ChildPipeline.property.appMapFilePath">appMapFilePath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#parent-child-pipelines.ChildPipeline.property.parentScope">parentScope</a></code> | <code>constructs.Construct</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="parent-child-pipelines.ChildPipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cloudAssemblyFileSet`<sup>Required</sup> <a name="cloudAssemblyFileSet" id="parent-child-pipelines.ChildPipeline.property.cloudAssemblyFileSet"></a>

```typescript
public readonly cloudAssemblyFileSet: FileSet;
```

- *Type:* aws-cdk-lib.pipelines.FileSet

The FileSet tha contains the cloud assembly.

This is the primary output of the synth step.

---

##### `synth`<sup>Required</sup> <a name="synth" id="parent-child-pipelines.ChildPipeline.property.synth"></a>

```typescript
public readonly synth: IFileSetProducer;
```

- *Type:* aws-cdk-lib.pipelines.IFileSetProducer

The build step that produces the CDK Cloud Assembly.

---

##### `waves`<sup>Required</sup> <a name="waves" id="parent-child-pipelines.ChildPipeline.property.waves"></a>

```typescript
public readonly waves: Wave[];
```

- *Type:* aws-cdk-lib.pipelines.Wave[]

The waves in this pipeline.

---

##### `pipeline`<sup>Required</sup> <a name="pipeline" id="parent-child-pipelines.ChildPipeline.property.pipeline"></a>

```typescript
public readonly pipeline: Pipeline;
```

- *Type:* aws-cdk-lib.aws_codepipeline.Pipeline

The CodePipeline pipeline that deploys the CDK app.

Only available after the pipeline has been built.

---

##### `selfMutationEnabled`<sup>Required</sup> <a name="selfMutationEnabled" id="parent-child-pipelines.ChildPipeline.property.selfMutationEnabled"></a>

```typescript
public readonly selfMutationEnabled: boolean;
```

- *Type:* boolean

Whether SelfMutation is enabled for this CDK Pipeline.

---

##### `selfMutationProject`<sup>Required</sup> <a name="selfMutationProject" id="parent-child-pipelines.ChildPipeline.property.selfMutationProject"></a>

```typescript
public readonly selfMutationProject: IProject;
```

- *Type:* aws-cdk-lib.aws_codebuild.IProject

The CodeBuild project that performs the SelfMutation.

Will throw an error if this is accessed before `buildPipeline()`
is called, or if selfMutation has been disabled.

---

##### `synthProject`<sup>Required</sup> <a name="synthProject" id="parent-child-pipelines.ChildPipeline.property.synthProject"></a>

```typescript
public readonly synthProject: IProject;
```

- *Type:* aws-cdk-lib.aws_codebuild.IProject

The CodeBuild project that performs the Synth.

Only available after the pipeline has been built.

---

##### `appMapFilePath`<sup>Required</sup> <a name="appMapFilePath" id="parent-child-pipelines.ChildPipeline.property.appMapFilePath"></a>

```typescript
public readonly appMapFilePath: string;
```

- *Type:* string

---

##### `parentScope`<sup>Required</sup> <a name="parentScope" id="parent-child-pipelines.ChildPipeline.property.parentScope"></a>

```typescript
public readonly parentScope: Construct;
```

- *Type:* constructs.Construct

---


### ParentPipeline <a name="ParentPipeline" id="parent-child-pipelines.ParentPipeline"></a>

#### Initializers <a name="Initializers" id="parent-child-pipelines.ParentPipeline.Initializer"></a>

```typescript
import { ParentPipeline } from 'parent-child-pipelines'

new ParentPipeline(scope: Construct, id: string, props: ParentPipelineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#parent-child-pipelines.ParentPipeline.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#parent-child-pipelines.ParentPipeline.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#parent-child-pipelines.ParentPipeline.Initializer.parameter.props">props</a></code> | <code><a href="#parent-child-pipelines.ParentPipelineProps">ParentPipelineProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="parent-child-pipelines.ParentPipeline.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="parent-child-pipelines.ParentPipeline.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="parent-child-pipelines.ParentPipeline.Initializer.parameter.props"></a>

- *Type:* <a href="#parent-child-pipelines.ParentPipelineProps">ParentPipelineProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#parent-child-pipelines.ParentPipeline.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#parent-child-pipelines.ParentPipeline.addStage">addStage</a></code> | Deploy a single Stage by itself. |
| <code><a href="#parent-child-pipelines.ParentPipeline.addWave">addWave</a></code> | Add a Wave to the pipeline, for deploying multiple Stages in parallel. |
| <code><a href="#parent-child-pipelines.ParentPipeline.buildPipeline">buildPipeline</a></code> | Send the current pipeline definition to the engine, and construct the pipeline. |

---

##### `toString` <a name="toString" id="parent-child-pipelines.ParentPipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addStage` <a name="addStage" id="parent-child-pipelines.ParentPipeline.addStage"></a>

```typescript
public addStage(stage: Stage, options?: AddStageOpts): StageDeployment
```

Deploy a single Stage by itself.

Add a Stage to the pipeline, to be deployed in sequence with other
Stages added to the pipeline. All Stacks in the stage will be deployed
in an order automatically determined by their relative dependencies.

###### `stage`<sup>Required</sup> <a name="stage" id="parent-child-pipelines.ParentPipeline.addStage.parameter.stage"></a>

- *Type:* aws-cdk-lib.Stage

---

###### `options`<sup>Optional</sup> <a name="options" id="parent-child-pipelines.ParentPipeline.addStage.parameter.options"></a>

- *Type:* aws-cdk-lib.pipelines.AddStageOpts

---

##### `addWave` <a name="addWave" id="parent-child-pipelines.ParentPipeline.addWave"></a>

```typescript
public addWave(id: string, options?: WaveOptions): Wave
```

Add a Wave to the pipeline, for deploying multiple Stages in parallel.

Use the return object of this method to deploy multiple stages in parallel.

Example:

```ts
declare const pipeline: pipelines.CodePipeline;

const wave = pipeline.addWave('MyWave');
wave.addStage(new MyApplicationStage(this, 'Stage1'));
wave.addStage(new MyApplicationStage(this, 'Stage2'));
```

###### `id`<sup>Required</sup> <a name="id" id="parent-child-pipelines.ParentPipeline.addWave.parameter.id"></a>

- *Type:* string

---

###### `options`<sup>Optional</sup> <a name="options" id="parent-child-pipelines.ParentPipeline.addWave.parameter.options"></a>

- *Type:* aws-cdk-lib.pipelines.WaveOptions

---

##### `buildPipeline` <a name="buildPipeline" id="parent-child-pipelines.ParentPipeline.buildPipeline"></a>

```typescript
public buildPipeline(): void
```

Send the current pipeline definition to the engine, and construct the pipeline.

It is not possible to modify the pipeline after calling this method.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#parent-child-pipelines.ParentPipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#parent-child-pipelines.ParentPipeline.isPipeline">isPipeline</a></code> | Return whether the given object extends `PipelineBase`. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="parent-child-pipelines.ParentPipeline.isConstruct"></a>

```typescript
import { ParentPipeline } from 'parent-child-pipelines'

ParentPipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="parent-child-pipelines.ParentPipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isPipeline` <a name="isPipeline" id="parent-child-pipelines.ParentPipeline.isPipeline"></a>

```typescript
import { ParentPipeline } from 'parent-child-pipelines'

ParentPipeline.isPipeline(x: any)
```

Return whether the given object extends `PipelineBase`.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="parent-child-pipelines.ParentPipeline.isPipeline.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#parent-child-pipelines.ParentPipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#parent-child-pipelines.ParentPipeline.property.cloudAssemblyFileSet">cloudAssemblyFileSet</a></code> | <code>aws-cdk-lib.pipelines.FileSet</code> | The FileSet tha contains the cloud assembly. |
| <code><a href="#parent-child-pipelines.ParentPipeline.property.synth">synth</a></code> | <code>aws-cdk-lib.pipelines.IFileSetProducer</code> | The build step that produces the CDK Cloud Assembly. |
| <code><a href="#parent-child-pipelines.ParentPipeline.property.waves">waves</a></code> | <code>aws-cdk-lib.pipelines.Wave[]</code> | The waves in this pipeline. |
| <code><a href="#parent-child-pipelines.ParentPipeline.property.pipeline">pipeline</a></code> | <code>aws-cdk-lib.aws_codepipeline.Pipeline</code> | The CodePipeline pipeline that deploys the CDK app. |
| <code><a href="#parent-child-pipelines.ParentPipeline.property.selfMutationEnabled">selfMutationEnabled</a></code> | <code>boolean</code> | Whether SelfMutation is enabled for this CDK Pipeline. |
| <code><a href="#parent-child-pipelines.ParentPipeline.property.selfMutationProject">selfMutationProject</a></code> | <code>aws-cdk-lib.aws_codebuild.IProject</code> | The CodeBuild project that performs the SelfMutation. |
| <code><a href="#parent-child-pipelines.ParentPipeline.property.synthProject">synthProject</a></code> | <code>aws-cdk-lib.aws_codebuild.IProject</code> | The CodeBuild project that performs the Synth. |

---

##### `node`<sup>Required</sup> <a name="node" id="parent-child-pipelines.ParentPipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cloudAssemblyFileSet`<sup>Required</sup> <a name="cloudAssemblyFileSet" id="parent-child-pipelines.ParentPipeline.property.cloudAssemblyFileSet"></a>

```typescript
public readonly cloudAssemblyFileSet: FileSet;
```

- *Type:* aws-cdk-lib.pipelines.FileSet

The FileSet tha contains the cloud assembly.

This is the primary output of the synth step.

---

##### `synth`<sup>Required</sup> <a name="synth" id="parent-child-pipelines.ParentPipeline.property.synth"></a>

```typescript
public readonly synth: IFileSetProducer;
```

- *Type:* aws-cdk-lib.pipelines.IFileSetProducer

The build step that produces the CDK Cloud Assembly.

---

##### `waves`<sup>Required</sup> <a name="waves" id="parent-child-pipelines.ParentPipeline.property.waves"></a>

```typescript
public readonly waves: Wave[];
```

- *Type:* aws-cdk-lib.pipelines.Wave[]

The waves in this pipeline.

---

##### `pipeline`<sup>Required</sup> <a name="pipeline" id="parent-child-pipelines.ParentPipeline.property.pipeline"></a>

```typescript
public readonly pipeline: Pipeline;
```

- *Type:* aws-cdk-lib.aws_codepipeline.Pipeline

The CodePipeline pipeline that deploys the CDK app.

Only available after the pipeline has been built.

---

##### `selfMutationEnabled`<sup>Required</sup> <a name="selfMutationEnabled" id="parent-child-pipelines.ParentPipeline.property.selfMutationEnabled"></a>

```typescript
public readonly selfMutationEnabled: boolean;
```

- *Type:* boolean

Whether SelfMutation is enabled for this CDK Pipeline.

---

##### `selfMutationProject`<sup>Required</sup> <a name="selfMutationProject" id="parent-child-pipelines.ParentPipeline.property.selfMutationProject"></a>

```typescript
public readonly selfMutationProject: IProject;
```

- *Type:* aws-cdk-lib.aws_codebuild.IProject

The CodeBuild project that performs the SelfMutation.

Will throw an error if this is accessed before `buildPipeline()`
is called, or if selfMutation has been disabled.

---

##### `synthProject`<sup>Required</sup> <a name="synthProject" id="parent-child-pipelines.ParentPipeline.property.synthProject"></a>

```typescript
public readonly synthProject: IProject;
```

- *Type:* aws-cdk-lib.aws_codebuild.IProject

The CodeBuild project that performs the Synth.

Only available after the pipeline has been built.

---


## Structs <a name="Structs" id="Structs"></a>

### ChildPipelineProps <a name="ChildPipelineProps" id="parent-child-pipelines.ChildPipelineProps"></a>

#### Initializer <a name="Initializer" id="parent-child-pipelines.ChildPipelineProps.Initializer"></a>

```typescript
import { ChildPipelineProps } from 'parent-child-pipelines'

const childPipelineProps: ChildPipelineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.synth">synth</a></code> | <code>aws-cdk-lib.pipelines.IFileSetProducer</code> | The build step that produces the CDK Cloud Assembly. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.artifactBucket">artifactBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | An existing S3 Bucket to use for storing the pipeline's artifact. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.assetPublishingCodeBuildDefaults">assetPublishingCodeBuildDefaults</a></code> | <code>aws-cdk-lib.pipelines.CodeBuildOptions</code> | Additional customizations to apply to the asset publishing CodeBuild projects. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.cliVersion">cliVersion</a></code> | <code>string</code> | CDK CLI version to use in self-mutation and asset publishing steps. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.codeBuildDefaults">codeBuildDefaults</a></code> | <code>aws-cdk-lib.pipelines.CodeBuildOptions</code> | Customize the CodeBuild projects created for this pipeline. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.codePipeline">codePipeline</a></code> | <code>aws-cdk-lib.aws_codepipeline.Pipeline</code> | An existing Pipeline to be reused and built upon. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.crossAccountKeys">crossAccountKeys</a></code> | <code>boolean</code> | Create KMS keys for the artifact buckets, allowing cross-account deployments. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.crossRegionReplicationBuckets">crossRegionReplicationBuckets</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_s3.IBucket}</code> | A map of region to S3 bucket name used for cross-region CodePipeline. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.dockerCredentials">dockerCredentials</a></code> | <code>aws-cdk-lib.pipelines.DockerCredential[]</code> | A list of credentials used to authenticate to Docker registries. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.dockerEnabledForSelfMutation">dockerEnabledForSelfMutation</a></code> | <code>boolean</code> | Enable Docker for the self-mutate step. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.dockerEnabledForSynth">dockerEnabledForSynth</a></code> | <code>boolean</code> | Enable Docker for the 'synth' step. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.enableKeyRotation">enableKeyRotation</a></code> | <code>boolean</code> | Enable KMS key rotation for the generated KMS keys. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.pipelineName">pipelineName</a></code> | <code>string</code> | The name of the CodePipeline pipeline. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.publishAssetsInParallel">publishAssetsInParallel</a></code> | <code>boolean</code> | Publish assets in multiple CodeBuild projects. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.reuseCrossRegionSupportStacks">reuseCrossRegionSupportStacks</a></code> | <code>boolean</code> | Reuse the same cross region support stack for all pipelines in the App. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The IAM role to be assumed by this Pipeline. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.selfMutation">selfMutation</a></code> | <code>boolean</code> | Whether the pipeline will update itself. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.selfMutationCodeBuildDefaults">selfMutationCodeBuildDefaults</a></code> | <code>aws-cdk-lib.pipelines.CodeBuildOptions</code> | Additional customizations to apply to the self mutation CodeBuild projects. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.synthCodeBuildDefaults">synthCodeBuildDefaults</a></code> | <code>aws-cdk-lib.pipelines.CodeBuildOptions</code> | Additional customizations to apply to the synthesize CodeBuild projects. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.useChangeSets">useChangeSets</a></code> | <code>boolean</code> | Deploy every stack by creating a change set and executing it. |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.affectedPaths">affectedPaths</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.projectNames">projectNames</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.appMapFilePath">appMapFilePath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#parent-child-pipelines.ChildPipelineProps.property.stripAssets">stripAssets</a></code> | <code>boolean</code> | *No description.* |

---

##### `synth`<sup>Required</sup> <a name="synth" id="parent-child-pipelines.ChildPipelineProps.property.synth"></a>

```typescript
public readonly synth: IFileSetProducer;
```

- *Type:* aws-cdk-lib.pipelines.IFileSetProducer

The build step that produces the CDK Cloud Assembly.

The primary output of this step needs to be the `cdk.out` directory
generated by the `cdk synth` command.

If you use a `ShellStep` here and you don't configure an output directory,
the output directory will automatically be assumed to be `cdk.out`.

---

##### `artifactBucket`<sup>Optional</sup> <a name="artifactBucket" id="parent-child-pipelines.ChildPipelineProps.property.artifactBucket"></a>

```typescript
public readonly artifactBucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket
- *Default:* A new S3 bucket will be created.

An existing S3 Bucket to use for storing the pipeline's artifact.

---

##### `assetPublishingCodeBuildDefaults`<sup>Optional</sup> <a name="assetPublishingCodeBuildDefaults" id="parent-child-pipelines.ChildPipelineProps.property.assetPublishingCodeBuildDefaults"></a>

```typescript
public readonly assetPublishingCodeBuildDefaults: CodeBuildOptions;
```

- *Type:* aws-cdk-lib.pipelines.CodeBuildOptions
- *Default:* Only `codeBuildDefaults` are applied

Additional customizations to apply to the asset publishing CodeBuild projects.

---

##### `cliVersion`<sup>Optional</sup> <a name="cliVersion" id="parent-child-pipelines.ChildPipelineProps.property.cliVersion"></a>

```typescript
public readonly cliVersion: string;
```

- *Type:* string
- *Default:* Latest version

CDK CLI version to use in self-mutation and asset publishing steps.

If you want to lock the CDK CLI version used in the pipeline, by steps
that are automatically generated for you, specify the version here.

We recommend you do not specify this value, as not specifying it always
uses the latest CLI version which is backwards compatible with old versions.

If you do specify it, be aware that this version should always be equal to or higher than the
version of the CDK framework used by the CDK app, when the CDK commands are
run during your pipeline execution. When you change this version, the *next
time* the `SelfMutate` step runs it will still be using the CLI of the the
*previous* version that was in this property: it will only start using the
new version after `SelfMutate` completes successfully. That means that if
you want to update both framework and CLI version, you should update the
CLI version first, commit, push and deploy, and only then update the
framework version.

---

##### `codeBuildDefaults`<sup>Optional</sup> <a name="codeBuildDefaults" id="parent-child-pipelines.ChildPipelineProps.property.codeBuildDefaults"></a>

```typescript
public readonly codeBuildDefaults: CodeBuildOptions;
```

- *Type:* aws-cdk-lib.pipelines.CodeBuildOptions
- *Default:* All projects run non-privileged build, SMALL instance, LinuxBuildImage.STANDARD_7_0

Customize the CodeBuild projects created for this pipeline.

---

##### `codePipeline`<sup>Optional</sup> <a name="codePipeline" id="parent-child-pipelines.ChildPipelineProps.property.codePipeline"></a>

```typescript
public readonly codePipeline: Pipeline;
```

- *Type:* aws-cdk-lib.aws_codepipeline.Pipeline
- *Default:* a new underlying pipeline is created.

An existing Pipeline to be reused and built upon.

[disable-awslint:ref-via-interface]

---

##### `crossAccountKeys`<sup>Optional</sup> <a name="crossAccountKeys" id="parent-child-pipelines.ChildPipelineProps.property.crossAccountKeys"></a>

```typescript
public readonly crossAccountKeys: boolean;
```

- *Type:* boolean
- *Default:* false

Create KMS keys for the artifact buckets, allowing cross-account deployments.

The artifact buckets have to be encrypted to support deploying CDK apps to
another account, so if you want to do that or want to have your artifact
buckets encrypted, be sure to set this value to `true`.

Be aware there is a cost associated with maintaining the KMS keys.

---

##### `crossRegionReplicationBuckets`<sup>Optional</sup> <a name="crossRegionReplicationBuckets" id="parent-child-pipelines.ChildPipelineProps.property.crossRegionReplicationBuckets"></a>

```typescript
public readonly crossRegionReplicationBuckets: {[ key: string ]: IBucket};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_s3.IBucket}
- *Default:* no cross region replication buckets.

A map of region to S3 bucket name used for cross-region CodePipeline.

For every Action that you specify targeting a different region than the Pipeline itself,
if you don't provide an explicit Bucket for that region using this property,
the construct will automatically create a Stack containing an S3 Bucket in that region.
Passed directly through to the {@link cp.Pipeline}.

---

##### `dockerCredentials`<sup>Optional</sup> <a name="dockerCredentials" id="parent-child-pipelines.ChildPipelineProps.property.dockerCredentials"></a>

```typescript
public readonly dockerCredentials: DockerCredential[];
```

- *Type:* aws-cdk-lib.pipelines.DockerCredential[]
- *Default:* []

A list of credentials used to authenticate to Docker registries.

Specify any credentials necessary within the pipeline to build, synth, update, or publish assets.

---

##### `dockerEnabledForSelfMutation`<sup>Optional</sup> <a name="dockerEnabledForSelfMutation" id="parent-child-pipelines.ChildPipelineProps.property.dockerEnabledForSelfMutation"></a>

```typescript
public readonly dockerEnabledForSelfMutation: boolean;
```

- *Type:* boolean
- *Default:* false

Enable Docker for the self-mutate step.

Set this to true if the pipeline itself uses Docker container assets
(for example, if you use `LinuxBuildImage.fromAsset()` as the build
image of a CodeBuild step in the pipeline).

You do not need to set it if you build Docker image assets in the
application Stages and Stacks that are *deployed* by this pipeline.

Configures privileged mode for the self-mutation CodeBuild action.

If you are about to turn this on in an already-deployed Pipeline,
set the value to `true` first, commit and allow the pipeline to
self-update, and only then use the Docker asset in the pipeline.

---

##### `dockerEnabledForSynth`<sup>Optional</sup> <a name="dockerEnabledForSynth" id="parent-child-pipelines.ChildPipelineProps.property.dockerEnabledForSynth"></a>

```typescript
public readonly dockerEnabledForSynth: boolean;
```

- *Type:* boolean
- *Default:* false

Enable Docker for the 'synth' step.

Set this to true if you are using file assets that require
"bundling" anywhere in your application (meaning an asset
compilation step will be run with the tools provided by
a Docker image), both for the Pipeline stack as well as the
application stacks.

A common way to use bundling assets in your application is by
using the `aws-cdk-lib/aws-lambda-nodejs` library.

Configures privileged mode for the synth CodeBuild action.

If you are about to turn this on in an already-deployed Pipeline,
set the value to `true` first, commit and allow the pipeline to
self-update, and only then use the bundled asset.

---

##### `enableKeyRotation`<sup>Optional</sup> <a name="enableKeyRotation" id="parent-child-pipelines.ChildPipelineProps.property.enableKeyRotation"></a>

```typescript
public readonly enableKeyRotation: boolean;
```

- *Type:* boolean
- *Default:* false (key rotation is disabled)

Enable KMS key rotation for the generated KMS keys.

By default KMS key rotation is disabled, but will add
additional costs when enabled.

---

##### `pipelineName`<sup>Optional</sup> <a name="pipelineName" id="parent-child-pipelines.ChildPipelineProps.property.pipelineName"></a>

```typescript
public readonly pipelineName: string;
```

- *Type:* string
- *Default:* Automatically generated

The name of the CodePipeline pipeline.

---

##### `publishAssetsInParallel`<sup>Optional</sup> <a name="publishAssetsInParallel" id="parent-child-pipelines.ChildPipelineProps.property.publishAssetsInParallel"></a>

```typescript
public readonly publishAssetsInParallel: boolean;
```

- *Type:* boolean
- *Default:* true

Publish assets in multiple CodeBuild projects.

If set to false, use one Project per type to publish all assets.

Publishing in parallel improves concurrency and may reduce publishing
latency, but may also increase overall provisioning time of the CodeBuild
projects.

Experiment and see what value works best for you.

---

##### `reuseCrossRegionSupportStacks`<sup>Optional</sup> <a name="reuseCrossRegionSupportStacks" id="parent-child-pipelines.ChildPipelineProps.property.reuseCrossRegionSupportStacks"></a>

```typescript
public readonly reuseCrossRegionSupportStacks: boolean;
```

- *Type:* boolean
- *Default:* true (Use the same support stack for all pipelines in App)

Reuse the same cross region support stack for all pipelines in the App.

---

##### `role`<sup>Optional</sup> <a name="role" id="parent-child-pipelines.ChildPipelineProps.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A new role is created

The IAM role to be assumed by this Pipeline.

---

##### `selfMutation`<sup>Optional</sup> <a name="selfMutation" id="parent-child-pipelines.ChildPipelineProps.property.selfMutation"></a>

```typescript
public readonly selfMutation: boolean;
```

- *Type:* boolean
- *Default:* true

Whether the pipeline will update itself.

This needs to be set to `true` to allow the pipeline to reconfigure
itself when assets or stages are being added to it, and `true` is the
recommended setting.

You can temporarily set this to `false` while you are iterating
on the pipeline itself and prefer to deploy changes using `cdk deploy`.

---

##### `selfMutationCodeBuildDefaults`<sup>Optional</sup> <a name="selfMutationCodeBuildDefaults" id="parent-child-pipelines.ChildPipelineProps.property.selfMutationCodeBuildDefaults"></a>

```typescript
public readonly selfMutationCodeBuildDefaults: CodeBuildOptions;
```

- *Type:* aws-cdk-lib.pipelines.CodeBuildOptions
- *Default:* Only `codeBuildDefaults` are applied

Additional customizations to apply to the self mutation CodeBuild projects.

---

##### `synthCodeBuildDefaults`<sup>Optional</sup> <a name="synthCodeBuildDefaults" id="parent-child-pipelines.ChildPipelineProps.property.synthCodeBuildDefaults"></a>

```typescript
public readonly synthCodeBuildDefaults: CodeBuildOptions;
```

- *Type:* aws-cdk-lib.pipelines.CodeBuildOptions
- *Default:* Only `codeBuildDefaults` are applied

Additional customizations to apply to the synthesize CodeBuild projects.

---

##### `useChangeSets`<sup>Optional</sup> <a name="useChangeSets" id="parent-child-pipelines.ChildPipelineProps.property.useChangeSets"></a>

```typescript
public readonly useChangeSets: boolean;
```

- *Type:* boolean
- *Default:* true

Deploy every stack by creating a change set and executing it.

When enabled, creates a "Prepare" and "Execute" action for each stack. Disable
to deploy the stack in one pipeline action.

---

##### `affectedPaths`<sup>Required</sup> <a name="affectedPaths" id="parent-child-pipelines.ChildPipelineProps.property.affectedPaths"></a>

```typescript
public readonly affectedPaths: string[];
```

- *Type:* string[]

---

##### `projectNames`<sup>Required</sup> <a name="projectNames" id="parent-child-pipelines.ChildPipelineProps.property.projectNames"></a>

```typescript
public readonly projectNames: string[];
```

- *Type:* string[]

---

##### `appMapFilePath`<sup>Optional</sup> <a name="appMapFilePath" id="parent-child-pipelines.ChildPipelineProps.property.appMapFilePath"></a>

```typescript
public readonly appMapFilePath: string;
```

- *Type:* string

---

##### `stripAssets`<sup>Optional</sup> <a name="stripAssets" id="parent-child-pipelines.ChildPipelineProps.property.stripAssets"></a>

```typescript
public readonly stripAssets: boolean;
```

- *Type:* boolean

---

### ParentPipelineProps <a name="ParentPipelineProps" id="parent-child-pipelines.ParentPipelineProps"></a>

#### Initializer <a name="Initializer" id="parent-child-pipelines.ParentPipelineProps.Initializer"></a>

```typescript
import { ParentPipelineProps } from 'parent-child-pipelines'

const parentPipelineProps: ParentPipelineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#parent-child-pipelines.ParentPipelineProps.property.input">input</a></code> | <code>aws-cdk-lib.pipelines.IFileSetProducer</code> | *No description.* |
| <code><a href="#parent-child-pipelines.ParentPipelineProps.property.synthCommands">synthCommands</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#parent-child-pipelines.ParentPipelineProps.property.appMapFilePath">appMapFilePath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#parent-child-pipelines.ParentPipelineProps.property.pipelineProps">pipelineProps</a></code> | <code>aws-cdk-lib.pipelines.CodePipelineProps</code> | *No description.* |

---

##### `input`<sup>Required</sup> <a name="input" id="parent-child-pipelines.ParentPipelineProps.property.input"></a>

```typescript
public readonly input: IFileSetProducer;
```

- *Type:* aws-cdk-lib.pipelines.IFileSetProducer

---

##### `synthCommands`<sup>Required</sup> <a name="synthCommands" id="parent-child-pipelines.ParentPipelineProps.property.synthCommands"></a>

```typescript
public readonly synthCommands: string[];
```

- *Type:* string[]

---

##### `appMapFilePath`<sup>Optional</sup> <a name="appMapFilePath" id="parent-child-pipelines.ParentPipelineProps.property.appMapFilePath"></a>

```typescript
public readonly appMapFilePath: string;
```

- *Type:* string

---

##### `pipelineProps`<sup>Optional</sup> <a name="pipelineProps" id="parent-child-pipelines.ParentPipelineProps.property.pipelineProps"></a>

```typescript
public readonly pipelineProps: CodePipelineProps;
```

- *Type:* aws-cdk-lib.pipelines.CodePipelineProps

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IAppMap <a name="IAppMap" id="parent-child-pipelines.IAppMap"></a>

- *Implemented By:* <a href="#parent-child-pipelines.IAppMap">IAppMap</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#parent-child-pipelines.IAppMap.property.pathsToPipelines">pathsToPipelines</a></code> | <code>{[ key: string ]: string[]}</code> | *No description.* |
| <code><a href="#parent-child-pipelines.IAppMap.property.projectsToPipelines">projectsToPipelines</a></code> | <code>{[ key: string ]: string[]}</code> | *No description.* |

---

##### `pathsToPipelines`<sup>Required</sup> <a name="pathsToPipelines" id="parent-child-pipelines.IAppMap.property.pathsToPipelines"></a>

```typescript
public readonly pathsToPipelines: {[ key: string ]: string[]};
```

- *Type:* {[ key: string ]: string[]}

---

##### `projectsToPipelines`<sup>Required</sup> <a name="projectsToPipelines" id="parent-child-pipelines.IAppMap.property.projectsToPipelines"></a>

```typescript
public readonly projectsToPipelines: {[ key: string ]: string[]};
```

- *Type:* {[ key: string ]: string[]}

---

