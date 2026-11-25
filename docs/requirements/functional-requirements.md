# Requisitos funcionales — Amaint

| Campo | Detalle |
|---|---|
| Documento | Requisitos funcionales |
| Fuente principal | Informe de Requisitos N.º 2, sección 3.1, páginas 11–12 |

## Propósito

Definir los servicios y comportamientos que Amaint debe ofrecer para el caso inicial de Manufacturas Andina S.A. Se conservan los identificadores RF-1 a RF-10 del informe.

## RF-1 — Registro de incidentes y fallas

**Descripción:** El sistema deberá permitir a los usuarios autorizados —Operadores de Producción y Técnicos— registrar incidentes operacionales seleccionando el código del activo, la categoría de la anomalía, el nivel de severidad y adjuntando evidencia fotográfica.

**Criterio de aceptación del informe:** el sistema validará la existencia del activo, asignará un número correlativo único de solicitud y establecerá el estado inicial como **«Pendiente de Revisión»**.

**Detalle complementario de HU-03:** el formulario requiere activo afectado, tipo de anomalía y nivel de impacto percibido. Las categorías indicadas son ruido, vibración, sobrecalentamiento, fuga y detención. Se permite adjuntar hasta tres fotografías desde la cámara o galería del móvil, con un máximo de 5 MB por fotografía; las imágenes deben comprimirse. Al guardar, se genera un número correlativo único y se informa el estado «Pendiente de Revisión».

**Historia relacionada:** HU-03. **Prioridad del backlog:** 3.

## RF-2 — Consulta de hoja de vida e historial del activo

**Descripción:** El sistema permitirá consultar el historial técnico de cada activo por medio de su código único, para analizar la frecuencia de fallas, los repuestos utilizados y el área involucrada.

**Criterio de aceptación del informe:** la consulta debe responder en menos de **1,5 segundos en red local** y mostrar datos del fabricante, manuales adjuntos, historial de órdenes de trabajo (OT) y repuestos consumidos habituales.

**Detalle complementario de HU-02:** el técnico podrá escanear el QR o buscar el activo desde la aplicación móvil. La vista mostrará datos del fabricante, manuales adjuntos en PDF, las últimas OT ejecutadas y componentes/repuestos habitualmente consumidos. Sin conexión, mostrará los datos previamente almacenados en caché en la base local del dispositivo. HU-02 establece un tiempo menor a **500 ms en red local**.

**Historia relacionada:** HU-02. **Prioridad del backlog:** 2.

## RF-3 — Programación de órdenes de trabajo (OT)

**Descripción:** El sistema deberá permitir al Supervisor de Mantenimiento generar, calendarizar y asignar OT preventivas y correctivas a técnicos según su especialidad.

**Criterio de aceptación del informe:** debe permitir asignar un técnico responsable, fecha límite, prioridad y lista de chequeo operacional.

**Detalle complementario de HU-04:** el panel de administración mostrará las solicitudes pendientes y permitirá filtrarlas por área y severidad. Al crear una OT, el supervisor podrá asignar uno o más técnicos filtrados por su especialidad registrada. Al confirmar la asignación, se enviará una notificación push automática e inmediata a la aplicación móvil del técnico responsable.

**Historia relacionada:** HU-04. **Prioridad del backlog:** 6.

## RF-4 — Control y asignación de repuestos

**Descripción:** El sistema deberá asociar los repuestos e insumos requeridos a una OT activa, verificando su disponibilidad en el inventario de bodega.

**Criterio de aceptación del informe:** el sistema descontará automáticamente el stock disponible y generará alertas si el inventario cae por debajo del punto de reorden.

**Detalle complementario de HU-06:** para autorizar una salida de repuestos en el módulo de bodega, se solicitará obligatoriamente el número de una OT activa. El despacho confirmado actualizará inmediatamente el stock. Si la cantidad solicitada supera el stock disponible, el sistema mostrará una advertencia y bloqueará la entrega excesiva.

**Historias relacionadas:** HU-06 y, para las condiciones de cierre de OT, HU-05. **Prioridad de HU-06:** 8.

## RF-5 — Cierre y reporte de ejecución de OT

**Descripción:** El sistema deberá gestionar el proceso de cierre formal de una OT por parte del Personal Técnico.

**Criterio de aceptación del informe:** el sistema validará que la lista de chequeo esté completa antes de cambiar el estado de la OT a **«Concluida»**.

**Detalle complementario de HU-05:** para cerrar una OT, el técnico deberá marcar el 100% de los puntos obligatorios del checklist, registrar las horas-hombre utilizadas mediante el tiempo real de inicio y término de la parada/intervención, y contar con la validación o entrega previa de los repuestos e insumos requeridos por bodega.

**Historia relacionada:** HU-05. **Prioridad del backlog:** 7.

## RF-6 — Generación de indicadores de mantenimiento (KPIs)

**Descripción:** El sistema deberá calcular y consolidar automáticamente indicadores clave de rendimiento operativo: MTBF, MTTR, disponibilidad operativa y costos.

**Criterio de aceptación del informe:** los reportes deberán ser desplegables dinámicamente y filtrables por rango de fechas y familias de activos.

**Detalle complementario de HU-09 y HU-10:** el jefe de planta podrá consultar MTBF y MTTR con filtros por rango de fechas, planta, área y tipo de máquina. También podrá visualizar gráficos de disponibilidad operativa respecto de horas planificadas y costo total de mantenimiento por activo, y exportar un reporte ejecutivo en PDF y Excel (CSV).

**Historias relacionadas:** HU-09 y HU-10. **Prioridades del backlog:** 9 y 10.

## RF-7 — Gestión de códigos de activos y jerarquía

**Descripción:** El sistema deberá administrar la jerarquía de activos **Planta > Área > Línea > Máquina > Subconjunto** para garantizar una codificación única e irrepetible.

**Criterio de aceptación del informe:** el sistema validará que no existan códigos duplicados y permitirá asociar componentes secundarios o subconjuntos a un activo principal.

**Detalle complementario de HU-01:** se permitirá seleccionar una jerarquía de hasta cinco niveles. Al registrar un activo, el sistema generará automáticamente un código QR único, listo para impresión o descarga en PDF. El código ingresado deberá validarse en tiempo real contra los códigos previamente registrados.

**Historia relacionada:** HU-01. **Prioridad del backlog:** 1.

## RF-8 — Notificaciones y alertas en tiempo real

**Descripción:** El sistema deberá emitir notificaciones en tiempo real ante eventos críticos o cambios en las OT.

**Criterio de aceptación del informe:** las alertas deberán enviarse de forma inmediata dentro de la aplicación y reflejar el nivel de prioridad de la incidencia con **tres niveles**.

**Detalle complementario de HU-04:** al confirmar la asignación de una OT, se enviará una notificación push automática e inmediata a la aplicación móvil del técnico responsable.

**Historia relacionada:** HU-04. **Prioridad de HU-04:** 6.

## RF-9 — Modo offline y sincronización local

**Descripción:** El sistema deberá garantizar el funcionamiento de la aplicación móvil en zonas sin cobertura de red.

**Criterio de aceptación del informe:** la aplicación almacenará la información localmente en una base de datos embebida y la sincronizará automáticamente con el servidor central al detectar conectividad, sin pérdida de datos.

**Detalle complementario de HU-07 y HU-08:** al perder la red, la aplicación cambiará automáticamente a «Modo Offline». Formularios e imágenes se guardarán cifrados con AES-256 en una base de datos local SQLite del dispositivo. Al recuperar conectividad Wi-Fi o móvil, la sincronización se ejecutará en segundo plano en menos de cinco segundos. El mecanismo de reintento deberá tolerar caídas parciales de señal sin duplicar registros.

**Historias relacionadas:** HU-07 y HU-08. **Prioridades del backlog:** 4 y 5.

## RF-10 — Gestión y actualización del inventario de repuestos en bodega

**Descripción:** El sistema deberá permitir al Encargado de Bodega registrar la salida física y entrega de materiales asociados a una OT.

**Criterio de aceptación del informe:** el inventario de bodega se actualizará en tiempo real cada vez que una OT se ejecute con consumo de materiales asociado.

**Detalle complementario de HU-06:** el despacho debe vincularse obligatoriamente a una OT activa y al código del activo, actualizar el stock inmediatamente y bloquear la entrega de una cantidad superior a la disponible.

**Historia relacionada:** HU-06. **Prioridad del backlog:** 8.

## Consideraciones generales

1. Los requisitos RF-1 a RF-10 corresponden al alcance funcional del caso Manufacturas Andina S.A.; su aplicabilidad a todos los planes o tipos de organización de Amaint debe validarse.
2. Las historias de usuario aportan criterios de aceptación más detallados que complementan los criterios generales de RF.
3. Las decisiones técnicas —por ejemplo, tecnología concreta para notificaciones o diseño de API— no forman parte de este documento. La mención de SQLite en HU-07 sí se conserva porque aparece expresamente en el criterio de aceptación de origen.

## Fuente

Informe de Requisitos N.º 2, sección 3.1 (PDF, páginas 11–12) y sección 5.1 (PDF, páginas 14–18).
