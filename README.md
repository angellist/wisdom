# About

The Parent Child Pipelines construct allows users to use Pipelines V1 to handle mono repo deployments such that child pipelines are triggered depending on the folder and file changes in the parent repository.

It is written in Typescript to wrap the AWS CDK CodePipeline construct and is designed to be used in a CDK application.

## How it works

The Parent Pipeline is triggered on all changes to the repository. It uses a CodeBuild project to determine the changes in the repository and then triggers the Child Pipelines based on the changes.

## Usage

See the example/ directory for complete examples.

1. Implement the Child Pipeline construct in the individual app/stacks that you want to deploy.
1. Implement the Parent Pipeline construct in either a general infrastructure CDK app/stack or as a standalone app/stack within your mono-repo.
1. Deploy the pipelines to your pipeline/infrastructure AWS Account.

That's it! The Parent Pipeline will now trigger the Child Pipelines based on the changes in the parent repository.

## Setting up your development environment

Pre-Requisite: Install Bun

```
   curl https://bun.sh/install | bash
```

Install the packages

```
   bun install
```

## Execute child pipelines from CLI

Pre-requisite: make sure you have aws permissions to invoke the pipelines and that you've built the project

```
   bun run execute-child-pipelines
```

## Developing

We use projen to manage the configurations and scripts. See the [projen documentation](https://projen.io/docs/project-types/aws-cdk-construct-library) for more information.

## How was this project created?

Using the following commands from the project directory

```bash
npx projen new awscdk-construct
bun i
```
