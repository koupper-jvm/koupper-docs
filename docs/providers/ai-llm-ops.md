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

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.aillmops.AILlmOpsProvider
import com.koupper.container.app

@Export
val structuredOutput: () -> String = {
    val llm = app.getInstance(AILlmOpsProvider::class)
    val result = llm.chat(
        messages = listOf(mapOf("role" to "user", "content" to "List 3 colors")),
        responseSchema = mapOf("type" to "array", "items" to mapOf("type" to "string"))
    )
    result.content
}
```
