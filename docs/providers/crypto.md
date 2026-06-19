# Crypto Provider

`crypto` exposes symmetric encryption helpers for secure payload flows.

## Service provider

- `CryptoServiceProvider`

## Contract and implementations

- `Crypt0` -> `AESGCM128`

## Environment variables

- `SHARED_SECRET` (required)

## CLI discovery

```bash
koupper provider info crypto
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.crypto.Crypt0
import com.koupper.container.app

@Export
val encryptData: () -> String = {
    val crypto = app.getInstance(Crypt0::class)
    val encrypted = crypto.encrypt("sensitive payload")
    "Encrypted: ${encrypted.take(20)}..."
}
```
