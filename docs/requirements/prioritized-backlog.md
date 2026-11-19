# Product Backlog priorizado — Amaint

| Campo | Detalle |
|---|---|
| Documento | Product Backlog priorizado y refinado |
| Fuente principal | Informe de Requisitos N.º 2, secciones 6 y 7, páginas 19–22 |

## Objetivos del producto

El informe define cuatro objetivos para el CMMS Amaint:

| ID | Objetivo | Descripción |
|---|---|---|
| OP-1 | Centralización y gobernanza | Centralizar en una plataforma CMMS la información técnica, historiales de mantenimiento y catálogos de activos, eliminando la dependencia de bitácoras en papel y hojas de cálculo informales. |
| OP-2 | Movilidad y operación offline | Proporcionar una aplicación móvil que permita a técnicos y operadores capturar anomalías y ejecutar listas de chequeo en terreno, incluso en zonas sin cobertura. |
| OP-3 | Efectividad y continuidad operativa | Reducir los tiempos imprevistos de detención mediante programación de mantenimiento preventivo y asignación de OT por especialidad. |
| OP-4 | Control de costos y decisiones gerenciales | Visibilizar la relación entre consumo de repuestos y activos intervenidos para calcular costos de mantención e indicadores como MTBF/MTTR. |

## Priorización inicial

El informe indica que la priorización pondera el valor de negocio (impacto en la continuidad operacional) y las dependencias técnicas, considerando que la jerarquía de activos es base para otros módulos.

| Prioridad | Historia | Título | Objetivo | Valor de negocio | Riesgo técnico |
|---:|---|---|---|---|---|
| 1 | HU-01 | Registro de estructura jerárquica y codificación única | OP-1 | Alto (base) | Medio |
| 2 | HU-02 | Consulta de ficha técnica e historial del activo | OP-1 | Alto | Bajo |
| 3 | HU-03 | Reporte formal de fallas y anomalías operativas | OP-3 | Alto | Medio |
| 4 | HU-07 | Almacenamiento local offline en terreno | OP-2 | Muy alto | Alto |
| 5 | HU-08 | Motor de sincronización automática | OP-2 | Muy alto | Muy alto |
| 6 | HU-04 | Planificación, priorización y asignación de OT | OP-3 | Alto | Medio |
| 7 | HU-05 | Cierre de OT y registro de ejecución | OP-3 | Medio-alto | Medio |
| 8 | HU-06 | Imputación de repuestos y descuento de stock | OP-4 | Medio-alto | Bajo |
| 9 | HU-09 | Dashboard de KPIs de tiempos (MTBF / MTTR) | OP-4 | Alto (gerencial) | Alto |
| 10 | HU-10 | Reporte de costos y disponibilidad operativa | OP-4 | Alto (gerencial) | Medio |

## Refinamiento y planificación de referencia

| Prioridad | Historia | Talla T-Shirt | Sprint estimado | Story Points |
|---:|---|---:|---:|---:|
| 1 | HU-01 | M | Sprint 1 | 8 |
| 2 | HU-02 | S | Sprint 1 | 5 |
| 3 | HU-03 | M | Sprint 1 | 7 |
| 4 | HU-07 | M | Sprint 2 | 8 |
| 5 | HU-08 | M | Sprint 2 | 8 |
| 6 | HU-04 | M | Sprint 2 | 8 |
| 7 | HU-05 | M | Sprint 3 | 5 |
| 8 | HU-06 | S | Sprint 3 | 5 |
| 9 | HU-09 | M | Sprint 3 | 6 |
| 10 | HU-10 | S | Sprint 3 | 4 |

### Resumen estimado por sprint

| Sprint | Historias | Story Points | Horas estimadas |
|---|---|---:|---:|
| Sprint 1 — Fundamentos y registro en terreno | HU-01, HU-02, HU-03 | 20 | 66 |
| Sprint 2 — Gestión de OT y módulo offline | HU-04, HU-07, HU-08 | 24 | 88 |
| Sprint 3 — Cierre, inventario y analítica gerencial | HU-05, HU-06, HU-09, HU-10 | 20 | 74 |
| **Total** | **10 historias** | **64** | **228** |

## Definition of Done (DoD) de origen

El informe establece que una historia se considera terminada y lista para producción solo cuando cumple todos estos criterios:

1. **Criterios de aceptación:** satisface el 100% de los criterios y reglas de negocio especificados por el Product Owner.
2. **Revisión de código:** al menos un desarrollador revisa y aprueba el código mediante Pull Request, siguiendo estándares de arquitectura y codificación.
3. **Pruebas de software:** se ejecutan satisfactoriamente pruebas unitarias e integrales, verificando el funcionamiento online y offline.
4. **Cumplimiento de RNF:** se verifican tiempos de respuesta inferiores a 1,5 s, seguridad RBAC, cifrado AES-256/TLS 1.3 y contraste adaptativo para entornos industriales.
5. **Aprobación del Product Owner:** la funcionalidad se demuestra en Sprint Review y recibe aprobación formal del Product Owner.

## Consideraciones de mantenimiento

- Este documento conserva la priorización, la estimación y los sprints propuestos en el informe académico. No confirma que esa planificación siga siendo la planificación activa del repositorio.
- Cualquier cambio de prioridad o alcance debe ser aprobado por el Product Owner y reflejado en este archivo, las historias de usuario y la matriz de trazabilidad.
- La historia HU-02 contiene un criterio de 500 ms, mientras RF-2/RNF-1 establecen un umbral de 1,5 s. La discrepancia debe resolverse antes de fijar pruebas de aceptación.
- La suma de puntos y horas coincide con el resumen del informe: 64 SP y 228 horas.

## Fuente

Informe de Requisitos N.º 2, sección 6.1 y páginas 19–20 para objetivos y priorización; sección 7.1 y páginas 21–22 para refinamiento; sección 6 para Definition of Done.
