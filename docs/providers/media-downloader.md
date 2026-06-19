# Media Downloader Provider

Media download and audio extraction via yt-dlp and ffmpeg for video acquisition and transcription pipelines.

## Contracts

| Contract | Implementation |
|---|---|
| `MediaDownloaderProvider` | `YtDlpDownloader` |

## CLI Discovery

```bash
koupper provider info media-downloader
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.mediadownloader.MediaDownloaderProvider
import com.koupper.container.app

@Export
val downloadAudio: () -> String = {
    val dl = app.getInstance(MediaDownloaderProvider::class)
    val result = dl.download(
        url = "https://www.youtube.com/watch?v=example",
        format = "mp3",
        outputDir = "./downloads"
    )
    "Downloaded: ${result.fileName} (${result.fileSize} bytes)"
}
```
