# GitHub Integration Flow (JSON-driven)

Use one script and change only JSON parameters per request.

## Script

- `examples/github-integration-flow.kts`

## Sample payload

- `examples/github-integration-flow.sample.json`

## Run

```bash
koupper run examples/github-integration-flow.kts --json-file examples/github-integration-flow.sample.json
```

## Typical stages

The flow can orchestrate these stages in order:

1. wait required check-runs
2. dispatch a workflow
3. wait workflow completion
4. merge pull request
5. create follow-up issues

## Dry-run mode

Set `"dryRun": true` to validate logic without mutating GitHub resources.

## Minimum environment

- `GITHUB_TOKEN`

Recommended defaults:

- `GITHUB_OWNER`
- `GITHUB_REPO`

For provider details, see [GitHub Provider](/providers/github).
