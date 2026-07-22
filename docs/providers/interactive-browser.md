# Interactive Browser Provider

Interactive browser automation with persistent session, stealth anti-detection, human-like scroll/click, and element extraction via Playwright.

## Contracts

| Contract | Implementation |
|---|---|
| `InteractiveBrowserProvider` | `PlaywrightInteractiveBrowser` |

## CLI Discovery

```bash
koupper provider info interactive-browser
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.browser.InteractiveBrowserProvider
import com.koupper.container.app

@Export
val scrapePage: () -> String = {
    val browser = app.getInstance(InteractiveBrowserProvider::class)
    browser.navigate("https://example.com/login")
    browser.fillField("#username", "admin")
    browser.fillField("#password", "secret")
    browser.click("#submit")
    browser.waitForSelector(".dashboard")
    browser.extractText(".welcome-message")
}
```
