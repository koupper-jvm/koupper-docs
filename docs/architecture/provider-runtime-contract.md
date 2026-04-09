# Provider Runtime Contract

Providers expose runtime capabilities behind stable contracts so scripts remain implementation-agnostic.

## Contract model

- **Provider ID**: canonical name used in discovery (`koupper provider list`).
- **Service Provider Class**: runtime registration entry point.
- **Bindings**: `contract -> implementation` map used by container resolution.
- **Env Schema**: required/optional env vars for each provider.
- **Docs Link**: page-level setup and usage details.

## Discovery workflow

```bash
koupper provider list
koupper provider info <provider-id-or-class-or-contract>
```

## Design intent

- Keep scripts focused on contract interfaces.
- Allow different backends with minimal script churn.
- Make runtime requirements explicit before execution.

## Resolution flow

```text
Script call site
  -> contract interface
  -> service provider registration
  -> implementation instance
  -> external system/API
```
