# DB Provider

`db` exposes SQL connectors for PostgreSQL and SQLite use cases.

## Service provider

- `DBServiceProvider`

## Contract and implementations

- `DBConnector` -> `DBPSQLConnector` (`tag=DBPSQLConnector`)
- `DBConnector` -> `DBSQLiteConnector` (`tag=DBSQLiteConnector`)

## Environment variables

- `DB_DATABASE` (required)
- `DB_HOST` (optional)
- `DB_PORT` (optional)
- `DB_USERNAME` (optional)
- `DB_PASSWORD` (optional)

## CLI discovery

```bash
koupper provider info db
```
