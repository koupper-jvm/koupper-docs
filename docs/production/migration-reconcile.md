# Migration Guide: Infra + Reconcile

How to adopt new framework-level infra/reconcile commands in existing repos.

## Step 1: Replace ad-hoc Terraform wrappers

Before:

- custom shell wrappers for `terraform init/plan/apply/output`
- inconsistent logs and exit-code handling

After:

- `koupper infra init|validate|plan|apply|drift|output`

## Step 2: Introduce drift-spec v1

- Create `drift-spec.json` in your repo.
- Start with `required_only` mode.
- Upgrade to `exact_match` when ownership boundaries are stable.

## Step 3: Wire existing deploy/smoke/rollback scripts

Use `koupper reconcile run` and pass your existing scripts as commands:

- `--deploy-command`
- `--smoke-command`
- `--rollback-command`

No project renaming or script rewrites required.

## Step 4: Gate CI with stable JSON

- Parse `ok`, `exitCode`, and `artifacts.stages[*]`.
- Fail fast on non-zero exit codes under strict policy.

## Step 5: Harden policy over time

- start: `continue_on_error` in lower environments
- mature: `abort_on_failure` or `strict` in production lanes
