# HelloWorld Provider

Brief description of what the HelloWorld provider does.

## Environment Variables

| Name | Required | Description |
| --- | --- | --- |
| `HELLOWORLD_API_KEY` | Yes | API key for HelloWorld. |

## Usage Example

```kotlin
val helloworld = app.getInstance(HelloWorldProvider::class)
val response = helloworld.ping()

println(response.message)
```