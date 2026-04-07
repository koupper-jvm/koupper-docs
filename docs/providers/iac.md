# IaC Provider

`iac` provides Terraform-based infrastructure workflows from scripts.

## Service provider

- `IaCServiceProvider`

## Contract and implementations

- `IaCProvider` -> `TerraformIaCProvider`

## Environment variables

- `TERRAFORM_COMMAND` (optional)
- `TERRAFORM_TIMEOUT_SECONDS` (optional)

## CLI discovery

```bash
koupper provider info iac
```
