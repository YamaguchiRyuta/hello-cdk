import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class HelloCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'HelloCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // new s3.Bucket(this, 'MyFirstBucket', {
    //   versioned: true,
    //   removalPolicy: RemovalPolicy.DESTROY,
    //   autoDeleteObjects: true
    // });

    const vpc = new ec2.Vpc(this, "cdk-yamaguchi-vpc", {
      cidr: "10.0.0.0/16",
      defaultInstanceTenancy: ec2.DefaultInstanceTenancy.DEFAULT,
      maxAzs: 1,
      natGateways: 0,
      enableDnsHostnames: true,
      enableDnsSupport: true,
      /**
       * Each entry in this list configures a Subnet Group
       *
       * ISOLATED: Isolated Subnets do not route traffic to the Internet (in this VPC).
       * PRIVATE.: Subnet that routes to the internet, but not vice versa.
       * PUBLIC..: Subnet connected to the Internet.
       */
      subnetConfiguration: [{
        cidrMask: 24,
        name: 'db',
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      }, {
        cidrMask: 24,
        name: 'dmz',
        subnetType: ec2.SubnetType.PUBLIC,
      }],
    });
  }
}
