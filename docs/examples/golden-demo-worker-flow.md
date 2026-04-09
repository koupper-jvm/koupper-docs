# Golden Demo: Worker Flow

This is a production-shaped baseline demo for Koupper adoption checks.

## Goal

Validate that a team can scaffold, enqueue, execute, and observe a worker flow using Koupper conventions.

## Steps

```bash
koupper new module name="golden-worker",version="1.0.0",package="golden.worker",template="jobs"
cd golden-worker
koupper job init --force
koupper job list --configId=local-file
koupper job run-worker --configId=local-file
koupper job status --configId=local-file
```

## What to verify

- worker process starts cleanly,
- job queue commands respond,
- status output is visible,
- logs and metrics are generated according to runtime defaults.

## Why this demo matters

- It represents a common real-world entry point (async backend automation).
- It validates runtime contract consistency before advanced integrations.
- It serves as a repeatable proof point in onboarding and release checks.

## Next

- Extend with provider integrations from [Providers](/providers/)
- Add deployment sequence from [Deploy Flow](/examples/deploy-flow)
- Run release readiness checks from [Script Execution Checklist](/production/script-execution-checklist)
