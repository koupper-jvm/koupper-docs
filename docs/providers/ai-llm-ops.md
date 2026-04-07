# AI LLM Ops Provider

`ai-llm-ops` exposes higher-level LLM operations for chat, structured output, embeddings, rerank, and tool-call helpers.

## Service provider

- `AILlmOpsServiceProvider`

## Contract and implementations

- `AILlmOpsProvider` -> `DefaultAILlmOpsProvider`

## Environment variables

- `AI_LLM_OPS_MODE` (optional)
- `AI_LLM_OPS_FALLBACK` (optional)

## CLI discovery

```bash
koupper provider info ai-llm-ops
```
