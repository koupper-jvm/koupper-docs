# `koupper agent`

Manage installed agents: list, inspect, install, and remove agent scripts.

## Subcommands

| Subcommand | Description |
|---|---|
| `list` | List all installed agents from `~/.koupper/agents/` |
| `info <name>` | Show detailed metadata for an agent (triggers, providers, tags, env vars) |
| `install <url>` | Download and install an agent `.kts` file and optional `.skill.json` |
| `remove <name>` | Delete an agent's files from `~/.koupper/agents/` |

## Usage

### List installed agents
```bash
koupper agent list
```
Scans `~/.koupper/agents/` for `.skill.json` files and displays agent names and descriptions.

### Inspect an agent
```bash
koupper agent info RssFeedAgent
```
Shows:
- Agent name and description
- Trigger configuration (scheduled, heartbeat, manual)
- Required providers and environment variables
- Tags and metadata

### Install an agent
```bash
# From URL
koupper agent install https://example.com/agents/RssFeedAgent.kts

# From GitHub shorthand
koupper agent install github:koupper-jvm/agents/RssFeedAgent.kts
```
Downloads the `.kts` file and optional `.skill.json` to `~/.koupper/agents/`.

### Remove an agent
```bash
koupper agent remove RssFeedAgent
```
Deletes the agent's `.kts` and `.skill.json` files.

## Agent metadata format

Agents can include a `.skill.json` file:
```json
{
  "name": "RssFeedAgent",
  "description": "Fetches RSS feeds and optionally summarizes them via LLM",
  "triggers": ["scheduled", "manual"],
  "providers": ["rss", "ai"],
  "env": [
    { "name": "RSS_FEED_URL", "required": true, "description": "RSS feed URL to monitor" }
  ],
  "tags": ["rss", "digest", "automation"]
}
```

## Related

- [Commands overview](/commands/)
- [Worker command](/commands/worker)
- [Schedule command](/commands/schedule)
