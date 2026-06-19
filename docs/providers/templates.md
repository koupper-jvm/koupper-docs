# Templates Provider

`templates` renders dynamic templates from script/module runtime contexts.

## Service provider

- `TemplateServiceProvider`

## Contract and implementations

- `TemplateProvider` -> `PebbleTemplateProvider`

## Environment variables

- none required

## CLI discovery

```bash
koupper provider info templates
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.templates.TemplateProvider
import com.koupper.container.app

@Export
val renderConfig: () -> String = {
    val templates = app.getInstance(TemplateProvider::class)
    val output = templates.render(
        template = "Hello {{ name }}, your app is at {{ url }}",
        data = mapOf("name" to "Koupper", "url" to "https://koupper.com")
    )
    output // "Hello Koupper, your app is at https://koupper.com"
}
```
