# HTTP Provider

`http` gives scripts an outbound HTTP invoker for API integrations.

## Service provider

- `HttpServiceProvider`

## Contract and implementations

- `HtppClient` -> `HttpInvoker`

## Environment variables

- none required

## CLI discovery

```bash
koupper provider info http
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.http.HtppClient
import com.koupper.container.app

@Export
val fetchData: () -> String = {
    val http = app.getInstance(HtppClient::class)
    val response = http.get("https://api.example.com/data")
    response.body
}

@Export
val postData: () -> String = {
    val http = app.getInstance(HtppClient::class)
    http.post(
        url = "https://api.example.com/submit",
        body = """{"key": "value"}""",
        headers = mapOf("Content-Type" to "application/json")
    ).body
}
```

Methods: `get()`, `post()`, `put()`, `delete()` — each returns an `HttpResponse` with `status`, `body`, and `headers`.
