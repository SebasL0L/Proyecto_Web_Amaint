# Reglas de negocio — Amaint

| Campo | Detalle |
|---|---|
| Documento | Reglas de negocio |
| Fuente principal | Informe de Requisitos N.º 2, secciones 1.2, 3.1 y 5.1 |

## Propósito

Consolidar las restricciones operativas que deben respetarse al ejecutar los procesos de mantenimiento descritos para el caso Manufacturas Andina S.A. Las reglas se derivan de los requisitos funcionales y de los criterios de aceptación de las historias de usuario.

**Convenciones:**
- **Explícita:** aparece directamente en un requisito o criterio de aceptación.
- **Derivada:** resume una condición distribuida entre varios requisitos o historias.
- **Pendiente:** la fuente no determina todos los detalles necesarios para implementarla o probarla.

## Reglas de activos

| ID | Regla | Tipo | Origen / observación |
|---|---|---|---|
| BR-01 | Los activos se organizarán en la jerarquía Planta > Área > Línea > Máquina > Subconjunto/Componente. | Explícita | RF-7 y HU-01. |
| BR-02 | La jerarquía permitirá hasta cinco niveles, según el orden definido para el caso inicial. | Explícita | HU-01. |
| BR-03 | El código de un activo deberá ser único; el sistema validará que no exista previamente antes de registrar el activo. | Explícita | RF-7 y HU-01. |
| BR-04 | Al registrar un activo, el sistema generará un QR único asociado a ese activo, listo para impresión o descarga en PDF. | Explícita | HU-01. |
| BR-05 | Se podrán asociar componentes secundarios o subconjuntos a un activo principal. | Explícita | RF-7. |
| BR-06 | El ámbito de unicidad del código (por empresa, por planta o global en Amaint) debe definirse para la plataforma multiempresa. | Pendiente | El informe pide unicidad; no define su alcance en un sistema multiempresa. |

## Reglas de incidentes y fallas

| ID | Regla | Tipo | Origen / observación |
|---|---|---|---|
| BR-07 | Solo usuarios autorizados podrán registrar incidentes; RF-1 identifica a Operadores de Producción y Técnicos. | Explícita | RF-1. |
| BR-08 | Todo reporte deberá referenciar un activo existente. | Explícita | RF-1. |
| BR-09 | Cada reporte guardado recibirá un número correlativo único y comenzará en estado «Pendiente de Revisión». | Explícita | RF-1 y HU-03. |
| BR-10 | El reporte deberá identificar el tipo de anomalía y su nivel de severidad/impacto. | Explícita | RF-1 y HU-03. |
| BR-11 | Las categorías de anomalía enumeradas para HU-03 son ruido, vibración, sobrecalentamiento, fuga y detención. | Explícita | HU-03. |
| BR-12 | El reporte móvil podrá incluir hasta tres fotografías, con un máximo de 5 MB por fotografía; deben comprimirse. | Explícita | HU-03. |
| BR-13 | El catálogo final de categorías, severidades, niveles de impacto y su relación con la prioridad de atención debe definirse. | Pendiente | Los términos severidad, impacto y prioridad aparecen, pero no se proporciona su correspondencia ni catálogo completo. |

## Reglas de órdenes de trabajo

| ID | Regla | Tipo | Origen / observación |
|---|---|---|---|
| BR-14 | Las OT podrán ser preventivas o correctivas. | Explícita | RF-3. |
| BR-15 | La creación/programación de OT corresponde al Supervisor de Mantenimiento, según el caso inicial. | Explícita | RF-3 y HU-04. |
| BR-16 | Una OT deberá contemplar técnico(s) responsable(s), fecha límite, prioridad y checklist operacional. | Explícita | RF-3 y HU-04. |
| BR-17 | La asignación podrá incluir uno o más técnicos, filtrados por la especialidad que tengan registrada. | Explícita | HU-04. |
| BR-18 | Las solicitudes pendientes deberán poder filtrarse por área y severidad desde el panel de administración. | Explícita | HU-04. |
| BR-19 | La confirmación de una asignación generará una notificación push al técnico responsable. | Explícita | HU-04. |
| BR-20 | Para pasar una OT a «Concluida», deberán completarse todos los puntos obligatorios del checklist. | Explícita | RF-5 y HU-05. |
| BR-21 | El cierre requerirá registrar el tiempo real de inicio y término de la intervención/parada para calcular las horas-hombre utilizadas. | Explícita | HU-05. |
| BR-22 | El cierre solo podrá realizarse cuando los repuestos e insumos requeridos hayan sido validados o entregados por bodega. | Explícita | HU-05. |
| BR-23 | El catálogo completo de estados de OT, transiciones permitidas, reglas de reapertura y cancelación debe definirse. | Pendiente | El informe menciona estados iniciales y de cierre, pero no el ciclo de vida completo. |

## Reglas de inventario y repuestos

| ID | Regla | Tipo | Origen / observación |
|---|---|---|---|
| BR-24 | La salida de repuestos deberá vincularse obligatoriamente a una OT activa. | Explícita | HU-06. |
| BR-25 | El despacho deberá relacionar los materiales con el código del activo intervenido. | Explícita | HU-06 y OP-4 del backlog. |
| BR-26 | Al confirmar el despacho, el stock deberá actualizarse automáticamente e inmediatamente. | Explícita | RF-4, RF-10 y HU-06. |
| BR-27 | Si la cantidad solicitada supera el stock disponible, el sistema deberá advertir y bloquear la entrega excesiva. | Explícita | HU-06. |
| BR-28 | El sistema deberá emitir una alerta cuando el stock caiga por debajo del punto de reorden. | Explícita | RF-4. |
| BR-29 | El valor del punto de reorden, las unidades de medida, ajustes, devoluciones, anulaciones y reversas de movimientos deben definirse. | Pendiente | No se especifican valores ni tratamiento de estos movimientos. |

## Reglas de operación offline y sincronización

| ID | Regla | Tipo | Origen / observación |
|---|---|---|---|
| BR-30 | La aplicación móvil deberá permitir continuar el registro de formularios e imágenes cuando no exista conectividad. | Explícita | RF-9 y HU-07. |
| BR-31 | Al perder conectividad, la aplicación cambiará automáticamente a «Modo Offline». | Explícita | HU-07. |
| BR-32 | Los datos locales indicados en HU-07 se almacenarán cifrados con AES-256 en SQLite. | Explícita | HU-07. |
| BR-33 | Al recuperar conectividad Wi-Fi o móvil, los datos pendientes se sincronizarán automáticamente en segundo plano. | Explícita | RF-9 y HU-08. |
| BR-34 | Los reintentos ante cortes parciales no deberán generar registros duplicados. | Explícita | HU-08. |
| BR-35 | El comportamiento ante cambios concurrentes, conflictos, eliminación local, expiración de datos y fallas permanentes debe definirse. | Pendiente | La estimación menciona una tarea de resolución de conflictos, pero no establece la política funcional. |
| BR-36 | Debe definirse qué pantallas y operaciones estarán disponibles offline; HU-02 solo confirma la consulta de datos previamente almacenados en caché, y HU-07 confirma el almacenamiento de formularios e imágenes. | Pendiente | RF-9, HU-02 y HU-07. |

## Reglas de notificaciones e indicadores

| ID | Regla | Tipo | Origen / observación |
|---|---|---|---|
| BR-37 | Las alertas de incidencias deberán reflejar tres niveles de prioridad. | Explícita | RF-8. |
| BR-38 | Los eventos críticos y cambios en OT deberán generar notificaciones en la aplicación en tiempo real. | Explícita | RF-8. |
| BR-39 | La asignación confirmada de una OT deberá notificar al técnico asignado mediante push. | Explícita | HU-04. |
| BR-40 | Los indicadores contemplados incluyen MTBF, MTTR, disponibilidad operativa y costos de mantenimiento. | Explícita | RF-6, HU-09 y HU-10. |
| BR-41 | Los informes podrán filtrarse por rango de fechas y familias/tipos de activos; HU-09 añade planta y área. | Explícita | RF-6, HU-09. |
| BR-42 | El reporte ejecutivo de disponibilidad y costos podrá exportarse en PDF y Excel (CSV). | Explícita | HU-10. |
| BR-43 | Las fórmulas, unidades, reglas de exclusión, periodos de cálculo y fuentes de datos de cada KPI deben definirse. | Pendiente | El informe nombra indicadores, pero no define todas sus fórmulas operacionales. |

## Reglas de plataforma multiempresa

| ID | Regla | Tipo | Origen / observación |
|---|---|---|---|
| BR-44 | Amaint contempla múltiples organizaciones, cada una con usuarios, permisos, módulos y configuraciones propios. | Explícita a nivel de producto | README del repositorio. |
| BR-45 | La plataforma contará con administración central de organizaciones, solicitudes de adaptación, licencias y suscripciones. | Explícita a nivel de producto | README del repositorio. |
| BR-46 | Los datos y permisos de una organización no deben confundirse con los de otra; el mecanismo y las excepciones de acceso deben especificarse. | Pendiente de formalización | Consecuencia necesaria del modelo multiempresa; el README no define aún la política técnica o de autorización. |
| BR-47 | Debe definirse si todas las funciones del caso Manufacturas Andina estarán disponibles en todos los planes y organizaciones. | Pendiente | La visión contempla configuración por empresa y el informe un caso inicial. |

## Exclusiones del alcance inicial

| ID | Exclusión | Fuente |
|---|---|---|
| BR-48 | Amaint no sustituirá el sistema contable ni ejecutará contabilidad general o facturación. Su ámbito financiero se limita a costos de mantenimiento y consumo de repuestos para fines operativos. | Informe, página 5. |
| BR-49 | La analítica inicial no incluirá algoritmos de mantenimiento predictivo mediante IA; se basa en datos históricos e indicadores estándar como MTBF y MTTR. | Informe, página 5. |
| BR-50 | La información oficial de mantenimiento deberá centralizarse en Amaint, evitando que las bitácoras físicas o archivos locales independientes sean la fuente paralela de seguimiento. | Informe, página 5. |
