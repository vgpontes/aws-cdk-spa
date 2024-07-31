import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SinglePageApplication } from '../lib/index';

test('S3 Bucket should be created with correct properties', () => {
  const app = new App();
  const stack = new Stack(app);
  new SinglePageApplication(stack, 'spa-s3-test', {
    applicationName: 'testApp',
    websiteDirectory: './test/test_website',
  });
  const template = Template.fromStack(stack);


  template.hasResourceProperties('AWS::S3::Bucket', {
    AccessControl: 'Private',
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: true,
      BlockPublicPolicy: true,
      IgnorePublicAcls: true,
      RestrictPublicBuckets: true,
    },
    BucketEncryption: {
      ServerSideEncryptionConfiguration: [{
        ServerSideEncryptionByDefault: {
          SSEAlgorithm: 'AES256',
        },
      }],
    },
    VersioningConfiguration: {
      Status: 'Enabled',
    },
  });
});

test('Certificate created if domainName is provided', () => {
  const app = new App();
  const stack = new Stack(app);
  new SinglePageApplication(stack, 'spa-doc-test', {
    applicationName: 'testApp',
    websiteDirectory: './test/test_website',
    domainName: 'test.com',
  });
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::CertificateManager::Certificate', {
    DomainName: 'test.com',
    KeyAlgorithm: 'RSA_2048',
    ValidationMethod: 'DNS',
  });
});

test('Certificate created with all domains', () => {
  const app = new App();
  const stack = new Stack(app);
  new SinglePageApplication(stack, 'spa-doc-test', {
    applicationName: 'testApp',
    websiteDirectory: './test/test_website',
    domainName: 'test.com',
    alternativeDomainNames: ['www.test.com'],
  });
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::CertificateManager::Certificate', {
    DomainName: 'test.com',
    SubjectAlternativeNames: ['www.test.com'],
    KeyAlgorithm: 'RSA_2048',
    ValidationMethod: 'DNS',
  });
});

test('Certificate not created if domainName is not provided', () => {
  const app = new App();
  const stack = new Stack(app);
  new SinglePageApplication(stack, 'spa-doc-test', {
    applicationName: 'testApp',
    websiteDirectory: './test/test_website',
  });
  const template = Template.fromStack(stack);

  template.resourcePropertiesCountIs('AWS::CertificateManager::Certificate', {
    DomainName: 'test.com',
  }, 0);
});

test('Cloudfront distribution is created', () => {
  const app = new App();
  const stack = new Stack(app);
  new SinglePageApplication(stack, 'spa-doc-test', {
    applicationName: 'testApp',
    websiteDirectory: './test/test_website',
  });
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::CloudFront::Distribution', {
    DistributionConfig: {
      DefaultRootObject: 'index.html',
      CustomErrorResponses: [
        {
          ErrorCode: 404,
          ResponseCode: 404,
          ResponsePagePath: '404.html',
        },
      ],
    },
  });
});

test('Cloudfront distribution is created with different index and error documents', () => {
  const app = new App();
  const stack = new Stack(app);
  new SinglePageApplication(stack, 'spa-doc-test', {
    applicationName: 'testApp',
    websiteDirectory: './test/test_website',
    websiteIndexDocument: 'home.html',
    websiteErrorDocument: 'error.html',
  });
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::CloudFront::Distribution', {
    DistributionConfig: {
      DefaultRootObject: 'home.html',
      CustomErrorResponses: [
        {
          ErrorCode: 404,
          ResponseCode: 404,
          ResponsePagePath: 'error.html',
        },
      ],
    },
  });
});

test('Cloudfront distribution is created with one domain', () => {
  const app = new App();
  const stack = new Stack(app);
  new SinglePageApplication(stack, 'spa-doc-test', {
    applicationName: 'testApp',
    websiteDirectory: './test/test_website',
    domainName: 'test.com',
  });
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::CloudFront::Distribution', {
    DistributionConfig: {
      Aliases: ['test.com'],
    },
  });
});

it('Cloudfront distribution is created with all domains', () => {
  const app = new App();
  const stack = new Stack(app);
  new SinglePageApplication(stack, 'spa-doc-test', {
    applicationName: 'testApp',
    websiteDirectory: './test/test_website',
    domainName: 'test.com',
    alternativeDomainNames: ['www.test.com'],
  });
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::CloudFront::Distribution', {
    DistributionConfig: {
      Aliases: ['test.com', 'www.test.com'],
    },
  });
});

it('Should error when alternativeDomainNames is defined but not domainName', () => {
  const app = new App();
  const stack = new Stack(app);

  expect(() => new SinglePageApplication(stack, 'spa-doc-test', {
    applicationName: 'testApp',
    websiteDirectory: './test/test_website',
    alternativeDomainNames: ['www.test.com'],
  })).toThrow(Error);
});