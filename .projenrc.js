const { AwsCdkTypeScriptApp } = require('projen');

const project = new AwsCdkTypeScriptApp({
  cdkVersion: "1.63.0",
  name: "Projen",
  authorName: "Austin Dimmer",
  authorOrganization: "Effective Computing Ltd",
  cdkDependencies: [
    "@aws-cdk/aws-codebuild",
    "@aws-cdk/aws-codepipeline-actions",
  ],
  context: {
    "@aws-cdk/core:newStyleStackSynthesis": "true"
  },
  devDependencies: {
    // "aws-sdk": Semver.caret("2.708.0")
  },
  gitignore: [
    "BootstrapCdkPipelines.bat",
    "bootstrap.log.txt",
  ],
  buildWorkflow: false,
  releaseWorkflow: true,

});


project.addScript(
  "compile", "jsii --silence-warnings=reserved-word --no-fix-peer-dependencies && jsii-docgen && cp src/nightynight.handler.ts lib/nightynight.handler.ts"
);



const tempDirectories = ["cdk.context.json", ".cdk.staging/", ".idea/", ".parcel-cache/", "cdk.out/"];
project.gitignore.exclude(...tempDirectories);
project.npmignore.exclude(...tempDirectories);

// const workflow = new GithubWorkflow(project, "TestWorkflow");
// workflow.on({
//   push
// });



project.synth();
