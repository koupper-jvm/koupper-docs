# n8n Provider

`n8n` triggers workflows and polls execution state for automation pipelines.

## Service provider

- `N8NServiceProvider`

## Contract and implementations

- `N8NProvider` -> `N8NHttpProvider`

## Environment variables

- `N8N_MODE` (optional)
- `N8N_WEBHOOK_URL` (optional)
- `N8N_API_BASE_URL` (optional)
- `N8N_API_KEY` (optional)
- `N8N_TIMEOUT_SECONDS` (optional)

## CLI discovery

```bash
koupper provider info n8n
```
