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
