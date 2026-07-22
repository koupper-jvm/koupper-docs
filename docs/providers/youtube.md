# YouTube Provider

Fetches auto-generated transcripts from YouTube videos via the timedtext API.

## Service provider

- `YoutubeTranscriptServiceProvider`

## Contract and implementations

- `YoutubeTranscriptProvider` → `YoutubeTimedTextClient`

## Environment Variables

None required.

## CLI discovery

```bash
koupper provider info youtube
```

## Usage Example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.media.youtube.YoutubeTranscriptProvider
import com.koupper.container.app

@Export
val fetchTranscript: (String) -> String = { videoId ->
    val youtube = app.getInstance(YoutubeTranscriptProvider::class)
    youtube.transcript(videoId)
}
```
