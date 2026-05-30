# RssFeedAgent

Fetches configured RSS feeds and optionally generates an AI summary using the local LLM.

## Purpose

Aggregate tech news (or any RSS/Atom feed) into a daily digest. When a local LLM is configured, it summarizes the items into 5 key bullet points.

## Usage

```bash
# Directly
koupper run ~/.koupper/agents/RssFeedAgent.kts

# As a worker job
echo '{"scriptPath":"/home/you/.koupper/agents/RssFeedAgent.kts"}' \
  > ~/.koupper/jobs/default/rss-$(date +%s).json

# On a schedule (every weekday at 8am)
koupper schedule add RssFeedAgent.kts --cron="0 8 * * 1-5" --id=morning-digest
koupper worker --enable-scheduling
```

## Configuration

Create `~/.koupper/agents/rss-feeds.json` to configure feeds:

```json
[
  { "name": "Hacker News", "url": "https://news.ycombinator.com/rss" },
  { "name": "The Verge",   "url": "https://www.theverge.com/rss/index.xml" },
  { "name": "My Blog",     "url": "https://myblog.com/feed.xml" }
]
```

If the file does not exist, defaults to Hacker News and The Verge.

## Output

Log written to: `~/.koupper/jobs/logs/default/rss-digest-<date>.log`

```
[08:00:01] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[08:00:01]   RSS FEED AGENT — Daily Digest
[08:00:01]   Date: 2026-05-30
[08:00:01] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[08:00:01]   Fetching: Hacker News
[08:00:02]   5 items fetched.
[08:00:02]     • Anthropic surpasses OpenAI to become most valuable AI startup
[08:00:02]     • Zig: Build System Reworked
[08:00:02]     • Voxel Space
[08:00:02]   Generating AI summary...
[08:00:15] • AI valuations are surging as Anthropic reaches new heights...
[08:00:15] • Systems programming is evolving with Zig's reworked build system...
```

## Providers used

| Provider | Purpose |
|---|---|
| `RSSReader` | Fetches and parses RSS/Atom feeds |
| `InferenceEngine` | Optional — generates AI summary with streaming |

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `KOUPPER_LLM_MODEL_PATH` | No | If set, generates a 5-bullet AI summary of fetched items. |
| `CORTEX_JOBS_DIR` | No | Jobs directory (default: `~/.koupper/jobs`). |

## skill.json

```json
{
  "name": "RssFeedAgent",
  "role": "RSS aggregator and summarizer",
  "triggers": ["manual", "worker-job", "schedule-daily"],
  "persistent": false
}
```
