# Ideal Customer Profile (ICP)

This page describes who gets the highest value from Koupper first.

## ICP v1

Best-fit teams:

- Backend/platform teams (3-15 engineers)
- JVM/Kotlin ecosystem
- Script-heavy operations (workers, jobs, scheduled automation, deploy flows)
- Need stronger reliability and observability than shell-script sprawl

Best-fit outcomes:

- faster delivery of internal automation,
- consistent runtime behavior across local and production paths,
- lower operational risk through provider contracts and runbooks.

## Less ideal right now

- teams that do not use JVM/Kotlin and do not want Kotlin scripting,
- teams looking for purely no-code automation,
- one-off scripts with no production lifecycle.

## Why this focus

Koupper is strongest when script velocity and production discipline must coexist. This focus lets teams ship fast while improving maintainability over time.

## Next steps for decision-makers

1. Run [Quick Smoke](/examples/quick-smoke).
2. Review [Use Cases](/use-cases).
3. Validate provider fit in [Providers](/providers/).
4. Align rollout with [Production Hardening](/production/hardening).
