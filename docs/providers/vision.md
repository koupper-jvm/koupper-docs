# Vision Provider

Vision-capable LLM for image analysis: content type detection, summary generation, sentiment analysis, and relevance scoring via OpenAI-compatible API.

## Contracts

| Contract | Implementation |
|---|---|
| `VisionProvider` | `OpenAIVisionClient` |

## CLI Discovery

```bash
koupper provider info vision
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.vision.VisionProvider
import com.koupper.container.app

@Export
val analyzeImage: () -> String = {
    val vision = app.getInstance(VisionProvider::class)
    val result = vision.analyze(
        imagePath = "screenshots/deploy-dashboard.png",
        prompt = "What does this dashboard show?"
    )
    result.summary
}
```
