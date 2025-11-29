# CopyTyping Clone
<!-- Version: Final Release - November 2025 -->

Una aplicación web de práctica de mecanografía inspirada en CopyTyping.io, construida con React, TypeScript y Tailwind CSS.

## 📋 Características

- **12 Transcripciones Variadas**: Cartas de ventas legendarias con diferentes niveles de dificultad (Beginner, Intermediate, Advanced)
- **Práctica en Tiempo Real**: Estadísticas en vivo de WPM, Accuracy, Errors y Progress
- **Coloreo Dinámico**: Feedback visual instantáneo (verde para correcto, rojo para errores)
- **Historial de Sesiones**: Guarda automáticamente todas tus prácticas en localStorage
- **Diseño Responsive**: Optimizado para móvil, tablet y desktop
- **Tema Oscuro**: Interfaz moderna con paleta de colores personalizada

## 🚀 Instalación y Ejecución

### Prerrequisitos

Asegúrate de tener instalado:
- **Node.js** (versión 18 o superior)
- **pnpm** (gestor de paquetes)

Para instalar pnpm globalmente:
```bash
npm install -g pnpm
```

### Paso 1: Clonar o Descargar el Proyecto

Si tienes el proyecto en un archivo ZIP, descomprímelo. Si está en un repositorio, clónalo:
```bash
git clone <url-del-repositorio>
cd copytyping_clone
```

### Paso 2: Instalar Dependencias

Desde la raíz del proyecto, ejecuta:
```bash
pnpm install --force
```

Este comando instalará todas las dependencias necesarias para el proyecto. El flag `--force` asegura que se instalen correctamente incluso si hay conflictos menores de versiones.

**Alternativa con npm:**
Si no tienes pnpm instalado, puedes usar npm:
```bash
npm install --force
```

### Paso 2.5: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto copiando el archivo de ejemplo:
```bash
cp .env.example .env
```

El archivo `.env` debe contener:
```env
# App Configuration
VITE_APP_TITLE=CopyTyping
VITE_APP_LOGO=/logo.svg

# Analytics (optional - leave empty to disable)
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=
```

**Nota:** Si no creas este archivo, verás warnings en la consola sobre variables no definidas, pero la aplicación funcionará correctamente.

### Paso 3: Iniciar el Servidor de Desarrollo

Para ejecutar la aplicación en modo desarrollo:
```bash
pnpm dev
```

La aplicación estará disponible en: **http://localhost:3000**

### Paso 4: Construir para Producción (Opcional)

Si deseas crear una versión optimizada para producción:
```bash
pnpm build
```

Los archivos compilados se generarán en la carpeta `dist/`.

Para previsualizar la versión de producción:
```bash
pnpm preview
```

## 📁 Estructura del Proyecto

```
copytyping_clone/
├── client/                    # Código del frontend
│   ├── public/               # Archivos estáticos
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   │   ├── ui/          # Componentes de shadcn/ui
│   │   │   ├── Header.tsx   # Navegación principal
│   │   │   ├── Footer.tsx   # Pie de página
│   │   │   └── LetterCard.tsx # Card de carta de ventas
│   │   ├── data/
│   │   │   └── salesLetters.ts # Datos de las transcripciones
│   │   ├── pages/
│   │   │   ├── Home.tsx     # Página principal
│   │   │   ├── Practice.tsx # Página de práctica
│   │   │   └── History.tsx  # Historial de sesiones
│   │   ├── App.tsx          # Componente raíz con rutas
│   │   ├── main.tsx         # Punto de entrada
│   │   └── index.css        # Estilos globales y tema
│   └── index.html           # HTML principal
├── package.json             # Dependencias y scripts
├── tsconfig.json            # Configuración de TypeScript
├── tailwind.config.ts       # Configuración de Tailwind CSS
├── vite.config.ts           # Configuración de Vite
└── README.md               # Este archivo
```

## 🎮 Cómo Usar la Aplicación

### 1. Página Principal (Home)
- Explora las 12 cartas de ventas disponibles
- Filtra por dificultad: All Difficulties, Beginner, Intermediate, Advanced
- Ordena por: Newest, Longest, Shortest
- Haz clic en cualquier card para comenzar a practicar

### 2. Página de Práctica (Practice)
- El texto original aparece en el lado izquierdo con fondo de papel
- Escribe en el textarea del lado derecho
- Observa las estadísticas en tiempo real:
  - **WPM**: Palabras por minuto
  - **Accuracy**: Porcentaje de precisión
  - **Errors**: Número de errores cometidos
  - **Progress**: Porcentaje de texto completado
- Los caracteres se colorean automáticamente:
  - **Verde**: Correcto
  - **Rojo**: Error
  - **Gris**: Aún no escrito
- Usa los botones:
  - **End Session**: Finaliza y guarda la sesión
  - **Restart**: Reinicia la práctica actual

### 3. Modal de Resumen
- Aparece automáticamente al finalizar una sesión
- Muestra todas tus estadísticas finales
- Opciones:
  - **Try Again**: Reintentar la misma carta
  - **Choose New Letter**: Volver al inicio

### 4. Historial (History)
- Accede desde el navbar
- Ve estadísticas generales:
  - Total Sessions
  - Avg WPM
  - Avg Accuracy
  - Total Words
- Revisa todas tus sesiones anteriores con detalles completos

## 🛠️ Tecnologías Utilizadas

- **React 19**: Framework de UI
- **TypeScript**: Tipado estático
- **Tailwind CSS 4**: Estilos utility-first
- **Vite**: Build tool y dev server
- **shadcn/ui**: Componentes de UI
- **Wouter**: Enrutamiento ligero
- **Lucide React**: Iconos

## 💾 Almacenamiento de Datos

La aplicación utiliza **localStorage** del navegador para guardar el historial de prácticas. Los datos persisten incluso después de cerrar el navegador, pero son específicos del navegador y dispositivo que uses.

## 🎨 Personalización

### Cambiar Colores del Tema

Edita el archivo `client/src/index.css` en la sección `:root` para modificar la paleta de colores:

```css
:root {
  --background: oklch(0.15 0.02 255);
  --foreground: oklch(0.95 0.01 255);
  --primary: oklch(0.60 0.22 255);
  /* ... más variables */
}
```

### Agregar Más Transcripciones

Edita el archivo `client/src/data/salesLetters.ts` y agrega nuevos objetos al array:

```typescript
{
  id: 13,
  title: "TU TÍTULO",
  author: "Autor",
  words: 500,
  wpm: 0,
  difficulty: "beginner",
  tags: ["Tag1", "Tag2"],
  insights: 10,
  preview: "Vista previa del texto...",
  fullText: "Texto completo aquí..."
}
```

## 🐛 Solución de Problemas

### El servidor no inicia
- Verifica que Node.js esté instalado: `node --version`
- Verifica que pnpm esté instalado: `pnpm --version`
- Elimina `node_modules` y reinstala: `rm -rf node_modules && pnpm install`

### Los cambios no se reflejan
- Detén el servidor (Ctrl+C) y reinícialo: `pnpm dev`
- Limpia la caché del navegador (Ctrl+Shift+R)

### Error de puertos
Si el puerto 3000 está ocupado, puedes especificar otro:
```bash
pnpm dev --port 3001
```

## 📝 Scripts Disponibles

```bash
pnpm dev          # Inicia servidor de desarrollo
pnpm build        # Construye para producción
pnpm preview      # Previsualiza build de producción
pnpm lint         # Ejecuta el linter
```

**Con npm:**
```bash
npm run dev       # Inicia servidor de desarrollo
npm run build     # Construye para producción
npm run preview   # Previsualiza build de producción
npm run lint      # Ejecuta el linter
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún bug o tienes sugerencias de mejora, no dudes en abrir un issue o pull request.

## 📧 Contacto

Para preguntas o soporte, contacta al desarrollador del proyecto.

---

**¡Disfruta practicando tu mecanografía! 🚀⌨️**
