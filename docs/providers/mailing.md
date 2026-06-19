# Mailing Provider

`mailing` provides SMTP sender utilities for notifications and transactional emails.

## Service provider

- `SenderServiceProvider`

## Contract and implementations

- `Sender` -> `SenderHtmlEmail`

## Environment variables

- `MAIL_HOST` (required)
- `MAIL_PORT` (required)
- `MAIL_USERNAME` (required)
- `MAIL_PASSWORD` (required)
- `EMAIL_FROM_NAME` (optional)
- `DEFAULT_TARGET_EMAIL` (optional)
- `DEFAULT_SUBJECT` (optional)

## CLI discovery

```bash
koupper provider info mailing
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.mailing.Sender
import com.koupper.container.app

@Export
val sendAlert: () -> String = {
    val mail = app.getInstance(Sender::class)
    mail.send(
        to = "ops@example.com",
        subject = "Deploy completed",
        body = "App v2.3.1 deployed to production at ${System.currentTimeMillis()}"
    )
    "Alert sent"
}
```
