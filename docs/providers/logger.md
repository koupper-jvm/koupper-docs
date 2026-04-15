# Logger Provider

`logger` persists application logs into a database-backed sink.

## Service provider

- `LoggerServiceProvider`

## Contract and implementations

- `Logger` -> `PSQLDBLogger`

## Environment variables

- `LOGGER_TABLE_NAME` (required)

## CLI discovery

```bash
koupper provider info logger
```
