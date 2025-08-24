import { App, type Environment } from "aws-cdk-lib";
import { OtlpReceiverStack } from "./stacks/otlp-receiver";
import { OtlpSenderStack } from "./stacks/otlp-sender";
import { validateEnv } from "./utils/validate-env";

const env = validateEnv(["CDK_ACCOUNT_SRC", "CDK_ACCOUNT_TRG", "CDK_REGION_SHARED"]);

const srcEnv: Environment = {
  account: env.CDK_ACCOUNT_SRC,
  region: env.CDK_REGION_SHARED,
};
const trgEnv: Environment = {
  account: env.CDK_ACCOUNT_TRG,
  region: env.CDK_REGION_SHARED,
};

const app = new App();

const otlpSenderStack = new OtlpSenderStack(app, "OtlpSenderStack-src", {
  stackName: "OtlpSenderStack-src",
  env: srcEnv,
});
const otlpReceiverStack = new OtlpReceiverStack(app, "OtlpReceiverStack-trg", {
  stackName: "OtlpReceiverStack-trg",
  env: trgEnv,
});

otlpSenderStack.addDependency(otlpReceiverStack);

app.synth();
