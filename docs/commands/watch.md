# `koupper watch`

Start the Octopus Sentinel — a project watcher that automatically manages Koupper provider dependencies.

## Usage

```bash
koupper watch
```

The Sentinel:
1. Scans your project's source code (`src/**/*.kt`, `*.kts`) for provider class references
2. Detects which Service Providers your project uses
3. Automatically injects required Maven/Gradle dependencies into your `build.gradle.kts`
4. Keeps watching for changes and syncs dependencies as you add new providers

## How it works

The Sentinel connects to the Octopus daemon and sends a `WATCH` command with your project directory as context. Octopus scans your source files for provider class names and resolves their `externalDependencies()` to add them to your build configuration.

## Related

- [Run command](/commands/run)
- [Provider discovery](/commands/provider)
- [Octopus architecture](/architecture/)
