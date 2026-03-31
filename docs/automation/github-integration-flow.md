# GitHub Integration Flow (JSON-driven)

This is the operational automation flow for GitHub actions around PR validation, workflow orchestration, merge, and follow-up issue creation.

Use one script and change only JSON parameters per request.

## Primary script

- `automation/github-multi-repo-flow.kts`

Reference single-repo script:

- `examples/github-integration-flow.kts`

## Core concept

The script executes **targets** sequentially. Each target maps to one repository (`owner` + `repo`) and can run staged actions:

1. wait required check-runs
2. dispatch a workflow
3. wait workflow completion
4. merge pull request
5. create follow-up issues

This makes the flow deterministic and safe for multi-repo integrations.

## Run

```bash
koupper run automation/github-multi-repo-flow.kts --json-file automation/flows/koupper-stack.sample.json
```

## Preset flow files (production-oriented)

- `automation/flows/flow-pr-fast.json`
  - wait for fast PR checks only
- `automation/flows/flow-pre-merge-full-smoke.json`
  - wait fast checks, dispatch full smoke, wait result
- `automation/flows/flow-merge-and-followups.json`
  - merge PR and generate follow-up issues
- `automation/flows/koupper-stack.sample.json`
  - multi-repo sample baseline

## Input model

Top-level fields:

- `dryRun` (`true|false`): simulate operations when true
- `continueOnError` (`true|false`): continue remaining targets after one fails
- `targets[]`: list of repository operations

Per target fields:

- `name`, `enabled`, `owner`, `repo`
- `pullRequest`:
  - `create`, `title`, `body`, `head`, `base`, `number`, `merge`, `mergeMethod`
- `checks`:
  - `wait`, `ref`, `required[]`, `timeoutSeconds`, `pollIntervalSeconds`
- `workflow`:
  - `dispatch`, `workflowId`, `ref`, `inputs`, `wait`, `timeoutSeconds`, `pollIntervalSeconds`
- `issues[]`:
  - `title`, `body`, `labels[]`, `assignees[]`

## Issue Template Pack (auto issue generation)

Use `issueTemplatePack` per target to auto-create provider refactor issues without writing each issue body manually.

Supported pack:

- `kind: "provider-refactor"`

Fields:

- `enabled`
- `providers[]` (example: `db`, `github`, `ai`)
- `labels[]`
- `assignees[]`
- `bodyPrefix`

Result:

- issues titled `refactor(provider): <provider>`
- standardized acceptance criteria body generated automatically

## Execution strategy recommendation

1. Use `flow-pr-fast.json` during active PR iteration.
2. Use `flow-pre-merge-full-smoke.json` when branch is ready.
3. Use `flow-merge-and-followups.json` after validation completes.

## Dry-run and apply modes

- Start with `dryRun: true`.
- Switch to `dryRun: false` only when refs/PR numbers are confirmed.

## Required environment

Minimum:

- `GITHUB_TOKEN`

Recommended defaults:

- `GITHUB_OWNER`
- `GITHUB_REPO`

Provider details and API capabilities:

- [GitHub Provider](/providers/github)

## Troubleshooting

- If runs are not found, validate `workflowId`, `ref`, and repository visibility.
- If checks never complete, verify required check names match GitHub exactly.
- If merge fails, verify branch protection/check requirements and token permissions.
