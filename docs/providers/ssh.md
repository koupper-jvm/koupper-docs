# SSH Provider

`ssh` supports remote command execution and file transfer workflows.

## Service provider

- `SSHServiceProvider`

## Contract and implementations

- `SSHClient` -> `OpenSSHClient`

## Environment variables

- `SSH_HOST` (required)
- `SSH_USER` (required)
- `SSH_PORT` (optional)
- `SSH_IDENTITY_FILE` (optional)
- `SSH_PASSWORD` (optional)
- `SSH_STRICT_HOST_KEY_CHECKING` (optional)
- `SSH_CONNECT_TIMEOUT_SECONDS` (optional)
- `SSH_COMMAND_TIMEOUT_SECONDS` (optional)

## CLI discovery

```bash
koupper provider info ssh
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.ssh.SSHClient
import com.koupper.container.app

@Export
val remoteDeploy: () -> String = {
    val ssh = app.getInstance(SSHClient::class)
    
    ssh.connect(
        host = "production.example.com",
        username = "deploy",
        keyPath = "~/.ssh/id_rsa"
    )
    
    ssh.exec("systemctl restart myapp")
    ssh.upload("build/output.jar", "/opt/myapp/app.jar")
    
    ssh.disconnect()
    "Deployed successfully"
}
```
