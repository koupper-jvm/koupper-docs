# Release Workflow

Koupper uses independent artifact tracks and stable tags.

## Artifact versions

- Octopus runtime (`koupper`): `octopus-v<version>`
- CLI (`koupper-cli`): `cli-v<version>`
- optional monorepo snapshot: `koupper-v<version>`

## Recommended release steps

1. Merge release-ready PRs into `main`.
2. Bump versions and update changelogs.
3. Tag runtime + CLI + optional monorepo snapshot.
4. Publish GitHub Releases from tags.
5. Validate with quick smoke commands.

## Tag examples

```bash
git tag -a octopus-v6.3.1 -m "Octopus runtime release 6.3.1"
git tag -a cli-v4.7.1 -m "Koupper CLI release 4.7.1"
git tag -a koupper-v1.2.1-monorepo -m "Koupper monorepo stable snapshot 1.2.1"
```
