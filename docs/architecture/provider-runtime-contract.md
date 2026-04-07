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

![Provider contract placeholder](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80)

Prompt for final diagram image:

`Create a provider contract resolution diagram for Koupper showing: Script Call Site -> Contract Interface -> Service Provider Registration -> Implementation Instance -> External Service. Annotate with provider id, bindings, env schema, and docs link metadata from provider catalog.`
