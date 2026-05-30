# HeartbeatAgent

Proactive condition monitor — evaluates conditions defined in `~/.koupper/heartbeat.md` and dispatches other agents automatically when conditions are met.

## Purpose

Turn Koupper from a reactive system into a proactive one. Instead of waiting for a user to submit a job, HeartbeatAgent checks conditions on every run and triggers other agents when something is true — a file exists, a queue has failures, a time threshold has passed.

## Usage

```bash
# Run once manually
koupper run ~/.koupper/agents/HeartbeatAgent.kts

# Schedule to run every 60 seconds
koupper schedule add HeartbeatAgent.kts --rate=60000 --id=heartbeat
koupper worker --enable-scheduling
```

## heartbeat.md format

On first run, `~/.koupper/heartbeat.md` is created with two default conditions. Edit it to define your own:

```markdown
## Condition: morning-digest
- when: time_after
- target: 08:00
- agent: RssFeedAgent.kts
- queue: default
- cooldown: 720

## Condition: queue-alert
- when: queue_has_failed
- target: default
- agent: GreetingAgent.kts
- queue: default
- cooldown: 60
```

## Condition types

| `when` value | Triggers when |
|---|---|
| `file_exists` | A file or directory exists at `target` path |
| `queue_empty` | The `target` queue has no pending or processing jobs |
| `queue_has_failed` | The `target` queue has jobs in `.failed/` |
| `time_after` | Current time is past `target` (format: `HH:mm`) |
| `always` | Every run (respects cooldown) |

## Fields

| Field | Required | Description |
|---|---|---|
| `when` | Yes | Condition type (see table above) |
| `target` | Depends | File path, queue name, or time string |
| `agent` | Yes | Agent script filename in `~/.koupper/agents/` |
| `queue` | No | Queue to dispatch job to (default: `default`) |
| `cooldown` | No | Minimum minutes between triggers (default: `60`) |

## State

Last-triggered timestamps are persisted in `~/.koupper/heartbeat-state.json` to enforce cooldowns across runs.

## Output

Log written to: `~/.koupper/jobs/logs/default/heartbeat.log`

```
[08:00:00] ◈ HEARTBEAT — evaluating conditions
[08:00:00]   2 condition(s) loaded from heartbeat.md
[08:00:00]   [morning-digest] when=time_after → fires=true cooldown_ok=true
[08:00:00]   ▶ Dispatched RssFeedAgent.kts → queue:default
[08:00:00]   [queue-alert] when=queue_has_failed → fires=false cooldown_ok=true
[08:00:00]   Done — 1 condition(s) triggered
```

## Full autonomy setup

```bash
# 1. Configure feeds
cat > ~/.koupper/agents/rss-feeds.json << 'EOF'
[{"name":"Hacker News","url":"https://news.ycombinator.com/rss"}]
EOF

# 2. Schedule heartbeat every minute
koupper schedule add HeartbeatAgent.kts --rate=60000 --id=heartbeat

# 3. Start worker with scheduling
koupper worker --enable-scheduling
```

From this point, HeartbeatAgent runs every 60 seconds and dispatches agents automatically based on `heartbeat.md`.

## Providers used

None — reads the filesystem and writes job files directly.

## skill.json

```json
{
  "name": "HeartbeatAgent",
  "role": "Proactive scheduler / condition evaluator",
  "triggers": ["schedule-rate", "schedule-cron"],
  "persistent": false
}
```
