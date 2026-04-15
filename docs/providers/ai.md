# AI Provider

`ai` integrates AI model clients (OpenAI by default).

## Service provider

- `AIServiceProvider`

## Contract and implementations

- `AI` -> `OpenAIClient` (`tag=openai`)

## Environment variables

- `OPENAI_API_KEY` (required)
- `AI_PROVIDER` (optional, default: `openai`)
- `OPENAI_API_URL` (optional)
- `OPENAI_CONTENT_TYPE` (optional)

## CLI discovery

```bash
koupper provider info ai
```
