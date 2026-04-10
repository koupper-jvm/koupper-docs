# `koupper reconcile`

Pipeline command for end-to-end reconcile orchestration.

## Run

```bash
koupper reconcile run \
  --dir=infra \
  --auto-approve \
  --stages=infra,preflight,deploy,smoke,rollback \
  --policy=strict \
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

## Stable JSON contract

`koupper reconcile run` returns the same stable command envelope (`ok`, `stage`, `exitCode`, `durationMs`, `warnings`, `errors`, `artifacts`, `nextAction`) and stores per-stage results in `artifacts.stages`.

## Adoption tip

To adopt in existing repos, keep your deploy/smoke/rollback scripts unchanged and wire them through `--deploy-command`, `--smoke-command`, and `--rollback-command` while reusing Koupper-managed infra/preflight stages.
