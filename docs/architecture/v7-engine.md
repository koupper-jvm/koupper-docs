# Arquitectura del Motor (v7 Engine)

A partir de la versión 7.0.0, Koupper introduce mejoras estructurales significativas en el *Octopus Runtime* para manejar cargas de trabajo empresariales y garantizar una estabilidad superior en entornos críticos. El release comunitario actual es **7.2.0+** (Runtime Router CORS DSL, jobs compilados, y mejoras de DX en `koupper module`).

## 1. Process Sandboxing (Aislamiento de Fallos)

Antes de la versión 7, un script con código malicioso o deficiente podía ejecutar `System.exit(1)` y derribar el demonio completo de Koupper.

Ahora, cuando `koupper.sandbox.enabled=true` (comportamiento por defecto en entornos seguros), Octopus no corre la función directamente en su hilo principal. En su lugar, orquesta una **JVM hija aislada** (mediante `ProcessBuilder`) y captura la salida estándar y de errores.
Si la JVM hija truena o hace un _exit_ inesperado, el Sandbox simplemente cancela el script y reporta `[ERR_COMPILE] Script compilation failed: Sandbox Execution Failed`, dejando al demonio Octopus principal completamente sano y listo para el siguiente request.

## 2. Server-Sent Events (SSE Streaming)

El servidor HTTP REST integrado (Grizzly) ahora soporta nativamente la transmisión de logs en tiempo real vía Server-Sent Events (SSE) a través del endpoint `POST /api/v1/run-stream`.

Cuando un script de ejecución larga hace `println("...")`, Octopus inyecta la salida estándar a través del `SessionStdoutBridge` enlazado a la conexión HTTP. Esto permite que los clientes frontend (React, Vue, Angular) o agentes de consola escuchen cada línea del trabajo conforme va ocurriendo, y no al final de la ejecución, brindando una experiencia 100% interactiva en tareas prolongadas.

## 3. Hot-Reloading de Providers

El *ServiceProviderManager* fue rediseñado usando una gestión de `URLClassLoader` a nivel global (Singleton). Puedes reemplazar cualquier archivo `.jar` en el directorio de `~/.koupper/providers` e invocar el comando `koupper reload` para vaciar y refrescar el Contenedor de Inyección de Dependencias (DI) al instante. 
Todo esto ocurre **sin apagar el demonio y sin tiempo de inactividad**.

## 4. Hybrid Metadata Extraction (KSP + JVM Reflection)

Para los proyectos compilados, Koupper exige el uso de **KSP** (Kotlin Symbol Processing), el cual genera el `koupper-exports.json` en tiempo de compilación. Esto mantiene al framework puro, robusto y exento de usar "Regex" peligrosas para analizar el AST (Abstract Syntax Tree) del código fuente.

**Sin embargo, para los scripts crudos (`.kts`) dinámicos:** Al ejecutar un `koupper run` sobre un archivo sin compilar, no existe metadato KSP previo. La v7 de Octopus soluciona esto escalonando la verificación a un mecanismo de **JVM Reflection Fallback**:
Octopus compila el script en memoria con el motor de _Kotlin Scripting_ y lee la clase Java resultante (`KClass.functions`). De esta forma extrae la función anotada con `@Export` con el 100% de precisión y seguridad del compilador de Kotlin, permitiendo ejecutar los scripts sin requerir metadatos estáticos previos.
