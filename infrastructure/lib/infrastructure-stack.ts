import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as dotenv from "dotenv";

dotenv.config();

export class InfrastructureStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const layer = new lambda.LayerVersion(this, "BaseLayer", {
            code: lambda.Code.fromAsset("lambda-base-layer/layer.zip"),
            compatibleRuntimes: [lambda.Runtime.PYTHON_3_9],
        });

        const apiLambda = new lambda.Function(this, "ApiFunction", {
            runtime: lambda.Runtime.PYTHON_3_9,
            code: lambda.Code.fromAsset("../app/"),
            handler: "app_api.handler",
            layers: [layer],
            environment: {
                OPENAI_API_KEY: process.env.OPEN_API_KEY ?? "",
            },
        });

        const appApi = new apiGateway.RestApi(this, "RestApi", {
            restApiName: "App API",
        });

        appApi.root.addProxy({
            defaultIntegration: new apiGateway.LambdaIntegration(apiLambda),
        });
    }
}
