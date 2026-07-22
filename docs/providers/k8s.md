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

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.k8s.K8sProvider
import com.koupper.container.app

@Export
val deployAndVerify: () -> String = {
    val k8s = app.getInstance(K8sProvider::class)
    
    k8s.apply("deployment/api.yaml")
    
    val rollout = k8s.rolloutStatus("deployment/api")
    if (rollout.timedOut) return@deployAndVerify "Rollout timed out"
    if (rollout.exitCode != 0) return@deployAndVerify "Rollout failed: ${rollout.stderr}"
    
    val pods = k8s.getPods(namespace = "default", selector = "app=api")
    "Deployed. Running pods: ${pods.stdout.lines().size}"
}
```
