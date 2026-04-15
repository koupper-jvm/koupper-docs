# K8s Provider

`k8s` runs Kubernetes operations over `kubectl` for apply/get/logs/rollout workflows.

## Service provider

- `K8sServiceProvider`

## Contract and implementations

- `K8sProvider` -> `KubectlK8sProvider`

## Result contract

All operations return `K8sResult`. Never throws on timeout or launch failure.

```kotlin
data class K8sResult(
    val command: String,
    val exitCode: Int,
    val stdout: String,
    val stderr: String,
    val timedOut: Boolean = false  // true when kubectl exceeded KUBECTL_TIMEOUT_SECONDS
)
```

Check `timedOut` instead of catching exceptions:

```kotlin
val result = k8s.rolloutStatus("deployment/api")
if (result.timedOut) { /* handle timeout */ }
if (result.exitCode != 0) { /* handle failure */ }
```

## Environment variables

- `KUBECTL_COMMAND` (optional)
- `KUBECTL_TIMEOUT_SECONDS` (optional)

## CLI discovery

```bash
koupper provider info k8s
```
