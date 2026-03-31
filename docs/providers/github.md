# GitHub Provider

`github` enables GitHub API automation from Koupper scripts.

## Contract

- `GitHubClient`

## Core capabilities

- create issues
- create pull requests
- merge pull requests
- dispatch workflows
- inspect workflow runs
- list check-runs

## Environment variables

Required:

- `GITHUB_TOKEN`

Optional:

- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_API_URL` (default: `https://api.github.com`)
- `GITHUB_USER_AGENT` (default: `koupper-github-provider`)
- `GITHUB_TIMEOUT_SECONDS` (default: `30`)

## Example script

Koupper repo includes a runnable sample:

- `examples/github-provider-flow.kts`
- `examples/github-provider-flow.create-issue.input.json`

Run example:

```bash
koupper run examples/github-provider-flow.kts --json-file examples/github-provider-flow.create-issue.input.json
```

## Recommended usage pattern

- Keep operation plans in JSON (`--json-file`) instead of inline strings.
- Use one script with multiple actions and change only the input payload.
- Pair with CI policy gates (`fast checks` + optional full smoke) for reliable automation.

## Integration flow docs

For full multi-repo orchestration concepts and staged flow templates:

- [GitHub Integration Flow](/automation/github-integration-flow)
