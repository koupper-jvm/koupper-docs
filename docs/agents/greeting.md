# GreetingAgent

Analyzes the current swarm state and writes a summary report to the log.

## Purpose

Run once on startup (or on demand) to get a quick picture of what's happening in the swarm: how many agents are deployed, which queues have activity, and whether any jobs have failed.

## Usage

```bash
# Directly
koupper run ~/.koupper/agents/GreetingAgent.kts

# As a worker job
echo '{"scriptPath":"/home/you/.koupper/agents/GreetingAgent.kts"}' \
  > ~/.koupper/jobs/default/greeting-$(date +%s).json
```

## Output

```
[08:00:01] ┌─────────────────────────────────────┐
[08:00:01] │   CORTEX ONLINE — SWARM ANALYSIS    │
[08:00:01] └─────────────────────────────────────┘
[08:00:01] 
[08:00:01]   DEPLOYED AGENTS  : 4
[08:00:01]   ACTIVE QUEUES    : cortex, default
[08:00:01]   JOBS PENDING     : 0
[08:00:01]   JOBS IN FLIGHT   : 1
[08:00:01]   JOBS FAILED      : 0
[08:00:01] 
[08:00:01]   STATUS ► ACTIVE     1 job(s) in flight
```

Log written to: `~/.koupper/jobs/logs/cortex/cortex-greeting.log`

## Providers used

None — reads the filesystem directly.

## skill.json

```json
{
  "name": "GreetingAgent",
  "role": "Swarm analyst",
  "triggers": ["manual", "monitor-startup", "worker-job"],
  "persistent": false
}
```
