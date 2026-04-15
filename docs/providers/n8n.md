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

## Execution modes

- `mock` (default): safe local development without outbound calls.
- `live`: real webhook trigger + API polling against n8n server.

## Typical flow

1. Trigger workflow webhook.
2. Capture execution id.
3. Poll execution state until completion or timeout.
4. Continue script logic with result status.

## CLI discovery

```bash
koupper provider info n8n
```

## Example guide

- [n8n Workflow Example](/examples/n8n-workflow)
