# `koupper job`

Manage background job workers and inspect queued work.

## Subcommands

```bash
koupper job init [--force]
koupper job build-environment
koupper job list [--jobId=<id>] [--configId=<id>]
koupper job run-worker [--jobId=<id>] [--configId=<id>]
koupper job status [--configId=<id>]
koupper job failed [--jobId=<id>] [--configId=<id>]
koupper job retry [--jobId=<id>] [--configId=<id>]
```

## Common flags

| Flag | Description |
| --- | --- |
| `--force` | Recreates `jobs.json` during `init`. |
| `--jobId=<id>` | Filters operation to one specific job. |
| `--configId=<id>` | Filters operation to one configuration block. |

## Typical workflow

```bash
koupper new module name="demo-jobs",version="1.0.0",package="demo.jobs",template="jobs"
cd demo-jobs
koupper job list
koupper job run-worker
```

## Notes

- Run from module root to use that module's `jobs.json` and script context.
- `run-worker` executes queued tasks and prints each result block.
- Use `--jobId` to replay one specific task when debugging.
- Job execution traces are also written to `~/.koupper/logs/octopus-executions.jsonl`.
- Helper payload files in `~/.koupper/helpers` are generated only by commands that explicitly report payload snapshots (for example module analysis).
