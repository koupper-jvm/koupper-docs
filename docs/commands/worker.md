# `koupper worker`

Run a background job worker daemon that polls queue directories and executes agent scripts.

## Usage

```bash
koupper worker [jobsDir] [flags]
```

## Options

| Option | Default | Description |
|---|---|---|
| `jobsDir` | `~/.koupper/jobs` | Root directory containing queue subdirectories. |
| `--queues=q1,q2` | all | Comma-separated list of queues to poll. Defaults to all subdirectories. |
| `--concurrency=N` | `2` | Maximum number of jobs running in parallel. |
| `--interval=ms` | `2000` | Polling interval in milliseconds. |
| `--timeout=seconds` | `300` | Per-job timeout. Job is killed and moved to `.failed/` if exceeded. Override with `KOUPPER_WORKER_TIMEOUT` env var. |
| `--max-retries=N` | `3` | Failures before a job is moved to `.dead/` (dead-letter queue). |
| `--enable-scheduling` | off | Activates the built-in scheduler that reads `~/.koupper/schedules.json` and enqueues jobs automatically. |
| `--status` | — | Print queue snapshot and exit immediately without starting the daemon. |

## Examples

### Start the worker

```bash
koupper worker
```

### Custom jobs directory and concurrency

```bash
koupper worker ~/myproject/jobs --concurrency=4 --interval=1000
```

### Enable scheduling

```bash
koupper worker --enable-scheduling
```

Reads `~/.koupper/schedules.json` and submits jobs when cron/rate/once triggers fire.

### Snapshot queue status without starting the daemon

```bash
koupper worker --status
```

Output example:

```
◈ KOUPPER WORKER STATUS
  Jobs dir : /home/you/.koupper/jobs

  ▶  cortex        0p  1▶  0f  0☠
  ○  default       0p  0▶  0f  0☠

  Total    0p  1▶  0f  0☠
```

Legend: `p` pending · `▶` processing · `f` failed · `☠` dead-letter.

## How it works

The worker polls each queue directory every `--interval` ms. When it finds a `.json` file it:

1. **Claims** it atomically by renaming to `.json.processing` (POSIX `renameTo` — no race conditions).
2. **Executes** `koupper run <scriptPath>` as a subprocess, streaming output to `logs/<queue>/<jobId>.log`.
3. On **success** → deletes `.json.processing` (acknowledged).
4. On **script error** (including missing `@Export`, compilation errors) → moves to `.failed/`.
5. On **timeout** → kills subprocess, moves to `.failed/`.
6. After **maxRetries** failures → moves to `.dead/` to prevent infinite retry loops.

## Job file format

```json
{
  "scriptPath": "/absolute/path/to/MyAgent.kts"
}
```

Or relative to `~/.koupper/`:

```json
{
  "scriptPath": "agents/MyAgent.kts"
}
```

## Environment variables

| Variable | Description |
|---|---|
| `KOUPPER_WORKER_TIMEOUT` | Default timeout in seconds (overrides `--timeout` default). |

## Queue directory structure

```
~/.koupper/jobs/
  default/
    job-001.json              ← PENDING
    job-002.json.processing   ← PROCESSING
    .failed/
      job-003.json            ← FAILED
    .dead/
      job-004.json            ← DEAD (exceeded max retries)
  logs/
    default/
      job-001.log             ← job output
```
