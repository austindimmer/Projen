import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { Stack, StackProps, Construct, SecretValue } from '@aws-cdk/core';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';
import { MyApplication } from './MyApplication';


export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    const pipeline = new CdkPipeline(this, 'Pipeline', {
      pipelineName: 'MyAppPipeline',
      cloudAssemblyArtifact,

      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: 'GitHub',
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager('ProjenPipelineTest'),
        trigger: codepipeline_actions.GitHubTrigger.POLL,
        // Replace these with your actual GitHub project info
        owner: 'austindimmer',
        repo: 'https://github.com/austindimmer/Projen.git',
      }),

      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,

        // Use this if you need a build step (if you're not using ts-node
        // or if you have TypeScript Lambdas that need to be compiled).
        buildCommand: 'npm run build',
      }),


    });


    // Do this as many times as necessary with any account and region
    // Account and region may be different from the pipeline's.
    pipeline.addApplicationStage(new MyApplication(this, 'Prod', {
      env: {
        account: '123456789012',
        region: 'eu-west-1',
      },
    }));
  }
}