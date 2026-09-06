# 🌈 Papelería Arcoíris App

Aplicación Android en React Native + TypeScript para una papelería/centro de copiado, diseñada con una experiencia sencilla para adultos mayores.

## Estado actual

### Herramientas implementadas en esta iteración
- 📸 **Foto a PDF**: cámara/galería, selección múltiple, revisión antes/después y generación de PDF tamaño carta.
- 🗂️ **Escaneo múltiple a PDF**: cámara/galería, múltiples páginas, reordenamiento y PDF único tamaño carta.

### Arquitectura preparada
- 🗜️ Comprimir PDF
- 🖼️ Restaurar fotos
- 🗒️ Hoja de resumen visual
- 📣 Anuncio/cartel
- 🧠 Flashcards
- 🖨️ Pedido de impresión
- 🪪 Foto tipo credencial
- ⏰ Recordatorios
- 📋 Llenado de formatos
- 🔎 Investigación

## Stack

- React Native 0.81
- React 19
- TypeScript
- React Navigation
- `react-native-image-picker` para cámara/galería
- `react-native-html-to-pdf` para PDF
- `react-native-fs` para archivos
- `react-native-share` preparado para compartir

## Instalación

```bash
npm install
npx react-native run-android
```

## Nota Android

Este repositorio contiene actualmente la capa JavaScript/TypeScript y la configuración de dependencias. La carpeta `android/` debe generarse/añadirse en el entorno React Native anfitrión antes de compilar el APK. Las funciones de cámara requieren los permisos Android correspondientes.

## IA

La mejora IA de documentos queda aislada en el flujo de procesamiento para poder conectar después una API segura sin exponer claves dentro de la aplicación. Mientras no haya una API configurada, las imágenes originales se conservan sin alteraciones.
