# Release Workflow

Koupper uses independent artifact tracks and stable tags.

## Artifact versions

- Octopus runtime (`koupper`): `octopus-v<version>`
- CLI (`koupper-cli`): `cli-v<version>`
- optional monorepo snapshot: `koupper-v<version>`

## Recommended release steps

1. Start from `develop` and work in a dedicated branch (`feature/*`, `fix/*`, `docs/*`).
2. Run preflight checks for the feature branch.
3. Run the release flow in dry-run mode.
4. Validate local tests/build for impacted modules.
5. Run release flow to create PR, wait for CI, and merge only on `success`.

## Mandatory automation commands

Use Koupper release scripts instead of manual PR/tag command sequences.

```bash
koupper run scripts/release/preflight.kts '{"featureBranch":"feature/my-change"}'
koupper run scripts/release/release-flow.kts '{"featureBranch":"feature/my-change","dryRun":true}'
koupper run scripts/release/release-flow.kts '{"featureBranch":"feature/my-change","waitForCi":true,"mergeAfterCi":false}'
koupper run scripts/release/release-flow.kts '{"featureBranch":"feature/my-change","waitForCi":true,"mergeAfterCi":true,"adminMerge":true}'
```

Before tagging, run the [Script Execution Checklist](/production/script-execution-checklist).

## Tag examples

```bash
git tag -a octopus-v6.3.1 -m "Octopus runtime release 6.3.1"
git tag -a cli-v4.7.1 -m "Koupper CLI release 4.7.1"
git tag -a koupper-v1.2.1-monorepo -m "Koupper monorepo stable snapshot 1.2.1"
```
