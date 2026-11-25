# Requisitos del producto — Amaint

| Campo | Detalle |
|---|---|
| Producto | Amaint |
| Documento | Índice de requisitos del producto |
| Fecha | 19 de noviembre de 2026 |
| Documento relacionado | [`../vision/product-vision.md`](../vision/product-vision.md) |

## Propósito

Esta carpeta transforma la visión de Amaint y el análisis del caso Manufacturas Andina S.A. en requisitos que puedan revisarse, priorizarse, implementarse y verificarse. Los documentos mantienen los identificadores RF, RNF y HU del informe de origen para facilitar la trazabilidad.

Los requisitos funcionales y no funcionales aquí transcritos reflejan el contenido del informe. Las reglas de negocio reúnen restricciones que se desprenden de esos requisitos e historias de usuario. Cuando una regla es una interpretación o necesita una decisión adicional, se señala explícitamente como pendiente de validación.

## Documentos

| Documento | Contenido |
|---|---|
| [`functional-requirements.md`](functional-requirements.md) | Los diez requisitos funcionales RF-1 a RF-10 y sus criterios de aceptación de nivel general. |
| [`non-functional-requirements.md`](non-functional-requirements.md) | Los ocho requisitos no funcionales RNF-1 a RNF-8, con sus métricas y aclaraciones pendientes. |
| [`user-roles-and-permissions.md`](user-roles-and-permissions.md) | Perfiles de usuario del caso inicial y capacidades descritas en el informe; incluye el contexto multiempresa del README. |
| [`business-rules.md`](business-rules.md) | Reglas operativas derivadas de los requisitos e historias, separando lo explícito de lo que debe decidirse. |
| [`user-stories.md`](user-stories.md) | Épicas, historias HU-01 a HU-10 y criterios de aceptación. |
| [`prioritized-backlog.md`](prioritized-backlog.md) | Orden de prioridad y asignación a sprints tal como aparecen en el informe. |
| [`traceability-matrix.md`](traceability-matrix.md) | Relación entre requisitos funcionales, historias, requisitos no funcionales y objetivos del producto. |

## Criterios de lectura

- **Requisito de origen:** contenido expresado en el Informe de Requisitos N.º 2. Se conserva su intención y su identificador.
- **Regla derivada:** regla operativa consolidada a partir de uno o más requisitos o criterios de aceptación. No reemplaza al texto de origen.
- **Pendiente de validación:** aspecto ambiguo, incompleto o contradictorio que requiere decisión del Product Owner y/o de los responsables del negocio.
- **No definido:** el informe no aporta suficiente detalle para establecer una regla verificable. No debe completarse mediante suposiciones.

## Alcance y límites

Estos documentos describen requisitos del producto y del caso inicial; no constituyen una especificación de arquitectura. No fijan tecnologías, esquemas de base de datos, endpoints, contratos API ni decisiones de despliegue. Esos elementos se desarrollarán en `docs/architecture/` una vez validados los requisitos.

La visión del repositorio presenta Amaint como una plataforma multiempresa. El informe de requisitos, en cambio, concreta principalmente la operación de Manufacturas Andina S.A. Por ello, los requisitos específicos del caso no deben interpretarse automáticamente como reglas universales para todos los clientes de Amaint.

## Fuentes

1. `README.md` del repositorio Amaint: objetivo, funcionalidades generales y modelo multiempresa.
2. `docs/vision/product-vision.md`: dirección, alcance general y públicos objetivo del producto.
3. *Informe de Requisitos N.º 2 — Caso Manufacturas Andina S.A. — Proyecto Amaint*:
   - páginas 4–6: ámbito, exclusiones, necesidades del negocio y métricas de éxito;
   - páginas 8–10: perspectiva del producto, actores y perfiles;
   - páginas 11–13: RF-1 a RF-10 y RNF-1 a RNF-8;
   - páginas 14–18: épicas, historias de usuario y criterios de aceptación;
   - páginas 19–22: objetivos del producto, Definition of Done y Product Backlog priorizado/refinado.

## Mantenimiento del documento

Toda modificación de un requisito debe conservar su identificador o registrar explícitamente su reemplazo. Los cambios de alcance, criterios de aceptación o prioridad deben revisarse con el Product Owner y reflejarse también en la matriz de trazabilidad y en el backlog cuando corresponda.
