# Perfiles y permisos — Amaint

| Campo | Detalle |
|---|---|
| Documento | Perfiles de usuario y permisos |
| Fuente principal | Informe de Requisitos N.º 2, sección 2.3, páginas 9–10, y sección 5.1, páginas 14–18 |

## Propósito

Identificar los perfiles que interactúan con Amaint y resumir las capacidades que el informe les atribuye. Este documento sirve de base para definir el control de acceso basado en roles (RBAC); no sustituye la matriz formal de autorización.

## Perfiles del caso inicial

### 1. Personal de Producción / Operador de Producción

**Necesidad:** comunicar oportunamente anomalías o fallas detectadas durante la operación de las máquinas.

**Capacidad respaldada por el informe:** registrar formalmente reportes de fallas, indicando el activo, tipo de anomalía e impacto percibido y adjuntando fotografías desde un dispositivo móvil.

**Pendiente:** confirmar si «Personal de Producción» y «Operador de Producción» representan exactamente el mismo rol en el sistema y si pueden consultar reportes previamente ingresados.

### 2. Personal Técnico / Técnico de Mantenimiento

**Necesidad:** consultar información del activo y ejecutar las intervenciones asignadas en terreno.

**Capacidades respaldadas por el informe:**
- Consultar ficha técnica e historial del activo mediante QR o búsqueda.
- Consultar datos del fabricante, manuales, últimas OT ejecutadas y repuestos habituales.
- Consultar tareas/OT asignadas.
- Registrar tiempo de trabajo y acciones ejecutadas.
- Completar checklists y solicitar el cierre de una OT.
- Trabajar con formularios e imágenes sin conectividad y sincronizarlos posteriormente.
- Registrar incidentes/fallas, según RF-1.

### 3. Supervisor de Mantenimiento

**Necesidad:** organizar el trabajo de mantenimiento y coordinar a los recursos técnicos.

**Capacidades respaldadas por el informe:**
- Registrar y categorizar activos dentro de la estructura jerárquica.
- Consultar y revisar solicitudes pendientes, con filtros por área y severidad.
- Generar, calendarizar, priorizar y asignar OT preventivas y correctivas.
- Asignar uno o más técnicos según su especialidad registrada.
- Gestionar recursos y controlar repuestos.
- Recibir o revisar información operativa para coordinar la atención de fallas.

**Herencia indicada en el diagrama de casos de uso:** el informe señala que el Supervisor de Mantenimiento hereda capacidades del Personal Técnico. Esta relación debe reflejarse en la validación de permisos y no debe confundirse con una autorización irrestricta.

### 4. Jefe de Planta / Administrador

**Necesidad:** supervisar el desempeño de la planta y apoyar decisiones operativas.

**Capacidades respaldadas por el informe:**
- Visualizar indicadores de rendimiento (KPIs).
- Consultar MTBF, MTTR, disponibilidad operativa y costos por activo.
- Filtrar reportes por fechas, planta, área y tipo/familia de máquina, según la historia correspondiente.
- Configurar aspectos generales y aprobar planes, de acuerdo con la tabla de perfiles.

**Herencia indicada en el diagrama de casos de uso:** el informe representa al Jefe de Planta como heredero de las capacidades del Supervisor de Mantenimiento. La extensión real de esa herencia deberá confirmarse al definir permisos.

### 5. Encargado de Bodega / Repuestos

**Necesidad:** mantener información actualizada sobre repuestos e insumos y controlar las salidas físicas.

**Capacidades respaldadas por el informe:**
- Mantener actualizada la información de inventario.
- Registrar la salida/entrega de materiales asociada a una OT activa y al activo correspondiente.
- Consultar disponibilidad de stock para validar un despacho.
- Actualizar el inventario al confirmar la entrega.

## Administración central de Amaint

El README del repositorio contempla un entorno de administración central para gestionar organizaciones, solicitudes de adaptación, licencias y suscripciones. Este actor corresponde a la plataforma multiempresa y no está desarrollado con el mismo nivel de detalle en el informe del caso Manufacturas Andina.

**Capacidades identificadas a nivel de producto:**
- Gestionar organizaciones que utilizan Amaint.
- Gestionar solicitudes de adaptación.
- Gestionar licencias y suscripciones.

**Pendiente:** definir los perfiles de administración central, sus permisos, su separación respecto de los administradores de cada organización y qué información de las empresas puede consultar.

## Matriz preliminar de capacidades

La matriz siguiente resume solo las capacidades identificadas en las fuentes. No representa todavía una matriz RBAC exhaustiva.

| Capacidad | Producción | Técnico | Supervisor | Jefe de Planta | Bodega | Admin. central |
|---|---:|---:|---:|---:|---:|---:|
| Registrar reportes de fallas | Sí | Sí | Por herencia indicada | Por herencia indicada* | No definido | No definido |
| Consultar ficha e historial de activos | No definido | Sí | Por herencia indicada | Por herencia indicada* | No definido | No definido |
| Crear y jerarquizar activos | No | No definido | Sí | Por herencia indicada* | No | No definido |
| Consultar solicitudes pendientes | No definido | No definido | Sí | Por herencia indicada* | No | No definido |
| Crear, calendarizar y asignar OT | No | No | Sí | Por herencia indicada* | No | No definido |
| Registrar ejecución y cierre de OT | No | Sí | Por herencia indicada | Por herencia indicada* | No | No definido |
| Despachar repuestos y actualizar stock | No | No definido | Controla recursos; permiso exacto pendiente | Por herencia indicada* | Sí | No definido |
| Visualizar KPIs e informes gerenciales | No definido | No definido | No definido | Sí | No definido | No definido |
| Gestionar organizaciones/licencias/suscripciones | No | No | No | No | No | Sí (README) |

\* La herencia se menciona en la explicación del diagrama de casos de uso. El alcance exacto de las operaciones heredadas y las restricciones adicionales no está especificado.

## Decisiones necesarias para cerrar RBAC

1. Confirmar el catálogo definitivo de roles y si «Personal de Producción» y «Operador de Producción» serán un único rol.
2. Definir si un usuario puede tener más de un rol y si puede pertenecer a más de una organización.
3. Definir quién invita, crea, desactiva y modifica usuarios dentro de cada organización.
4. Acordar el alcance de la herencia de capacidades entre Técnico, Supervisor y Jefe de Planta.
5. Definir los permisos concretos de lectura, creación, modificación, eliminación, aprobación y exportación por módulo.
6. Definir los permisos sobre inventario: recepción, ajuste, despacho, reversa y consulta.
7. Definir cómo se asegura el aislamiento de datos entre organizaciones y qué operaciones excepcionales puede realizar la administración central.
8. Confirmar si la bodega puede operar con más de una ubicación, almacén o planta; el informe no lo determina.

## Fuente

- Informe de Requisitos N.º 2, sección 2.3, páginas 9–10; sección 5.1, páginas 14–18.
- README.md del repositorio Amaint, apartado «Modelo de funcionamiento».
