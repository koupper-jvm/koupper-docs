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

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.ai.AI
import com.koupper.container.app

@Export
val askAI: () -> String = {
    val ai = app.getInstance(AI::class)
    
    val response = ai.chat(
        messages = listOf(
            mapOf("role" to "system", "content" to "You are a helpful assistant."),
            mapOf("role" to "user", "content" to "Explain what Koupper is in one sentence.")
        )
    )
    response.content
}
```
