# Historias de usuario — Amaint

| Campo | Detalle |
|---|---|
| Documento | Historias de usuario |
| Versión | 0.1 |
| Estado | Borrador para revisión y validación |
| Fuente principal | Informe de Requisitos N.º 2, sección 5.1, páginas 14–18 |

## Propósito

Conservar las historias de usuario definidas para el caso Manufacturas Andina S.A., manteniendo sus identificadores, épicas y criterios de aceptación. Estas historias complementan los requisitos funcionales RF-1 a RF-10.

## Épica 1 — Gestión de catálogo y ficha de activos industriales

**Propósito:** organizar, codificar y consultar la información de la maquinaria de forma rápida y centralizada en terreno.

### HU-01 — Registro de estructura jerárquica y codificación única

**Historia:** Como Supervisor de Mantenimiento, quiero registrar y categorizar cada equipo dentro de una estructura jerárquica (Planta > Área > Línea > Máquina > Subconjunto) asignando un código único e irrepetible, para eliminar la duplicidad de datos y facilitar la localización de los activos en la planta.

**Criterios de aceptación:**
1. El sistema deberá validar en tiempo real que el código ingresado no exista previamente en la base de datos (clave única).
2. Deberá permitir seleccionar una jerarquía de hasta cinco niveles: Planta, Área, Línea, Maquinaria y Componente/Subconjunto.
3. Al registrar el activo, el sistema deberá generar automáticamente un código QR único listo para impresión o descarga en formato PDF.

**Requisito relacionado:** RF-7. **Prioridad:** 1. **Sprint estimado:** Sprint 1. **Estimación:** M / 8 SP.

### HU-02 — Consulta de ficha técnica e historial del activo (hoja de vida)

**Historia:** Como Técnico de Mantenimiento, quiero escanear el código QR o buscar un activo desde la app móvil para consultar su ficha técnica, historial de fallas y manuales, para evitar la consulta a terceros y agilizar el diagnóstico en terreno.

**Criterios de aceptación:**
1. Al escanear el código QR o ingresar la clave del activo, la app deberá desplegar la ficha técnica en un tiempo menor a 500 ms en red local.
2. La vista deberá mostrar datos del fabricante, manuales adjuntos (PDF), historial de las últimas OT ejecutadas y componentes/repuestos habitualmente consumidos.
3. Si la app se encuentra sin conexión a internet, deberá mostrar los datos previamente almacenados en caché en la base de datos local del dispositivo móvil.

**Requisito relacionado:** RF-2. **Prioridad:** 2. **Sprint estimado:** Sprint 1. **Estimación:** S / 5 SP.

> **Pendiente:** el objetivo de 500 ms de esta historia difiere del criterio de 1,5 s indicado en RF-2 y del RNF-1. Debe aclararse el alcance de cada medición.

## Épica 2 — Gestión de incidentes y órdenes de trabajo (OT)

**Propósito:** formalizar la comunicación de fallas, eliminar los avisos informales y coordinar las reparaciones preventivas y correctivas.

### HU-03 — Reporte formal de fallas y anomalías operativas

**Historia:** Como Operador de Producción, quiero registrar un reporte de falla seleccionando la máquina, tipo de anomalía y adjuntando fotografías desde el dispositivo móvil, para formalizar el aviso al área de mantenimiento y evitar la pérdida de antecedentes en canales informales.

**Criterios de aceptación:**
1. El formulario deberá requerir obligatoriamente el activo afectado, el tipo de anomalía (ruido, vibración, sobrecalentamiento, fuga, detención) y el nivel de impacto percibido.
2. Deberá permitir adjuntar hasta tres fotografías directamente desde la cámara o galería del teléfono móvil. Cada fotografía tendrá un tamaño máximo de 5 MB y deberá comprimirse.
3. Una vez guardado el reporte, deberá generarse un número correlativo único de solicitud e informarse el estado actual («Pendiente de Revisión»).

**Requisito relacionado:** RF-1. **Prioridad:** 3. **Sprint estimado:** Sprint 1. **Estimación:** M / 7 SP.

### HU-04 — Planificación, priorización y asignación de OT

**Historia:** Como Supervisor de Mantenimiento, quiero convertir reportes en Órdenes de Trabajo, asignando prioridad, fecha límite y especialidad técnica (mecánica, eléctrica, hidráulica), para optimizar el uso del personal y atender con urgencia los equipos críticos.

**Criterios de aceptación:**
1. El panel de administración deberá mostrar las solicitudes pendientes, filtrables por área y severidad.
2. Al crear la OT, el supervisor deberá poder asignar uno o más técnicos filtrados por su especialidad registrada.
3. Al confirmar la asignación, se deberá enviar una notificación push automática e inmediata a la app móvil del técnico responsable.

**Requisitos relacionados:** RF-3 y RF-8. **Prioridad:** 6. **Sprint estimado:** Sprint 2. **Estimación:** M / 8 SP.

### HU-05 — Cierre de OT y registro de ejecución

**Historia:** Como Técnico de Mantenimiento, quiero registrar el tiempo de trabajo realizado, las acciones ejecutadas y el checklist cumplido al finalizar una intervención, para cerrar formalmente la OT y mantener la trazabilidad de la mantención.

**Criterios de aceptación:**
1. Para cerrar una OT, el técnico deberá haber marcado el 100% de los puntos obligatorios de la lista de chequeo operacional asociada.
2. El sistema deberá solicitar el registro de horas-hombre utilizadas (tiempo de inicio y tiempo de término real de la parada/intervención).
3. La OT solo podrá cerrarse si los repuestos e insumos requeridos han sido previamente validados o entregados por bodega.

**Requisitos relacionados:** RF-5 y RF-4/RF-10 en lo relativo a la validación de repuestos. **Prioridad:** 7. **Sprint estimado:** Sprint 3. **Estimación:** M / 5 SP.

## Épica 3 — Control de inventario y repuestos

**Propósito:** asociar de forma exacta los insumos consumidos con las máquinas e intervenciones que los originaron.

### HU-06 — Imputación de repuestos y descuento de stock

**Historia:** Como Encargado de Bodega, quiero registrar el despacho de materiales e insumos vinculándolos al número de OT y código de activo, para mantener actualizado el inventario en tiempo real y costear adecuadamente las mantenciones.

**Criterios de aceptación:**
1. El sistema deberá solicitar obligatoriamente el número de una OT activa para autorizar la salida de repuestos en el módulo de bodega.
2. Al confirmar el despacho, el stock de bodega deberá actualizarse automáticamente de forma inmediata.
3. Si la cantidad solicitada supera el stock disponible en bodega, el sistema deberá desplegar una alerta de advertencia y bloquear la entrega excesiva.

**Requisitos relacionados:** RF-4 y RF-10. **Prioridad:** 8. **Sprint estimado:** Sprint 3. **Estimación:** S / 5 SP.

## Épica 4 — Continuidad operativa y gestión gerencial

**Propósito:** garantizar la operatividad en zonas de baja cobertura y proporcionar analítica para la toma de decisiones.

### HU-07 — Almacenamiento local offline en terreno

**Historia:** Como Técnico de Mantenimiento, quiero que la app móvil guarde localmente los formularios e imágenes ingresadas cuando no haya señal de red, para continuar trabajando e inspeccionando sin interrupciones.

**Criterios de aceptación:**
1. Al perder la red, la app deberá cambiar automáticamente a «Modo Offline» de manera transparente para el usuario.
2. Los datos ingresados deberán almacenarse cifrados (AES-256) en la base de datos local SQLite del dispositivo móvil.

**Requisito relacionado:** RF-9. **Prioridad:** 4. **Sprint estimado:** Sprint 2. **Estimación:** M / 8 SP.

### HU-08 — Motor de sincronización automática

**Historia:** Como Técnico de Mantenimiento, quiero que la app envíe automáticamente los datos guardados localmente al servidor cuando se recupere la conectividad, para asegurar la actualización centralizada de la información.

**Criterios de aceptación:**
1. La sincronización en segundo plano deberá ejecutarse en un tiempo menor a cinco segundos al detectar red Wi-Fi o móvil.
2. Deberá implementarse un algoritmo de reintento en caso de caídas parciales de señal, sin duplicación de registros.

**Requisito relacionado:** RF-9. **Prioridad:** 5. **Sprint estimado:** Sprint 2. **Estimación:** M / 8 SP.

### HU-09 — Dashboard de KPIs de tiempos (MTBF / MTTR)

**Historia:** Como Jefe de Planta, quiero visualizar los indicadores MTBF y MTTR filtrables por fechas y familias de activos, para evaluar la confiabilidad de las máquinas e identificar equipos críticos.

**Criterios de aceptación:**
1. El sistema deberá calcular y desplegar automáticamente el Tiempo Medio Entre Fallas (MTBF) y el Tiempo Medio de Reparación (MTTR).
2. Deberá permitir filtros dinámicos por rango de fechas, planta, área y tipo de máquina (extrusora, inyectora, caldera, etc.).

**Requisito relacionado:** RF-6. **Prioridad:** 9. **Sprint estimado:** Sprint 3. **Estimación:** M / 6 SP.

### HU-10 — Reporte de costos y disponibilidad operativa

**Historia:** Como Jefe de Planta, quiero consultar el porcentaje de disponibilidad operativa y los costos de repuestos acumulados por equipo, para decidir sobre reparaciones mayores o reemplazo de maquinaria.

**Criterios de aceptación:**
1. El sistema deberá presentar gráficos consolidados de disponibilidad operativa (%) respecto a horas planificadas y costo total de mantenimiento por activo.
2. Deberá ofrecer la opción de exportar el reporte ejecutivo consolidado en formatos PDF y Excel (CSV).

**Requisito relacionado:** RF-6. **Prioridad:** 10. **Sprint estimado:** Sprint 3. **Estimación:** S / 4 SP.

## Notas de validación

1. Las historias reflejan el caso inicial de Manufacturas Andina S.A. No se debe asumir que todos sus detalles aplican a todos los clientes o planes de Amaint.
2. La estimación y el sprint son los propuestos por el informe; deben tratarse como planificación de referencia, no como compromiso vigente si el equipo ha modificado el backlog.
3. Las historias deberán revisarse frente a los requisitos funcionales y la matriz de trazabilidad antes de considerarse listas para desarrollo.

## Fuente

Informe de Requisitos N.º 2, sección 5.1, páginas 14–18; sección 7.1, páginas 21–22.
