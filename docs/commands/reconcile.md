# `koupper reconcile`

Pipeline command for end-to-end reconcile orchestration.

## Run

```bash
koupper reconcile run \
  --dir=infra \
  --auto-approve \
  --stages=infra,preflight,deploy,smoke,rollback \
  --policy=strict \
  --aws-timeout-seconds=900 \
  --aws-retry-count=4 \
  --aws-retry-backoff-ms=800 \
  --frontend-backup-mode=incremental \
  --deploy-command="./scripts/deploy.sh" \
  --smoke-command="./scripts/smoke.sh" \
  --rollback-command="./scripts/rollback.sh" \
  --json
```

## Stage model

Available stages:

- `infra`
- `preflight`
- `deploy`
- `smoke`
- `rollback`

Policies:

- `strict`
- `continue_on_error`
- `abort_on_failure`

AWS deploy control flags:

- `--aws-timeout-seconds`
- `--aws-retry-count`
- `--aws-retry-backoff-ms`
- `--frontend-backup-mode` (`full` | `incremental` | `disabled`)

These flags are exported as stage env vars (`AWS_DEPLOY_TIMEOUT_SECONDS`, `AWS_DEPLOY_RETRY_COUNT`, `AWS_DEPLOY_RETRY_BACKOFF_MS`, `AWS_FRONTEND_BACKUP_MODE`) so existing deploy scripts can adopt them without script rewrites.

## Stable JSON contract

`koupper reconcile run` returns the same stable command envelope (`ok`, `stage`, `exitCode`, `durationMs`, `warnings`, `errors`, `artifacts`, `nextAction`) and stores per-stage results in `artifacts.stages`.

## Adoption tip

To adopt in existing repos, keep your deploy/smoke/rollback scripts unchanged and wire them through `--deploy-command`, `--smoke-command`, and `--rollback-command` while reusing Koupper-managed infra/preflight stages.
