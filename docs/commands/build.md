# `koupper build`

Build a Koupper module by executing its `init.kts` script.

## Usage

```bash
koupper build
```

Runs the `init.kts` file in the current directory. This script typically contains the build logic for the module — compiling, packaging, or running project-specific build steps.

This is a convenience wrapper around `koupper run init.kts` that provides build-specific defaults.

## Related

- [Run command](/commands/run)
- [New command](/commands/new)
- [Getting started](/getting-started)
