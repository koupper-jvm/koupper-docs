# Pipelines

Koupper supports multi-stage agent pipelines via `@Scheduled(chain=...)`. Each stage is a separate `.kts` script that runs in sequence, with output from one stage passed as input to the next.

## Quick start

```kotlin
// RssFeedAgent.kts — the trigger script
import com.koupper.shared.annotations.Export
import com.koupper.octopus.annotations.Scheduled

@Scheduled(cron = "0 8 * * *", chain = "SummarizerAgent.kts > TelegramNotifyAgent.kts")
@Export
val digest: () -> Unit = {
    // This script reads RSS feeds. The worker automatically chains
    // SummarizerAgent → TelegramNotifyAgent after this completes.
}
```

When the cron fires, the worker:
1. Runs `RssFeedAgent.kts`
2. Reads its output, passes it to `SummarizerAgent.kts`
3. Reads SummarizerAgent's output, passes it to `TelegramNotifyAgent.kts`

## How it works

### Schedule side (Octopus daemon)

The `chain` parameter tells the `@Scheduled` resolver to enqueue a **coordinator job** instead of a single job. The coordinator is an auto-generated `.kts` script that runs each stage as a `koupper run` subprocess.

```
@Scheduled(cron="0 8 * * *", chain="B.kts > C.kts")
         │
         ▼
  Octopus generates coordinator.kts
         │
         ▼
  Worker picks up coordinator job
         │
         ├── koupper run A.kts      (the trigger script)
         ├── koupper run B.kts      (chain stage 1)
         └── koupper run C.kts      (chain stage 2)
```

### Worker side (pipelineNext chaining)

The `WorkerCommand` supports a lighter pipeline mechanism via `pipelineNext` fields in job JSON. When a job completes successfully, the worker reads `pipelineNext` and enqueues the next stage:

```json
{
  "id": "my-pipeline-step1",
  "scriptPath": "agents/StageOne.kts",
  "pipelineId": "my-pipeline",
  "pipelineStep": 0,
  "pipelineTotal": 3,
  "pipelineNext": {
    "scriptPath": "agents/StageTwo.kts",
    "pipelineId": "my-pipeline",
    "pipelineStep": 1,
    "pipelineTotal": 3,
    "pipelineNext": {
      "scriptPath": "agents/StageThree.kts",
      "pipelineId": "my-pipeline",
      "pipelineStep": 2,
      "pipelineTotal": 3
    }
  }
}
```

Each stage's stdout output (the `[RESULT]` block) is captured and passed as `input` to the next stage.

## Pipeline parameters

| Parameter | Type | Description |
|---|---|---|
| `chain` | String | Space-separated list of agent scripts, joined by `>`. Example: `"B.kts > C.kts > D.kts"` |
| `cron` | String | UNIX cron expression for the trigger |
| `rate` | Long | Repeat interval in milliseconds (alternative to cron) |
| `delay` | Long | One-shot delay in milliseconds |

## Error handling

- If any stage fails (non-zero exit code or script error), the pipeline **stops immediately**
- Failed jobs move to `.failed/` queue directory
- After 3 failures (configurable via `--max-retries`), the job moves to `.dead/`
- Pending stages are never enqueued — the entire pipeline halts

## Debugging pipelines

```bash
# Check pipeline schedule registration
koupper schedule list

# Watch pipeline jobs in the queue
koupper job list

# Start the worker to process pipeline jobs
koupper worker --queues=default

# Check job logs
cat ~/.koupper/jobs/logs/default/*.log
```

## Writing pipeline-compatible scripts

Each stage in a chain must be a **pure `@Export` script** — no `@Scheduled` or `@JobsListener` annotations on chain stages.

```kotlin
// ✅ Good — pure Export, reads input, produces output
@Export
val setup: (String) -> String = { input ->
    // input contains the previous stage's result
    "processed: $input"
}

// ❌ Bad — chain stages should not declare their own schedule
@Scheduled(cron = "0 9 * * *")
@Export
val setup: () -> String = { "confusing" }
```

## Related

- [@Scheduled annotation](/architecture/annotations-reference#scheduled)
- [Worker command](/commands/worker)
- [Schedule command](/commands/schedule)
- [Script execution contract](/architecture/script-execution-contract)
