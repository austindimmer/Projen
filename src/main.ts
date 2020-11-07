import { App, Construct, Stack, StackProps, Stage, StageProps } from '@aws-cdk/core';
import { PipelineStack } from './pipeline-stack';


// Your application
// May consist of one or more Stacks
//

// for development, use account/region from cdk cli
// const devEnv = {
//   account: process.env.CDK_DEFAULT_ACCOUNT,
//   region: process.env.CDK_DEFAULT_REGION,
// };

const app = new App();

// new MyStack(app, 'my-stack-dev', { env: devEnv });
// new MyStack(app, 'my-stack-prod', { env: prodEnv });

const pipeline = new PipelineStack(app, 'PipelineStack', {
  env: {
    account: '022905651760',
    region: 'eu-west-1',
  },
});

app.synth();