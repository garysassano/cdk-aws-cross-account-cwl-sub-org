import { awscdk, javascript } from "projen";
import { IndentStyle } from "projen/lib/javascript/biome/biome-config";

const project = new awscdk.AwsCdkTypeScriptApp({
  name: "cdk-aws-cross-account-cwl-sub-org",

  // Base
  defaultReleaseBranch: "main",
  depsUpgradeOptions: { workflow: false },
  gitignore: ["**/target"],
  projenrcTs: true,

  // Toolchain
  biome: true,
  biomeOptions: {
    biomeConfig: {
      assist: {
        enabled: true,
        actions: {
          source: {
            organizeImports: {
              level: "on",
              options: {
                identifierOrder: "lexicographic",
              },
            },
          },
        },
      },
      formatter: {
        enabled: true,
        indentStyle: IndentStyle.SPACE,
        indentWidth: 2,
        lineWidth: 100,
      },
      linter: {
        enabled: true,
        rules: {
          recommended: true,
          suspicious: {
            noShadowRestrictedNames: "off",
          },
        },
      },
    },
  },
  cdkVersion: "2.214.0",
  minNodeVersion: "22.19.0",
  packageManager: javascript.NodePackageManager.PNPM,
  pnpmVersion: "10",

  // Deps
  deps: [
    "@aws-lambda-powertools/jmespath",
    "@aws-lambda-powertools/logger",
    "@dev7a/lambda-otel-lite",
    "@opentelemetry/api",
    "@types/aws-lambda",
  ],
  devDeps: ["zod"],
});

project.synth();
