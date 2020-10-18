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
  devDependencies: {
    // "aws-sdk": Semver.caret("2.708.0")
  },
  gitignore: [
    "BootstrapCdkPipelines.bat",
    "bootstrap.log.txt",
  ]
});

project.synth();
