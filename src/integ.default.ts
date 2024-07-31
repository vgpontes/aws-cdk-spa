import * as cdk from 'aws-cdk-lib';
import { SinglePageApplication } from './index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'MyStack');

new SinglePageApplication(stack, 'website', {
  applicationName: 'vgpontes-website',
  websiteDirectory: 'example',
});