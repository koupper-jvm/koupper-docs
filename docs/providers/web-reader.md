# Web Reader Provider

Web page reader with JavaScript rendering, text extraction, and screenshot capabilities via Playwright.

## Contracts

| Contract | Implementation |
|---|---|
| `WebReaderProvider` | `PlaywrightWebReader` |

## CLI Discovery

```bash
koupper provider info web-reader
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.web.WebReaderProvider
import com.koupper.container.app

@Export
val readPage: () -> String = {
    val reader = app.getInstance(WebReaderProvider::class)
    val result = reader.fetch(
        url = "https://koupper.com/docs",
        renderJs = true,
        extractText = true
    )
    result.text.take(500)
}
```
