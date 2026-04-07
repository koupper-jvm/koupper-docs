# Secrets Provider

`secrets` resolves secret values from environment variables or local JSON storage.

## Service provider

- `SecretsServiceProvider`

## Contract and implementations

- `SecretsClient` -> `LocalSecretsClient`

## Environment variables

- `SECRETS_FILE` (optional)
- `SECRETS_ENV_PREFIX` (optional)
- `SECRETS_PERSIST_WRITES` (optional)
- `SECRETS_REQUIRE_FILE` (optional)

## CLI discovery

```bash
koupper provider info secrets
```
