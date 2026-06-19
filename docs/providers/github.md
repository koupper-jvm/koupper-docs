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

## CLI discovery

```bash
koupper provider info github
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.github.GitHubClient
import com.koupper.container.app

@Export
val createIssue: () -> String = {
    val github = app.getInstance(GitHubClient::class)
    
    val issue = github.createIssue(
        title = "Deploy failed in production",
        body = "The latest deploy returned exit code 1. Check logs.",
        labels = listOf("bug", "deploy")
    )
    "Issue created: ${issue.htmlUrl}"
}

@Export
val checkCI: () -> String = {
    val github = app.getInstance(GitHubClient::class)
    val runs = github.listWorkflowRuns(branch = "main")
    val latest = runs.firstOrNull()
    if (latest != null) "Latest CI: ${latest.status} — ${latest.conclusion}" else "No runs found"
}
```

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
