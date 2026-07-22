# JWT Provider

`jwt` provides token signing and validation utilities.

## Service provider

- `JWTServiceProvider`

## Contract and implementations

- `JWT` -> `JWTAgent`

## Environment variables

- `JWT_SECRET` (required)

## CLI discovery

```bash
koupper provider info jwt
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.jwt.JWT
import com.koupper.container.app

@Export
val verifyToken: () -> String = {
    val jwt = app.getInstance(JWT::class)
    val token = "eyJhbGciOiJIUzI1NiIs..."
    
    val decoded = jwt.decode(token, com.koupper.providers.jwt.JWTAgentEnum.HMAC256)
    if (decoded.isExpired()) return@verifyToken "Token expired"
    
    val userId = decoded.subject ?: "unknown"
    val role = decoded.claim<String>("role") ?: "none"
    "User $userId with role $role"
}
```
