# `koupper job`

Manage background job workers and inspect queued work.

## Subcommands

```bash
koupper job init [--force]
koupper job build-environment
koupper job list [--jobId=<id>] [--configId=<id>]
koupper job run-worker [--jobId=<id>] [--configId=<id>]
koupper job status [--configId=<id>]
```

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
