# `iac` Provider

`iac` provides framework-level Terraform lifecycle operations and drift-spec evaluation primitives.

Service provider class: `IaCServiceProvider`  
Contract: `IaCProvider`

## Capabilities

- Terraform lifecycle methods: `init`, `validate`, `plan`, `apply`, `drift`, `output`.
- Stable stage result envelope for automation: `ok`, `stage`, `exitCode`, `durationMs`, `warnings`, `errors`, `artifacts`, `nextAction`.
- Drift-spec v1 evaluation with modes:
  - `required_only`
  - `exact_match`
- Uniform retry/timeout controls in execution options.
- Backward compatibility shims for older `terraformPlan/terraformApply/terraformOutput/driftCheck` method names.

## Environment variables

- `TERRAFORM_COMMAND` (optional, default `terraform`)
- `TERRAFORM_TIMEOUT_SECONDS` (optional, default `300`)

## CLI discovery

```bash
koupper provider info iac
```

## Related command docs

- [`koupper infra`](/commands/infra)
- [`koupper reconcile`](/commands/reconcile)
