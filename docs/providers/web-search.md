# Web Search Provider

Web search using DuckDuckGo — no API key required.

## Contracts

| Contract | Implementation |
|---|---|
| `WebSearchProvider` | `DuckDuckGoSearchProvider` |

## CLI Discovery

```bash
koupper provider info web-search
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.search.WebSearchProvider
import com.koupper.container.app

@Export
val searchWeb: () -> String = {
    val search = app.getInstance(WebSearchProvider::class)
    val results = search.query("Koupper framework Kotlin")
    results.take(3).joinToString("\n") { "${it.title} — ${it.url}" }
}
```
