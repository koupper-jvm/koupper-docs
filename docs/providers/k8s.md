# K8s Provider

`k8s` runs Kubernetes operations over `kubectl` for apply/get/logs/rollout workflows.

## Service provider

- `K8sServiceProvider`

## Contract and implementations

- `K8sProvider` -> `KubectlK8sProvider`

## Environment variables

- `KUBECTL_COMMAND` (optional)
- `KUBECTL_TIMEOUT_SECONDS` (optional)

## CLI discovery

```bash
koupper provider info k8s
```
