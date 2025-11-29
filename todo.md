# Project TODO

## Fase 1: Configuración Inicial
- [x] Inicializar proyecto con React y Tailwind CSS
- [x] Crear archivo todo.md

## Fase 2: Estructura de Datos
- [x] Crear archivo salesLetters.js con al menos 5 cartas de ventas
- [x] Definir estructura de datos completa (id, title, author, words, wpm, difficulty, tags, insights, preview, fullText)

## Fase 3: Diseño Visual y Componentes Estáticos
- [x] Configurar paleta de colores personalizada en index.css
- [x] Configurar tipografía (fuentes sans-serif y monospace)
- [x] Crear componente Header con logo, navegación y botones de autenticación
- [x] Crear componente Footer con copyright y links

## Fase 4: Página HOME
- [x] Implementar Hero Section con ícono, título y subtítulo
- [x] Crear componente de filtros (Difficulty, Category, Sort by)
- [x] Crear componente LetterCard con diseño completo
- [x] Implementar grid de cards con datos de salesLetters
- [x] Implementar lógica de filtrado por dificultad
- [x] Implementar lógica de ordenamiento
- [x] Agregar efectos hover y transiciones a las cards
- [x] Implementar navegación al hacer clic en "Start Typing"

## Fase 5: Página PRACTICE
- [x] Crear componente de header de práctica con botón "Back"
- [x] Crear grid de 4 Stats Cards (WPM, Accuracy, Errors, Progress)
- [x] Implementar área de display del texto original con estilo de papel
- [x] Implementar textarea para escritura del usuario
- [x] Implementar lógica de comparación carácter por carácter
- [x] Implementar coloreo dinámico (gris, verde, rojo)
- [x] Implementar cálculo de WPM en tiempo real
- [x] Implementar cálculo de Accuracy en tiempo real
- [x] Implementar contador de Errors en tiempo real
- [x] Implementar cálculo de Progress en tiempo real
- [x] Implementar timer que inicia con el primer carácter
- [x] Crear botones "End Session" y "Restart"
- [x] Implementar funcionalidad de reinicio

## Fase 6: Responsive Design
- [x] Implementar breakpoint mobile (max-width: 640px)
- [x] Implementar breakpoint tablet (max-width: 1024px)
- [x] Verificar layout desktop (min-width: 1024px)
- [x] Ajustar grid de cards para responsive
- [x] Ajustar área de práctica para responsive
- [x] Ajustar stats para responsive (2x2 en mobile/tablet)

## Fase 7: Refinamiento Final
- [x] Revisar todos los colores según especificaciones
- [x] Revisar todos los tamaños de fuente y spacing
- [x] Verificar todas las animaciones y transiciones
- [x] Probar funcionalidad completa de typing
- [x] Verificar precisión de cálculos (WPM, Accuracy, etc.)
- [x] Realizar pruebas en diferentes tamaños de pantalla
- [x] Optimizar rendimiento

## Fase 8: Entrega
- [x] Crear checkpoint del proyecto
- [x] Exponer la aplicación
- [x] Entregar resultado al usuario

## Correcciones y Mejoras Solicitadas

### Navbar y Contenido
- [x] Quitar botones Login y Leaderboard del navbar
- [x] Agregar botón History/Historial al navbar
- [x] Agregar al menos 10 transcripciones (básico, medio, avanzado)
- [ ] Crear card/botón para agregar texto personalizado

### Navegación y UX
- [x] Arreglar navegación del navbar (Home/Practice deben funcionar)
- [x] Hacer cards clickeables en vista Home (no solo botón Start Typing)
- [x] Implementar vista "Ready to Start" antes de comenzar práctica

### UI de Práctica
- [x] Centrar título y autor a la derecha junto al badge de nivel
- [x] Mover botones Restart y End Session dentro del área de escritura
- [x] Ajustar layout según diseño de referencia

### Modal y Historial
- [x] Crear modal de resumen al finalizar sesión
- [x] Mostrar estadísticas en modal (WPM, Accuracy, Time, Words)
- [x] Implementar sistema de historial con localStorage
- [x] Crear página/vista de Historial para ver prácticas anteriores
- [x] Guardar cada sesión completada en el historial

## Correcciones Urgentes

### Navbar
- [x] Centrar navbar (actualmente está alineado a la derecha)
- [x] Verificar que la navegación funcione correctamente

### Vista Practice
- [x] Eliminar vista "Ready to Start" - ir directo a la práctica
- [x] Reorganizar layout según imagen de referencia
- [x] Botones End Session y Restart deben estar DEBAJO del textarea (no dentro)
- [x] Asegurar que el título esté en la parte superior derecha con el badge)
- [x] Verificar que el texto original se muestre correctamente en el lado izquierdo

### Testing
- [x] Testear navegación completa (Home -> Practice -> History)
- [x] Testear funcionalidad de escritura y cálculos en tiempo real
- [x] Testear modal de resumen- [x] Verificar guardado en historial- [ ] Verificar que todas las cards sean clickeables

### Optimización y Documentación
- [x] Optimizar código para ejecución local
- [x] Crear README.md con instrucciones paso a paso
- [ ] Incluir requisitos previos y comandos de instalación

## Nueva Vista de Home - Landing Page

- [x] Reemplazar vista actual del Home con nuevo diseño de landing page
- [x] Implementar hero principal "Master Copy Through Typing"
- [x] Agregar sección "Track Your Progress With A Free Account" con botón
- [x] Agregar sección "CopyTyping - The Daily Habit Of World's Top Copywriters" con botón
- [x] Implementar sección "Top Performers" con leaderboard visual
- [x] Testear nueva vista y navegación

## Simplificación de la Aplicación

### Home Minimalista
- [x] Simplificar Home con solo descripción de la app
- [x] Agregar animación de texto escribiéndose
- [x] Dejar solo un botón "Start Practice"
- [x] Quitar secciones de cuenta, daily habit y top performers

### Nueva Vista Practice
- [x] Crear vista Practice con filtros de dificultad
- [x] Agregar filtro por categoría (All Categories)
- [x] Implementar botón para añadir texto personalizado
- [x] Mostrar grid con todas las cartas de ventas
- [x] Al hacer clic en "Start Typing" navegar a vista de escritura

### Vista Typing (Escritura)
- [x] Renombrar Practice actual a Typing
- [x] Actualizar rutas en App.tsx
- [x] Mantener funcionalidad de escritura actual

## Implementación de Add Custom Text

- [x] Crear componente Modal para agregar texto personalizado
- [x] Implementar formulario con campos: título, autor, texto, dificultad
- [x] Agregar validación de formulario (texto mínimo, campos requeridos)
- [x] Implementar lógica de guardado en localStorage
- [x] Actualizar Practice.tsx para mostrar textos personalizados en la lista
- [ ] Agregar funcionalidad para eliminar textos personalizados
- [ ] Testear creación, visualización y práctica con texto personalizado

## Correcciones de Bugs - Timer y Navegación

- [x] Detener el timer cuando se muestra el modal de End Session
- [x] Evitar que el WPM disminuya después de mostrar el modal
- [x] Cambiar navegación de "Choose New Letter" para que vaya a /practice en lugar de /home

## Mejoras de UX - Transiciones y Efectos

- [x] Agregar transiciones suaves entre vistas (Home, Practice, Typing, History)
- [x] Implementar efectos hover en las cards de Practice (scale, shadow, etc.)
- [x] Agregar animaciones de entrada para las cards

## Correcciones de UX - Scroll y Tema

- [x] Corregir scroll automático en vista de práctica (solo mover cuando la card amarilla necesite scroll)
- [x] Agregar toggle de tema oscuro/claro en el navbar
- [x] Implementar cambio de colores para modo claro
- [x] Testear ambas funcionalidades

## Correcciones de Colores y Categorías en Light Mode

- [x] Corregir hover de cards en Practice (fondo negro no es apropiado en light mode)
- [x] Ajustar colores a tonos pasteles más suaves (rojo, azul, verde, naranja/intermediate)
- [x] Corregir colores del modal Add Custom Text en light mode
- [x] Agregar selector de categorías al modal (dropdown con categorías existentes + opción custom)
- [x] Permitir agregar categorías personalizadas en el modal
- [x] Testear todos los colores en modo claro y oscuro

## Correcciones de Ordenamiento y Estilos

- [x] Ordenar alfabéticamente categorías en selector de filtros de Practice
- [x] Ordenar alfabéticamente categorías en modal Add Custom Text
- [x] Ordenar alfabéticamente las cards en la vista Practice
- [x] Ajustar tipografía de badges (ADVANCED, INTERMEDIATE, BEGINNER) para coincidir con botón Start Typing
- [x] Corregir fondo del textarea Practice Text en modal (debe adaptarse al tema)
- [x] Testear en modo claro y oscuro

## Correcciones Finales - Badges e Historial

- [x] Cambiar color de texto de badges de complejidad a blanco (en ambos modos)
- [x] Agregar botón de eliminar individual en cada item del historial
- [x] Agregar botón "Delete All History" con confirmación
- [x] Testear en modo claro y oscuro

## Configuración para Desarrollo Local

- [x] Crear archivo .env con variables de entorno necesarias
- [x] Crear archivo .env.example como referencia
- [x] Actualizar README.md con instrucciones de setup local

## Mejoras de UX - Cursor y Feedback de Errores

- [x] Agregar cursor animado en el preview que muestre la posición actual
- [x] Implementar ícono de lápiz pequeño en la esquina superior derecha del cursor
- [x] Agregar transición suave al cursor (parpadeo o animación)
- [x] Modificar comportamiento de errores: solo letras incorrectas con subrayado rojo
- [x] Letras correctas sin subrayado (solo color verde)
- [x] Testear en el navegador

## Correcciones de Cursor y Color de Fondo

- [x] Corregir posición del cursor: debe estar ANTES de la letra actual, no después
- [x] Reducir grosor del cursor de 8px a 2px para que sea más delgado
- [x] Cambiar color de fondo amarillo del preview a #fefad6
- [x] Testear en el navegador

## Ajustes del Cursor

- [x] Quitar el ícono de lápiz ✏️ del cursor
- [x] Hacer el cursor más grueso (aumentar de 2px a 4px)
- [x] Cambiar color del cursor a gris
- [x] Testear en el navegador

## Ajustes Finales de Cursor y Colores

- [x] Aumentar grosor del cursor de 4px a 8px
- [x] Agregar border-radius al cursor para esquinas redondeadas
- [x] Ajustar altura del cursor para que abarque toda la letra (como la M mayúscula)
- [x] Quitar color verde de letras correctas (solo mantener color por defecto)
- [x] Testear en el navegador

## Corrección de Scroll Inteligente

- [x] Eliminar sincronización directa entre scroll del textarea y preview
- [x] Implementar scroll del preview basado en posición del cursor
- [x] El preview solo debe hacer scroll cuando el cursor esté fuera de la vista visible
- [x] Testear con diferentes cantidades de texto escrito

## Ajuste de Comportamiento de Scroll del Preview

- [x] Modificar lógica de scroll para que solo se active cuando el cursor esté completamente fuera del área visible
- [x] El scroll no debe moverse si aún hay espacio visible en la caja amarilla
- [x] Testear con diferentes cantidades de texto para verificar el comportamiento

## Corrección Crítica de Scroll del Preview

- [x] El scroll NO debe moverse desde la primera letra
- [x] El scroll solo debe activarse cuando el cursor esté FUERA del área visible (al final del contenido visible)
- [x] Eliminar buffer zone y usar lógica estricta: cursor fuera = scroll, cursor dentro = NO scroll
- [x] Testear escribiendo desde el inicio para verificar que el scroll no se mueve prematuramente

## Scroll Basado en Texto Correcto Completado

- [x] El scroll del preview NO debe basarse en la posición del cursor del textarea
- [x] El scroll debe basarse en la cantidad de texto CORRECTO completado en el preview
- [x] Escribir texto incorrecto con muchos saltos de línea NO debe mover el scroll del preview
- [x] El scroll solo debe moverse cuando el último carácter correcto esté fuera del área visible del preview
- [x] Testear escribiendo texto incorrecto con múltiples saltos de línea

## Buffer Zone Hacia Adelante para Scroll Anticipado

- [x] El scroll debe activarse ANTES de que el cursor salga del área visible
- [x] Agregar buffer zone hacia adelante (ej: 100px antes del borde inferior)
- [x] Esto permite ver siempre el siguiente texto a escribir sin tener que hacer scroll manual
- [x] Testear escribiendo texto correcto hasta el final del área visible
- [x] Verificar que el scroll se active automáticamente para mostrar más texto

## Problema: useEffect de Scroll No Se Ejecuta en Navegador Real

- [x] El useEffect no se ejecuta cuando el usuario escribe texto en el navegador
- [x] Investigar por qué las dependencias [userInput, fullText] no disparan el useEffect
- [x] Considerar usar un enfoque diferente (ej: callback en handleInputChange)
- [x] Testear que el scroll se active automáticamente cuando se escribe texto
- [x] Solución: Mover lógica de scroll a handleScroll() y llamarla desde handleInputChange()

## Scroll con Texto Incorrecto

- [x] El scroll no se activa cuando se escribe texto incorrecto extenso
- [x] El cursor visual avanza pero el preview no hace scroll porque no hay caracteres correctos
- [x] Modificar handleScroll para que también considere la posición del cursor visual (userInput.length)
- [x] El scroll debe activarse si el cursor visual está fuera del área visible, independientemente de si el texto es correcto
- [x] Testear escribiendo texto incorrecto extenso para verificar que el scroll se activa
- [x] Solución: scrollPosition = lastCorrectIndex >= 0 ? lastCorrectIndex : newInput.length

## Scroll Basado en Posición Visual del Cursor

- [x] El scroll se activa prematuramente basándose en la posición del span en el DOM
- [x] Debe basarse en la posición VISUAL del cursor (elemento con clase .cursor-position)
- [x] El scroll solo debe activarse cuando el cursor visual esté cerca del borde inferior de la caja amarilla
- [x] No importa cuántos caracteres se hayan escrito, solo importa dónde está el cursor visual en la pantalla
- [x] Reescribir handleScroll para buscar .cursor-position y usar offsetTop/offsetHeight
- [x] Testear escribiendo "Most animal" y verificar que el scroll NO se active prematuramente
- [x] Solución: currentPosition = lastCorrectIndex + 1 y bufferZone = 20px

## Buffer Zone Demasiado Agresivo

- [x] El scroll se activa prematuramente cuando se escribe "Theyar" (solo 5 palabras correctas)
- [x] Buffer zone de 20px sigue siendo demasiado grande
- [x] Eliminar buffer zone completamente - scroll solo cuando el cursor esté COMPLETAMENTE fuera
- [x] Ajustar scroll para ser más conservador (solo mover lo mínimo necesario)
- [x] Testear con el escenario exacto del usuario
- [x] Solución: Sin buffer zone + scroll mínimo (displayTop + (cursorBottom - displayBottom))

## Entregable Final para Cliente

- [x] Eliminar toda la lógica de scroll automático (dejar solo scroll manual)
- [x] Limpiar comentarios innecesarios en todo el código
- [x] Crear documentación profesional en README.md
- [x] Preparar archivo .zip con todo el proyecto
- [x] Verificar que todo esté prolijo y listo para entregar

## Corrección de Cursor Pegado

- [x] El cursor se queda pegado en el último carácter correcto cuando hay un error
- [x] El cursor debe avanzar con cada tecla presionada, independientemente de errores
- [x] Cambiar currentPosition de lastCorrectIndex + 1 a userInput.length
- [x] Testear escribiendo con errores para verificar que el cursor avanza
