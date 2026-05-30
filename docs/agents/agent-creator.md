# AgentCreatorAgent

Interactive wizard that collects a name, role, and objective, then uses the local LLM to generate a working Koupper agent script.

## Purpose

Create new agents through a conversational interface without writing code. The LLM generates a complete, working `.kts` implementation based on your specification.

## Usage

```bash
# As a worker job (recommended — shows in dashboard)
echo '{"scriptPath":"/home/you/.koupper/agents/AgentCreatorAgent.kts"}' \
  > ~/.koupper/jobs/default/wizard-$(date +%s).json
```

Then type answers in the CORTEX dashboard command bar or web UI chat.

## Wizard flow

```
[?] What is the agent name? (e.g. DataSyncAgent)
> DataSyncAgent

[?] What is the agent role / specialty?
> Data synchronization between local files and remote APIs

[?] What should this agent do? (be specific)
> Read a JSON file from ~/data/source.json, call an HTTP API to sync each record,
  and write a summary of successes and failures to a log file

  ◈ Generating agent with local LLM...
  (streams generated code to log...)

┌─────────────────────────────────────┐
│   AGENT READY FOR DEPLOYMENT        │
└─────────────────────────────────────┘
  NAME    : DataSyncAgent
  FILE    : ~/.koupper/agents/DataSyncAgent.kts
  SKILL   : ~/.koupper/agents/DataSyncAgent.skill.json
```

## Generated output

- `~/.koupper/agents/<Name>.kts` — working agent implementation
- `~/.koupper/agents/<Name>.skill.json` — skill metadata
- `~/.koupper/agents/draft_<Name>.json` — wizard session metadata

## Fallback behavior

If `KOUPPER_LLM_MODEL_PATH` is not set, the wizard generates a scaffold with `// TODO` comments instead of a working implementation.

## Providers used

| Provider | Purpose |
|---|---|
| `InferenceEngine` | LLM code generation with streaming |
| `CommandBridgeProvider` | Reads answers from `commands/wizard/*.response` |

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `KOUPPER_LLM_MODEL_PATH` | Recommended | Path to `.gguf` model. Required for real code generation. |
| `CORTEX_JOBS_DIR` | No | Jobs directory (default: `~/.koupper/jobs`). |

## skill.json

```json
{
  "name": "AgentCreatorAgent",
  "role": "Agent factory",
  "triggers": ["manual", "worker-job"],
  "persistent": false
}
```
