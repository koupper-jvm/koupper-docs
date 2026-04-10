# Reconcile Runbook

Production-agnostic runbook for Koupper reconcile flows.

## 1) Prepare

- Ensure Terraform directory is accessible.
- Ensure required cloud credentials are available.
- Provide deploy/smoke/rollback commands from your own repo scripts.

## 2) Validate infrastructure

```bash
koupper infra validate --dir=infra --json
```

## 3) Check drift

```bash
koupper infra drift --dir=infra --spec=drift-spec.json --observed-file=observed.json --json
```

## 4) Run one-command reconcile

```bash
koupper reconcile run \
  --dir=infra \
  --auto-approve \
  --stages=infra,preflight,deploy,smoke,rollback \
  --policy=abort_on_failure \
  --aws-timeout-seconds=900 \
  --aws-retry-count=4 \
  --aws-retry-backoff-ms=800 \
  --frontend-backup-mode=incremental \
  --deploy-command="./scripts/deploy.sh" \
  --smoke-command="./scripts/smoke.sh" \
  --rollback-command="./scripts/rollback.sh" \
  --json
```

## 5) Tune for scale

- Large frontend artifact and single distribution: start with `--aws-timeout-seconds=900`.
- Multiple distributions or slow invalidations: use `--aws-timeout-seconds=1200+` and `--aws-retry-count=4`.
- If throttling appears: increase `--aws-retry-backoff-ms` to `1200-2000`.
- Keep `--frontend-backup-mode=incremental` for routine prod deploys; use `full` for critical rollback windows.

## 6) Evaluate result

Inspect `ok`, `exitCode`, and `artifacts.stages` for the exact failed stage and next action.
