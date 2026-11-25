# Matriz de trazabilidad — Amaint

| Campo | Detalle |
|---|---|
| Documento | Matriz de trazabilidad de requisitos |
| Fuentes | Informe de Requisitos N.º 2 y documentación de visión del repositorio |

## Propósito

Relacionar los requisitos funcionales (RF), las historias de usuario (HU), los requisitos no funcionales (RNF) y los objetivos del producto (OP). La matriz permite detectar funcionalidades sin historia asociada, historias sin requisito funcional y atributos de calidad que deben verificarse transversalmente.

## Requisitos funcionales ↔ historias ↔ objetivos

| Requisito | Historias relacionadas | Objetivo(s) | Comentario de trazabilidad |
|---|---|---|---|
| RF-1 Registro de incidentes y fallas | HU-03 | OP-3 | HU-03 detalla campos requeridos, tipos de anomalía, fotografías, folio y estado inicial. |
| RF-2 Consulta de hoja de vida e historial | HU-02 | OP-1 | HU-02 añade lectura QR, datos mostrados y consulta offline de datos cacheados. Umbral temporal inconsistente por validar. |
| RF-3 Programación de OT | HU-04 | OP-3 | HU-04 detalla filtros, especialidad, asignación de uno o más técnicos y notificación push. |
| RF-4 Control y asignación de repuestos | HU-06; HU-05 (condición de cierre) | OP-4; OP-3 | HU-06 detalla despacho contra OT activa, actualización de stock y bloqueo por falta de existencias. HU-05 exige validar/entregar repuestos antes del cierre. |
| RF-5 Cierre y reporte de ejecución | HU-05 | OP-3 | HU-05 detalla checklist completo, registro de horas-hombre y validación de repuestos. |
| RF-6 Generación de KPIs | HU-09; HU-10 | OP-4 | HU-09 define MTBF/MTTR y filtros; HU-10 define disponibilidad, costos y exportación. |
| RF-7 Gestión de códigos y jerarquía | HU-01 | OP-1 | HU-01 define hasta cinco niveles, validación de unicidad y generación de QR PDF. |
| RF-8 Notificaciones y alertas | HU-04 | OP-2; OP-3 | HU-04 cubre notificación push por asignación; falta catálogo de eventos y niveles de prioridad. |
| RF-9 Modo offline y sincronización | HU-02; HU-07; HU-08 | OP-2 | HU-02 define consulta de datos cacheados; HU-07 almacenamiento offline; HU-08 sincronización y reintentos sin duplicados. |
| RF-10 Gestión y actualización de inventario | HU-06 | OP-4 | HU-06 especifica despacho asociado a OT y activo y actualización inmediata del stock. |

## Requisitos no funcionales ↔ verificación

| RNF | Historias/requisitos afectados | Evidencia de verificación prevista |
|---|---|---|
| RNF-1 Tiempo de respuesta | RF-2, HU-02; consultas de catálogo e historial | Prueba de rendimiento de consultas; resolver previamente 500 ms vs 1,5 s. |
| RNF-2 Concurrencia | Plataforma y módulos generales | Prueba de carga con al menos 50 usuarios concurrentes. |
| RNF-3 Sincronización | RF-9, HU-08 | Medición de sincronización bajo cinco segundos al recuperar conexión. |
| RNF-4 Control de acceso | Todos los módulos; perfiles documentados | Pruebas RBAC de permisos permitidos y denegados. |
| RNF-5 Auditoría | OT e inventario, especialmente RF-3 a RF-5 y RF-10 | Verificar logs ante creación, modificación y eliminación de OT y stock. |
| RNF-6 Encriptación | Acceso y almacenamiento de credenciales; RF-9/HU-07 para datos locales | Revisión de TLS 1.3 y definición/validación del cifrado AES-256. |
| RNF-7 Usabilidad | Interfaz web/móvil; especialmente HU-02, HU-03, HU-05, HU-07 | Pruebas responsive y evaluación de contraste en contexto industrial. |
| RNF-8 Disponibilidad | Plataforma completa | Medición de uptime mensual dentro del horario operativo acordado. |

## Cobertura de historias

| Historia | Requisito(s) funcional(es) | ¿Tiene criterios de aceptación en la fuente? |
|---|---|---|
| HU-01 | RF-7 | Sí |
| HU-02 | RF-2 | Sí; presenta discrepancia de tiempo a validar |
| HU-03 | RF-1 | Sí |
| HU-04 | RF-3, RF-8 | Sí |
| HU-05 | RF-5 (y condición de repuestos de RF-4/RF-10) | Sí |
| HU-06 | RF-4, RF-10 | Sí |
| HU-07 | RF-9 | Sí |
| HU-08 | RF-9 | Sí |
| HU-09 | RF-6 | Sí |
| HU-10 | RF-6 | Sí |

## Trazabilidad a la visión

| Objetivo de visión | Requisitos relacionados |
|---|---|
| Centralizar información técnica de activos e historial | RF-2, RF-7; HU-01, HU-02 |
| Digitalizar fallas e intervenciones | RF-1, RF-5, RF-8; HU-03, HU-05 |
| Coordinar órdenes de mantenimiento | RF-3, RF-5; HU-04, HU-05 |
| Vincular repuestos y costos a intervenciones | RF-4, RF-6, RF-10; HU-06, HU-10 |
| Facilitar trabajo en terreno con conectividad limitada | RF-9; HU-02, HU-07, HU-08 |
| Proporcionar información para decisiones | RF-6; HU-09, HU-10 |
| Operar como plataforma multiempresa configurable | README del repositorio; detalles transversales pendientes de formalización en RF/RNF |

## Brechas y validaciones pendientes detectadas

1. **Multiempresa:** el README define organizaciones con usuarios, permisos, módulos y configuraciones propios, pero el informe funcional se concentra en una empresa. Faltan requisitos explícitos sobre aislamiento de datos, administración de organizaciones y configuración modular.
2. **Accesos:** existen perfiles y RBAC, pero falta una matriz aprobada que asigne permisos específicos por operación y alcance de datos.
3. **Rendimiento de consulta:** RF-2 especifica 1,5 s; HU-02 especifica 500 ms; RNF-1 establece que el 95% de las consultas debe ser inferior a 1,5 s.
4. **Offline:** falta delimitar las funciones exactas que pueden ejecutarse sin conexión y la política de resolución de conflictos.
5. **Seguridad:** debe aclararse el alcance de «AES-256 para credenciales almacenadas», la protección de la base local y la gestión de claves.
6. **Estados y prioridades:** faltan el flujo completo de estados de OT, el catálogo de tres niveles de prioridad y la relación entre severidad e impacto.
7. **Indicadores:** deben definirse fórmulas, unidades, periodos y reglas de cálculo de MTBF, MTTR, disponibilidad y costos.
8. **Inventario:** faltan los parámetros del punto de reorden y las reglas de recepción, ajustes, devoluciones y reversas.
9. **Notificaciones:** faltan la lista de eventos, destinatarios por evento, canales y condiciones de reintento/confirmación.
10. **Criterios no funcionales:** algunos atributos necesitan condiciones de prueba más precisas: concurrencia, disponibilidad mensual, contraste y rendimiento.
