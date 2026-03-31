# `koupper provider`

Discover available service providers and inspect their runtime requirements.

## Subcommands

```bash
koupper provider list
koupper provider info <provider-id-or-class>
```

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
kotlinc -script install.kts -- --force
```
