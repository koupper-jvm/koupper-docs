# Docs to Source Map

This page maps documentation walkthroughs to runnable source assets in the repository.

## Command and runtime smoke

- Quick Smoke: `examples/hello-world.kts`
- JSON run example: `examples/cli-report-generator.kts`
- JSON payload sample: `examples/cli-report-generator.input.json`

## Deployment examples

- Provider-driven deploy reference: `scripts/deploy/aws-release-flow.kts`
- Deploy config template: `scripts/deploy/deploy.environments.example.yaml`

## Script contract and pipeline references

- Single-entrypoint + pipeline pattern: `examples/pipeline-single-export-template.kts`
- Script execution contract (internal): `docs/SCRIPT_EXECUTION_CONTRACT.md`

## Provider examples

- Provider catalog source: `koupper/providers/src/main/resources/providers-catalog.json`
- AWS deploy provider implementation: `koupper/providers/src/main/kotlin/com/koupper/providers/aws/deploy/AwsDeployProvider.kt`

Use these paths when validating docs content against actual runnable assets.
