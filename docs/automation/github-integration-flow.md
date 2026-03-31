# GitHub Integration Flow (JSON-driven)

Use one script and change only JSON parameters per request.

## Primary script

- `automation/github-multi-repo-flow.kts`

Single-repo reference example is also available:

- `examples/github-integration-flow.kts`

## Sample payload

- `automation/flows/koupper-stack.sample.json`
- `examples/github-integration-flow.sample.json`

## Run

```bash
koupper run automation/github-multi-repo-flow.kts --json-file automation/flows/koupper-stack.sample.json
```

## Typical stages

The flow can orchestrate these stages per target repository:

1. wait required check-runs
2. dispatch a workflow
3. wait workflow completion
4. merge pull request
5. create follow-up issues

It runs sequentially across all enabled targets in the input JSON.

## Dry-run mode

Set `"dryRun": true` to validate logic without mutating GitHub resources.

## Minimum environment

- `GITHUB_TOKEN`

Recommended defaults:

- `GITHUB_OWNER`
- `GITHUB_REPO`

For provider details, see [GitHub Provider](/providers/github).
