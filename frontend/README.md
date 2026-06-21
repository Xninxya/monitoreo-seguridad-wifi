# Monitoreo de Seguridad Personal en Redes Wi-Fi — Prototipo navegable

Proyecto Expo / React Native correspondiente a la **Semana 4**. Implementa
navegación real entre 5 pantallas, una base de datos SQLite local (con el
mismo esquema de `Ficha_BD_Prototipo_Semana_4.docx`) y un formulario
funcional con validación.

## Pantallas incluidas

| # | Pantalla | Tipo | Conecta con |
|---|----------|------|-------------|
| 1 | Dashboard de Red | Inicio | Dispositivos, Alertas, Configuración |
| 2 | Lista de Dispositivos | Lista | (vuelve al Dashboard) |
| 3 | Historial de Alertas | Lista | Detalle de Alerta |
| 4 | Detalle de Alerta | Detalle | (vuelve) |
| 5 | Configuración | **Formulario** | (vuelve) |

## Cómo correrlo

Requisitos: Node.js 18+ y la app **Expo Go** instalada en tu celular
(disponible en Play Store / App Store), o un emulador Android/iOS.

```bash
npm install
npx expo start
```

Esto abrirá una página con un **código QR**. Escanéalo con Expo Go (Android)
o con la cámara (iOS) para correr la app en tu teléfono. Esa misma página
te da un **enlace** que puedes entregar para el punto 4 y 5 de la entrega.

Para generar un **APK** instalable:

```bash
npx eas-cli build -p android --profile preview
```

(requiere crear una cuenta gratuita en https://expo.dev y ejecutar `eas login`
y `eas build:configure` la primera vez).

## Base de datos

`src/services/database.js` crea, al primer arranque, una base de datos
SQLite **real** en el dispositivo (`monitoreo_seguridad_wifi.db`) con las
4 tablas de la Ficha BD Semana 4 (`RedWifi`, `Dispositivo`, `Alerta`,
`ConfiguracionUsuario`) y la siembra con datos de prueba. Todas las
pantallas leen y escriben en esa base de datos real (no hay datos
"hardcodeados" en los componentes).

## Arquitectura

Sigue el patrón **MVVM** acordado en la Clínica Técnica (Semana 3):

- `src/services/database.js` — acceso a datos (Model)
- `src/viewmodels/` — hooks con la lógica de cada pantalla (ViewModel)
- `src/views/` — componentes de pantalla, solo presentación (View)
- `src/components/` — componentes reutilizables (Card, StatusBadge,
  PrimaryButton, DeviceCard, AlertCard, ValidatedInput)
- `src/navigation/AppNavigator.js` — Stack Navigator (React Navigation)

## Qué es real y qué está simulado

✅ **Real:** la base de datos SQLite, la navegación entre pantallas, el
formulario de configuración con validación y persistencia, marcar
dispositivos/alertas y ver los cambios reflejados al instante.

⚠️ **Simulado (a propósito):** el botón "Escanear red" del Dashboard no
lee la tabla ARP real del router ni hace un escaneo de red real — eso
requiere un módulo nativo con permisos de red local (fuera del alcance de
un prototipo en Expo managed workflow). Por ahora solo actualiza la fecha
de "última conexión". Ese es el siguiente paso técnico real: implementar
el escaneo (o conectarlo al backend FastAPI que ya está definido en el
stack del proyecto) y reemplazar `simularEscaneo()` en
`src/services/database.js` por la llamada real.

## Próximos pasos sugeridos

1. Conectar `simularEscaneo()` a un endpoint real del backend FastAPI que
   lea la tabla ARP del dispositivo o de la red.
2. Implementar notificaciones push reales (Expo Notifications) cuando se
   inserte una alerta de tipo `arp_spoofing`.
3. Agregar pantalla de Login si el proyecto lo requiere, y persistencia de
   sesión.
4. Subir este proyecto a su repositorio de GitHub y hacer commits
   reflejando el avance de la semana (punto 5 de la entrega).
