# `koupper provider`

Discover available service providers and inspect their runtime requirements.

## Subcommands

```bash
koupper provider list
koupper provider info <provider-id-or-class>
```

## Output contract

- `list`: provider id, service provider class, short description.
- `info`: description, bindings, implementation tags (if present), env vars, docs URL.

## `list`

```bash
koupper provider list
```

Shows all registered providers with:

- provider id
- service provider class
- short description

## `info`

```bash
koupper provider info github
```

Returns provider details:

- description
- bindings (`contract -> implementations`)
- tags (when available)
- environment variables (`required` / `optional`)
- documentation link

## Notes

- Provider data is loaded from the local catalog at `~/.koupper/catalog/providers.json`.
- If the catalog is missing, refresh local artifacts:

```bash
./scripts/setup/install.sh
```

Windows PowerShell:

```powershell
./scripts/setup/install.ps1
```

`info` accepts any of the following identifiers:

- provider id (example: `github`)
- service provider class (example: `GitHubServiceProvider`)
- contract name (example: `GitHubClient`)

## Reference pages

- Full provider catalog: [/providers/](/providers/)
- GitHub automation provider: [/providers/github](/providers/github)
- Terminal runtime capability: [/providers/terminal](/providers/terminal)
