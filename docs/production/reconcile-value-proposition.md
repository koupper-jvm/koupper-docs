# Production Reconcile Value

This page is a product-facing summary of what is now available in Koupper at framework level.

## What is now real in the framework

- Official infra CLI suite: `koupper infra init|validate|plan|apply|drift|output`
- Official orchestration command: `koupper reconcile run`
- Stable automation envelope for new commands:
  - `ok`, `stage`, `exitCode`, `durationMs`, `warnings`, `errors`, `artifacts`, `nextAction`
- Drift spec v1 support with explicit modes:
  - `required_only`
  - `exact_match`
- Built-in safety defaults for automation:
  - input validation
  - timeout/retry controls
  - secret redaction in output/log artifacts

## Why this matters for teams

- Replaces ad-hoc Terraform wrappers with one consistent CLI contract.
- Makes CI/CD parsing deterministic with stable JSON output fields.
- Standardizes release behavior across repositories without project-specific hacks.
- Improves incident response by providing stage-level failures and next actions.

## What this does not claim

- It does not replace your business-specific deploy/smoke/rollback scripts.
- It does not force one cloud architecture; it standardizes orchestration and drift evaluation contracts.
- It does not remove the need for environment credentials or policy approvals.

## One-command production-oriented flow

```bash
koupper reconcile run \
  --dir=infra \
  --auto-approve \
  --stages=infra,preflight,deploy,smoke,rollback \
  --policy=abort_on_failure \
  --deploy-command="./scripts/deploy.sh" \
  --smoke-command="./scripts/smoke.sh" \
  --rollback-command="./scripts/rollback.sh" \
  --json
```

## Reference docs

- [koupper infra](/commands/infra)
- [koupper reconcile](/commands/reconcile)
- [Drift Spec v1](/production/drift-spec-v1)
- [Reconcile Runbook](/production/reconcile-runbook)
- [Migration: Infra+Reconcile](/production/migration-reconcile)
