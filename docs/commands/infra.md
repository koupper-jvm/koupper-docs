# `koupper infra`

Framework-level Terraform lifecycle command with stable JSON output for automation.

## Subcommands

```bash
koupper infra init
koupper infra validate
koupper infra plan
koupper infra apply
koupper infra drift
koupper infra output
```

## Standard flags

- `--dir=<path>`
- `--var-file=<path>` (repeatable)
- `--backend-config=<value>` (repeatable)
- `--auto-approve` (required for `apply`)
- `--timeout=<seconds>`
- `--json`

Additional reliability flags:

- `--retry=<count>`
- `--retry-delay-ms=<ms>`

Drift-spec flags:

- `--spec=<path>`
- `--observed-file=<path>`

## Drift detailed exit codes

- `0`: no drift detected
- `2`: drift detected (`terraform -detailed-exitcode`) or drift-spec mismatch
- `1`/other non-zero: execution failure

## Stable JSON contract

All infra subcommands return a stable envelope:

```json
{
  "ok": true,
  "stage": "plan",
  "exitCode": 0,
  "durationMs": 813,
  "warnings": [],
  "errors": [],
  "artifacts": {
    "command": "terraform plan -input=false -var-file=env/dev.tfvars",
    "stdout": "...",
    "stderr": "",
    "attempts": 1
  },
  "nextAction": null
}
```

## Drift spec v1

Supports `required_only` and `exact_match` modes over these generic checks:

- Dynamo tables + GSIs
- API routes + methods + stages
- Lambda aliases + env vars
- SQS + DLQ + redrive + policy
- Worker health (HTTP / event source mapping)

See production reference: [`drift-spec-v1`](/production/drift-spec-v1)
