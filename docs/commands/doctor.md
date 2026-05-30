# `koupper doctor`

Diagnose the Koupper runtime environment in one command.

## Usage

```bash
koupper doctor
```

No arguments. Runs all checks and prints a summary.

## What it checks

| Section | Checks |
|---|---|
| **Environment** | `KOUPPER_LLM_MODEL_PATH` (file exists, size), `KOUPPER_LLM_EXECUTABLE` (file exists, executable) |
| **Installation** | `koupper` binary, `octopus.jar`, `koupper-cli.jar`, `koupper-monitor.jar` |
| **Ports** | 9998 octopus socket · 8081 llama-server · 18082 MCP server · 18083 Web UI |
| **Job queues** | pending / processing / failed / dead counts per queue |
| **Agents** | Count and list of installed `.kts` agents in `~/.koupper/agents/` |
| **Schedules** | Count, active count, trigger type per configured schedule |

## Output

```
◈ KOUPPER DOCTOR

  Environment
  ✓  KOUPPER_LLM_MODEL_PATH    model.gguf (469MB)
  ✓  KOUPPER_LLM_EXECUTABLE    /path/to/llama-server

  Installation
  ✓  koupper binary            ~/.koupper/bin/koupper
  ✓  octopus.jar               ~/.koupper/libs/octopus.jar (124MB)
  ✓  koupper-cli.jar           ~/.koupper/libs/koupper-cli.jar (13MB)
  ✓  koupper-monitor.jar       ~/.koupper/libs/koupper-monitor.jar

  Ports
  ✓  9998  Octopus socket      listening
  ⚠  8081  llama-server (LLM)  not listening
  ⚠  18082  MCP server         not listening
  ⚠  18083  Web UI             not listening

  Job Queues  (~/.koupper/jobs)
  ✓  default       0p  0▶  0f  0☠
  ⚠  cortex        0p  0▶  2f  0☠  ← failed jobs present

  Agents
  ✓  agents        4 installed
                    · CortexAgent
                    · GreetingAgent
                    · HeartbeatAgent
                    · RssFeedAgent

  Schedules
       schedules   file exists but empty

  3 warning(s) — system functional but check above
```

## Indicators

| Symbol | Meaning |
|---|---|
| `✓` | Check passed |
| `⚠` | Warning — system works but something needs attention |
| `✗` | Error — system may not function correctly |

## Common issues

**`KOUPPER_LLM_MODEL_PATH` not set**
LLM inference will not work. Set it in `~/.bashrc`:
```bash
export KOUPPER_LLM_MODEL_PATH=/path/to/model.gguf
export KOUPPER_LLM_EXECUTABLE=/path/to/llama-server
```

**Port 8081 not listening**
`llama-server` is not running. It starts automatically on the first `InferenceEngine` call if `KOUPPER_LLM_EXECUTABLE` is set.

**Failed jobs in queue**
Inspect the log for the failed job:
```bash
cat ~/.koupper/jobs/logs/<queue>/<jobId>.log
```

Then clean up:
```bash
rm ~/.koupper/jobs/<queue>/.failed/<jobId>.json
```
