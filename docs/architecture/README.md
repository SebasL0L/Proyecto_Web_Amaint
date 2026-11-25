# Arquitectura de software — Amaint

| Campo | Detalle |
|---|---|
| Documento | Índice de arquitectura |
| Base | Código del repositorio, `docs/vision/` y `docs/requirements/` |

## Propósito

Describir la arquitectura actual observable de Amaint y proponer una arquitectura objetivo que permita implementar los requisitos funcionales y no funcionales. Esta documentación no declara que las piezas propuestas ya estén implementadas.

## Documentos

| Documento | Propósito |
|---|---|
| [Arquitectura general](system-architecture.md) | Contexto, componentes, límites, flujos y principios globales. |
| [Arquitectura frontend](frontend-architecture.md) | Organización de React, estado, consumo de API y estrategia offline. |
| [Arquitectura backend](backend-architecture.md) | Organización de Spring Boot, capas, módulos, seguridad y transacciones. |
| [Arquitectura de datos](database-architecture.md) | PostgreSQL, modelo conceptual, multiempresa, integridad y migraciones. |
| [Contrato de API](api-contract.md) | Endpoints existentes, convenciones y recursos propuestos. |
| [ADR-001: multiempresa](decisions/ADR-001-multi-tenancy.md) | Alternativas para aislar los datos de cada organización. |
| [ADR-002: plataforma de datos](decisions/ADR-002-database-platform.md) | Responsabilidad de Spring Boot, PostgreSQL y Supabase. |
| [ADR-003: cliente móvil y operación offline](decisions/ADR-003-offline-client.md) | Definición pendiente de cliente y almacenamiento local. |

## Cómo leer esta documentación

Se usan las siguientes etiquetas para no confundir el estado real con el diseño propuesto:

- **Implementado:** se encuentra respaldado por código o configuración del repositorio revisado.
- **Propuesto:** recomendación arquitectónica para la siguiente etapa; necesita validación del equipo.
- **Pendiente:** la fuente no permite cerrar la decisión o faltan requisitos.

Los requisitos se referencian mediante sus identificadores `RF`, `RNF`, `HU` y `BR`. Para el detalle normativo se debe consultar `../requirements/`.

## Criterios arquitectónicos iniciales

1. Mantener React como cliente y Spring Boot como backend de aplicación/API.
2. Mantener PostgreSQL como motor relacional de persistencia.
3. Favorecer inicialmente un **monolito modular** en Spring Boot en lugar de distribuir prematuramente el sistema en microservicios.
4. Hacer que el backend sea la frontera de acceso a los datos y el lugar de aplicación de las reglas de negocio y permisos.
5. Diseñar el aislamiento multiempresa como una propiedad transversal, no como un filtro visual del frontend.
6. Separar la operación online de la persistencia local y sincronización offline.
7. No cerrar decisiones de autenticación, proveedor de base de datos, cliente móvil ni estrategia de conflictos sin validación explícita.

## Estado y mantenimiento

La arquitectura objetivo debe actualizarse cuando se aprueben decisiones, cambien los requisitos o se modifique el código. Toda decisión estructural relevante debe registrarse en `decisions/` con contexto, alternativas, estado y consecuencias.
