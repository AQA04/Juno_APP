---
description: Pasos para convertir Juno en un APK usando Capacitor
---

# Guía para generar el APK de JUNO

Este proyecto ya tiene configurado **Capacitor**, que es la herramienta que permite convertir tu app web en una app nativa. Para generar el APK, sigue estos pasos:

## 1. Requisitos de Software
Antes de empezar, necesitas tener instalado en tu computadora:
- **Android Studio**: Descárgalo e instálalo desde [developer.android.com](https://developer.android.com/studio).
- **Android SDK**: Se instala automáticamente con Android Studio. Asegúrate de configurar al menos una versión de Android (ej. Android 13 o 14).
- **Java JDK 17 o superior**: Android Studio suele traerlo, pero es bueno verificarlo.

## 2. Preparar la Aplicación
Ejecuta estos comandos en la terminal de VS Code:

// turbo
1. **Generar los archivos de producción:**
   ```powershell
   npm run build
   ```
   *Esto creará la carpeta `dist/` con todo el código optimizado.*

2. **Sincronizar con la carpeta de Android:**
   ```powershell
   npm run cap-sync
   ```
   *Esto copia los archivos de `dist/` a la carpeta nativa de Android.*

## 3. Abrir y Compilar en Android Studio
Una vez sincronizado, abre el proyecto en Android Studio:

3. **Abrir Android Studio automáticamente:**
   ```powershell
   npx cap open android
   ```

4. **Dentro de Android Studio:**
   - Espera a que termine de cargar (el proceso "Gradle Sync").
   - En el menú superior, ve a **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
   - Cuando termine, aparecerá una notificación abajo a la derecha. Haz clic en **locate** para ver el archivo `app-debug.apk`.

## 4. Instalar en tu Celular
- Puedes pasar ese archivo `.apk` a tu teléfono por cable, Drive o WhatsApp e instalarlo.
- Recuerda habilitar "Instalar aplicaciones de fuentes desconocidas" en tu Android.

---
> [!TIP]
> Si quieres una versión para subir a la Play Store (Release), el proceso requiere "Firmar la aplicación" (Signed APK). ¡Pregúntame si necesitas ayuda con eso!
