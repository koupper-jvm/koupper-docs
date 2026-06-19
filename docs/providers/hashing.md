# Hashing Provider

`hashing` provides password hashing and verification helpers.

## Service provider

- `HasherServiceProvider`

## Contract and implementations

- `Hasher` -> `PBKDF2Hasher`

## Environment variables

- none required

## CLI discovery

```bash
koupper provider info hashing
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.hashing.Hasher
import com.koupper.container.app

@Export
val verifyPassword: () -> String = {
    val hasher = app.getInstance(Hasher::class)
    val hash = hasher.hash("mySecurePassword123")
    
    if (hasher.verify("mySecurePassword123", hash)) "Password valid"
    else "Password invalid"
}
```
