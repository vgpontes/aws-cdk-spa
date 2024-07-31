import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Victor Pontes',
  authorAddress: 'victorpontes2013@gmail.com',
  cdkVersion: '2.123.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.4.0',
  name: 'projen',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/vgpontes/cdk-spa.git',
  packageName: 'cdk-spa',
  description: 'Construct to deploy a single-page-application using S3 and Cloudfront.',
  bundledDeps: ['case'],
  gitignore: ['cdk.out']
});
project.synth();