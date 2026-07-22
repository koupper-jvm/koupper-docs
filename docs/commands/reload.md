# koupper reload

El comando `koupper reload` te permite reiniciar dinámicamente los *Service Providers* del ecosistema Koupper sin necesidad de apagar o reiniciar el demonio `Octopus` que se ejecuta en background.

## Sintaxis

```bash
koupper reload
```

## ¿Cómo funciona?

Cuando ejecutas este comando, el CLI se conecta por el puerto `9998` (el socket interno de Octopus) y despacha la instrucción en vivo. El motor de Koupper hará lo siguiente:

1. Vaciar el contenedor de dependencias principal (DI Container).
2. Crear un nuevo `URLClassLoader` apuntando al directorio `~/.koupper/providers/` para recargar el código fresco de todos los JARs y sus interfaces.
3. Volver a inyectar las clases provistas en el Localizador de Servicios, para que la próxima vez que un script invoque `app.getInstance(...)` utilice las implementaciones actualizadas.

## Casos de Uso

* **Desarrollo de Providers (Plugins):** Compila tu nuevo `ServiceProvider`, cópialo a `~/.koupper/providers` y usa `koupper reload` para probar tus cambios inmediatamente en tus scripts.
* **Continuous Delivery (CD) sin Downtime:** Reemplaza lógicas de terceros y recarga la instancia productiva de Koupper sin afectar las solicitudes HTTP actuales, manteniendo la alta disponibilidad.

## Hot-Reload Architecture (v7)

Desde la versión 7, Koupper maneja el `ServiceProviderManager` como un contenedor Singleton que recicla inteligentemente los *ClassLoaders*. Esto nos permite recargar los plugins al vuelo y aplicar parches de seguridad a las interfaces de integraciones sin apagar los jobs en background.
