import { Stack } from 'aws-cdk-lib';
import { Certificate, CertificateValidation, KeyAlgorithm } from 'aws-cdk-lib/aws-certificatemanager';
import { Distribution as CloudfrontDistribution, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { BlockPublicAccess, Bucket, BucketAccessControl, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, ServerSideEncryption, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { kebab as toKebabCase } from 'case';
import { Construct } from 'constructs';

export interface SinglePageApplicationProps {
  /**
   * Chosen name for single-page application.
   */
  readonly applicationName: string;

  /**
   * Path to folder containing contents of single-page application.
   */
  readonly websiteDirectory: string;

  /**
   * Domain name for website.
   *
   * @default - A website will be created with the default generated name (e.g., d111111abcdef8.cloudfront.net)
   */
  readonly domainName?: string;

  /**
   * Alternative domain names on your certificate.
   *
   * @default - No alternative names on certificate.
   */
  readonly alternativeDomainNames?: string[];

  /**
   * The name of the index document (e.g. "index.html") for the website.
   *
   * @default - 'index.html'
   */
  readonly websiteIndexDocument?: string;

  /**
   * The name of the error document (e.g. "404.html") for the website.
   *
   * @default - '404.html'
   */
  readonly websiteErrorDocument?: string;
}

export class SinglePageApplication extends Construct {

  constructor(scope: Construct, id: string, props: SinglePageApplicationProps) {
    super(scope, id);

    if (props.alternativeDomainNames && !props.domainName) {
      throw new Error('Property alternativeDomainNames is defined but domainName is undefined');
    }

    var domains;

    if (props.domainName) {
      domains = [props.domainName];
      if (props.alternativeDomainNames) {
        domains = domains.concat(props.alternativeDomainNames);
      }
    }

    const applicationName = toKebabCase(props.applicationName);
    const accountId = Stack.of(this).account;
    const region = Stack.of(this).region;

    const websiteIndexDocument = props.websiteIndexDocument ? props.websiteIndexDocument : 'index.html';
    const websiteErrorDocument = props.websiteErrorDocument ? props.websiteErrorDocument : '404.html';

    const bucket = new Bucket(this, `${applicationName}-spa-bucket`, {
      bucketName: `${applicationName}-${accountId}-${region}`,
      accessControl: BucketAccessControl.PRIVATE,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      versioned: true,
    });

    new BucketDeployment(this, `${applicationName}-spa-assets`, {
      destinationBucket: bucket,
      sources: [Source.asset(props.websiteDirectory)],
      logGroup: new LogGroup(this, `${applicationName}-spa-assets-log-group`, {
        retention: RetentionDays.TWO_WEEKS,
      }),
      serverSideEncryption: ServerSideEncryption.AES_256,
    });

    let certificate;

    if (props.domainName) {
      certificate = new Certificate(this, `${applicationName}-certificate`, {
        domainName: props.domainName,
        certificateName: `${applicationName}-certificate`,
        subjectAlternativeNames: props.alternativeDomainNames,
        validation: CertificateValidation.fromDns(),
        keyAlgorithm: KeyAlgorithm.RSA_2048,
      });
    }

    const distribution = new CloudfrontDistribution(this, `${applicationName}-distribution`, {
      defaultBehavior: {
        origin: new S3Origin(bucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      certificate: certificate,
      defaultRootObject: websiteIndexDocument,
      domainNames: domains ?? undefined,
      errorResponses: [{
        httpStatus: 404,
        responsePagePath: websiteErrorDocument,
      }],
    });

    bucket.addToResourcePolicy(new PolicyStatement({
      principals: [new ServicePrincipal('cloudfront.amazonaws.com')],
      actions: ['s3:GetObject*'],
      effect: Effect.ALLOW,
      resources: [bucket.arnForObjects('*')],
      conditions: {
        StringEquals: {
          'aws:SourceArn': `arn:aws:cloudfront::${accountId}:distribution/${distribution.distributionId}`,
        },
      },
    }));
  }
}
