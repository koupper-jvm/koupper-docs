# Notifications Provider

`notifications` sends operational messages to console or webhook destinations.

## Service provider

- `NotificationsServiceProvider`

## Contract and implementations

- `NotificationsProvider` -> `ConsoleNotificationsProvider`, `WebhookNotificationsProvider`

## Environment variables

- `NOTIFICATIONS_PROVIDER` (optional)
- `NOTIFICATIONS_WEBHOOK_URL` (optional)

## CLI discovery

```bash
koupper provider info notifications
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.notifications.NotificationsProvider
import com.koupper.container.app

@Export
val notifyDeploy: () -> String = {
    val notifier = app.getInstance(NotificationsProvider::class)
    
    notifier.notify(
        title = "Deploy completed",
        message = "App v2.3.1 deployed to production successfully",
        level = "info",
        metadata = mapOf("version" to "2.3.1", "env" to "production")
    )
    "Notification sent"
}
```
