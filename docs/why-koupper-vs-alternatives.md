# Why Koupper vs Alternatives

Koupper is not a replacement for every automation tool. It is strongest when JVM teams need script velocity and production discipline in the same workflow.

## Quick comparison

| Approach | Strength | Tradeoff | Koupper advantage |
| --- | --- | --- | --- |
| Shell/Python ad-hoc scripts | Very fast to start | Hard to govern at scale; inconsistent runtime behavior | Typed Kotlin scripts with one execution contract |
| Workflow orchestrators (Airflow/Temporal/Prefect) | Rich scheduling and orchestration ecosystems | Higher platform complexity for teams that just need app-adjacent automations | Lighter local-first path with provider contracts and Kotlin-native DX |
| Low-code automation tools | Rapid non-dev integrations | Limited code-level control for complex engineering use cases | Full code ownership + provider model + versioned repo workflows |
| Custom in-house runners | Full control | High maintenance burden and fragmented standards | Reusable runtime, CLI, providers, and docs conventions out of the box |

## Best-fit scenarios

- JVM teams with many worker/job/deploy scripts
- platform squads standardizing internal automation
- teams migrating script sprawl into production-grade workflows

## Less-fit scenarios

- no-code-first teams with no engineering ownership
- organizations that already standardized around heavyweight orchestrators and do not need script-local ergonomics

## Strategic takeaway

Use Koupper when you want:

- a Kotlin-first script model,
- one runtime contract across execution surfaces,
- provider-first integrations,
- and a direct local-to-production path without rebuilding your automation stack.
