# n8n Workflow

Use `n8n` provider to trigger workflows and poll execution state.

## Provider discovery

```bash
koupper provider info n8n
```

## Typical flow

1. Trigger workflow via webhook.
2. Receive execution identifier.
3. Poll execution status until terminal state.
4. Branch script logic based on success/failure.

## Minimal environment

```bash
export N8N_MODE="live"
export N8N_WEBHOOK_URL="https://n8n.example/webhook/trigger"
export N8N_API_BASE_URL="https://n8n.example/api/v1"
export N8N_API_KEY="<token>"
```

For mock-first development, set `N8N_MODE=mock`.
