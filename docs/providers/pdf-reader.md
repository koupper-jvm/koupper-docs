# PDF Reader Provider

PDF document reader for text extraction, page splitting, and metadata via Apache PDFBox.

## Contracts

| Contract | Implementation |
|---|---|
| `PDFReaderProvider` | `PDFBoxReader` |

## CLI Discovery

```bash
koupper provider info pdf-reader
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.pdf.PDFReaderProvider
import com.koupper.container.app

@Export
val extractText: () -> String = {
    val pdf = app.getInstance(PDFReaderProvider::class)
    val doc = pdf.read("report.pdf")
    val firstPage = doc.pages.firstOrNull()
    firstPage?.text?.take(200) ?: "No content"
}
```
