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

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.db.DBConnector
import com.koupper.container.app

@Export
val queryUsers: () -> List<Map<String, Any?>> = {
    val db = app.getInstance(DBConnector::class)
    db.session().use { session ->
        session.query("SELECT id, name, email FROM users WHERE active = ?", true)
    }
}
```

The `session()` method returns a `DBSession` with:
- `query(sql, vararg params)` — execute SELECT and return rows as maps
- `execute(sql, vararg params)` — execute INSERT/UPDATE/DELETE
- `transaction { }` — wrap operations in a database transaction
