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
