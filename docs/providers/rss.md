# RSS Provider

`rss` reads and parses feed content for ingestion pipelines.

## Service provider

- `RSSServiceProvider`

## Contract and implementations

- `RSSReader` -> `RSSReaderImpl`

## Environment variables

- none required

## CLI discovery

```bash
koupper provider info rss
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.rss.RSSReader
import com.koupper.container.app

@Export
val readFeeds: () -> List<String> = {
    val rss = app.getInstance(RSSReader::class)
    val feed = rss.fetch("https://example.com/feed.xml")
    feed.items.map { "${it.title} — ${it.pubDate}" }
}
```
