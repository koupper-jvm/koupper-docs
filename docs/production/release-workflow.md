# Release Workflow

Koupper uses independent artifact tracks and stable tags.

## Artifact versions

- Octopus runtime (`koupper`): `octopus-v<version>`
- CLI (`koupper-cli`): `cli-v<version>`
- optional monorepo snapshot: `koupper-v<version>`

## Recommended release steps

1. Start from `develop` and work in a dedicated branch (`feature/*`, `fix/*`, `docs/*`).
2. Run local quick checks for impacted modules before push.
3. Run preflight checks for the feature branch.
4. Run the release flow in dry-run mode.
5. Run release flow to create PR, wait for CI, and merge only on `success`.

## Validation tiers

| Stage | Branch/event | Validation goal | Checks |
| --- | --- | --- | --- |
| Local pre-push | developer machine | fast confidence before push | targeted provider tests, CLI targeted test, docs check/build |
| PR quick gate | pull request to `develop` | catch integration regressions quickly | compile fast-checks + provider consistency checks |
| Heavy validation | push to `main`/`master`, `v*` tags, manual/nightly | full release confidence | full smoke suite + install/uninstall E2E |

### PR quick gate (`develop`)

- `PR Fast Checks`
  - `koupper/:octopus:compileKotlin`
  - `koupper-cli:compileKotlin`
- `Provider Consistency`
  - `koupper/providers: ProviderCatalogConsistencyTest`
  - `koupper/providers: CommandRunnerServiceProviderTest`
  - `koupper-cli: ProviderCommandCatalogPathTest`
- `Docs Quality` (repo `koupper-document`)
  - `npm run docs:check`
  - `npm run docs:build`

### Heavy validation (`main`/release)

- `Full Smoke Suite`
  - smoke windows + smoke linux
  - install/uninstall E2E (windows)
  - manual dispatch and nightly schedule supported

## Local checks before push

From the `koupper` monorepo root:

```bash
./scripts/ci/local-quick-checks.sh all
```

Windows PowerShell:

```powershell
./scripts/ci/local-quick-checks.ps1 -Target all
```

Docs-only change from `koupper-document`:

```bash
npm run docs:check && npm run docs:build
```

## Mandatory automation commands

Use Koupper release scripts instead of manual PR/tag command sequences.

```bash
koupper run scripts/release/preflight.kts '{"featureBranch":"feature/my-change"}'
koupper run scripts/release/release-flow.kts '{"featureBranch":"feature/my-change","dryRun":true}'
koupper run scripts/release/release-flow.kts '{"featureBranch":"feature/my-change","waitForCi":true,"mergeAfterCi":false}'
koupper run scripts/release/release-flow.kts '{"featureBranch":"feature/my-change","waitForCi":true,"mergeAfterCi":true,"adminMerge":true}'
```

Fast-lane for `develop` PRs (create PR immediately, let GitHub auto-merge after required checks):

```bash
koupper run scripts/release/fast-lane.kts '{"featureBranch":"feature/my-change","enableAutoMerge":true}'
```

Before tagging, run the [Script Execution Checklist](/production/script-execution-checklist).

## Tag examples

```bash
git tag -a octopus-v6.3.1 -m "Octopus runtime release 6.3.1"
git tag -a cli-v4.7.1 -m "Koupper CLI release 4.7.1"
git tag -a koupper-v1.2.1-monorepo -m "Koupper monorepo stable snapshot 1.2.1"
```
