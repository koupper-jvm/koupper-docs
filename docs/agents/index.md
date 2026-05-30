# Koupper Agents

Agents are self-contained `.kts` scripts that run inside the Koupper runtime. Each agent has a single `@Export` annotated entrypoint, uses Koupper Service Providers for all I/O, and writes its output to a log file under `~/.koupper/jobs/logs/`.

## Running agents

### Directly

```bash
koupper run ~/.koupper/agents/RssFeedAgent.kts
```

### As a background job (via worker)

```bash
echo '{"scriptPath":"/absolute/path/to/MyAgent.kts"}' \
  > ~/.koupper/jobs/default/my-job-$(date +%s).json
```

The worker picks it up within 2 seconds and streams output to `~/.koupper/jobs/logs/default/<jobId>.log`.

### On a schedule

```bash
koupper schedule add RssFeedAgent.kts --cron="0 8 * * 1-5" --id=morning-digest
koupper worker --enable-scheduling
```

## Skill metadata

Every agent ships with a `skill.json` descriptor alongside it:

```json
{
  "name": "RssFeedAgent",
  "version": "1.0.0",
  "description": "Fetches RSS feeds and generates an AI summary",
  "role": "RSS aggregator and summarizer",
  "entrypoint": "setup",
  "inputs": ["~/.koupper/agents/rss-feeds.json (optional)"],
  "outputs": ["logs/default/rss-digest-<date>.log"],
  "envVars": [
    { "name": "KOUPPER_LLM_MODEL_PATH", "required": false }
  ],
  "providers": ["RSSReader", "InferenceEngine"],
  "triggers": ["manual", "worker-job", "schedule-daily"],
  "tags": ["rss", "news", "llm"]
}
```

## Available agents

| Agent | Purpose | Persistent |
|---|---|---|
| [GreetingAgent](./greeting) | Swarm state report on startup | No |
| [AgentCreatorAgent](./agent-creator) | Interactive wizard — creates new agents with LLM | No |
| [RssFeedAgent](./rss-feed) | Fetch RSS feeds, optional LLM summary | No |
| [HeartbeatAgent](./heartbeat) | Proactive condition monitor, dispatches agents | No |

## Writing your own agent

Every agent follows the same contract:

```kotlin
import com.koupper.shared.annotations.Export
import java.io.File
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Export
val setup: () -> Unit = {
    val home    = System.getProperty("user.home")!!
    val jobsDir = File(System.getenv("CORTEX_JOBS_DIR") ?: "$home/.koupper/jobs")
    val logDir  = File(jobsDir, "logs/default").also { it.mkdirs() }
    val logFile = File(logDir, "my-agent-${System.currentTimeMillis()}.log")

    fun ts()             = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"))
    fun log(msg: String) = logFile.appendText("[${ts()}] $msg\n")

    // Use Koupper Service Providers for all I/O
    // val reader = app.getInstance(RSSReader::class)
    // val http   = app.getInstance(HtppClient::class)

    log("MyAgent started")
    // ... your logic ...
    log("MyAgent completed")
}
```

Rules:
- Exactly one `@Export val setup: () -> Unit`
- No top-level `return` statements inside the lambda
- All HTTP/file/DB operations via Koupper SPs (`app.getInstance(...)`)
- Write output to the log file — the worker streams it to the dashboard
