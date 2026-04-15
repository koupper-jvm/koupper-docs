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
