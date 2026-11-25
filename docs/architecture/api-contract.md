# Contrato de API — Amaint

| Campo | Detalle |
|---|---|
| Documento | Convenciones y recursos de API |
| Protocolo | HTTP/JSON actualmente; HTTPS requerido en entornos desplegados |

## 1. Propósito

Documentar el contrato HTTP que existe hoy y proponer convenciones comunes para los próximos módulos. La especificación completa deberá crecer junto con cada caso de uso y mantenerse sincronizada con `docs/requirements/`.

## 2. API implementada observada

El controlador `EmpresaController` publica actualmente las siguientes rutas bajo `/api/empresas`:

| Método | Ruta | Operación | Respuesta esperada según controlador |
|---|---|---|---|
| GET | `/api/empresas` | Listar empresas | `200 OK` y lista de entidades `Empresa`. |
| GET | `/api/empresas/{id}` | Consultar por ID | `200 OK` y entidad `Empresa`, o error 404. |
| POST | `/api/empresas` | Crear empresa | `201 Created` y entidad creada; 409 si RUT duplicado. |
| PUT | `/api/empresas/{id}` | Actualizar datos | `200 OK`; 404 si no existe; 409 si RUT ya pertenece a otra empresa. |
| PATCH | `/api/empresas/{id}/estado` | Cambiar estado activo | `200 OK` y entidad actualizada. |
| DELETE | `/api/empresas/{id}` | Eliminar empresa | `204 No Content` o 404. |

### Observaciones del contrato actual

- Las respuestas usan directamente la entidad JPA `Empresa`; aún no hay DTOs específicos.
- El endpoint de cambio de estado recibe un objeto con la propiedad `activo`.
- `GlobalExceptionHandler` devuelve mapas diferentes para errores de validación y errores `ResponseStatusException`.
- El controlador configura CORS para `http://localhost:5173`, mientras que el comando `dev` del frontend usa el puerto `3000`. Debe armonizarse la configuración.
- No se observa autenticación ni autorización en el controlador.
- La ruta todavía no incluye versión (`/v1`).

## 3. Convenciones propuestas

Estas convenciones son recomendaciones para nuevas rutas; no describen capacidades ya implementadas.

### 3.1. Base y formato

- Base sugerida: `/api/v1`.
- Recursos en plural y nombres consistentes.
- JSON UTF-8 para solicitudes y respuestas ordinarias.
- HTTPS fuera del entorno local.
- Identificadores opacos y estables; evitar exponer identificadores internos innecesarios.
- Fechas y horas con formato ISO 8601 y zona horaria explícita cuando aplique.
- Paginación y filtros documentados para listados potencialmente grandes.

### 3.2. Recursos candidatos

| Recurso propuesto | Ejemplos de ruta | Requisitos relacionados |
|---|---|---|
| Organizaciones | `/api/v1/organizations` | Administración de plataforma; modelo multiempresa del README. |
| Usuarios/membresías | `/api/v1/users`, `/api/v1/memberships` | RNF-4; roles y permisos. |
| Activos | `/api/v1/assets` | RF-2, RF-7; HU-01, HU-02. |
| Incidencias | `/api/v1/incidents` | RF-1, RF-8; HU-03. |
| Órdenes de trabajo | `/api/v1/work-orders` | RF-3, RF-5, RF-8; HU-04, HU-05. |
| Inventario | `/api/v1/inventory/items`, `/api/v1/inventory/movements` | RF-4, RF-10; HU-06. |
| Indicadores | `/api/v1/analytics/kpis` | RF-6; HU-09, HU-10. |
| Sincronización | `/api/v1/sync/operations` | RF-9; HU-07, HU-08. |

Estas rutas son nombres de trabajo. Antes de implementarlas deben definirse operaciones, filtros, DTOs, permisos, estados y errores.

## 4. DTOs y validación

Los nuevos endpoints deberían recibir DTOs de entrada y devolver DTOs de respuesta, no entidades JPA. Esto permite versionar el contrato sin acoplar el frontend al esquema de persistencia y evita exposición accidental de campos internos.

Validar en el servidor:

- Campos obligatorios, formato, tamaño y límites de adjuntos.
- Existencia y pertenencia del activo, OT, repuesto y demás recursos.
- Estado permitido y transición válida.
- Permisos y organización a la que pertenece la operación.
- Restricciones de negocio de inventario y cierre de OT.

## 5. Códigos HTTP

| Código | Uso propuesto |
|---|---|
| 200 | Consulta o actualización correcta con contenido. |
| 201 | Recurso creado. |
| 204 | Operación correcta sin contenido de respuesta. |
| 400 | DTO inválido o parámetros incorrectos. |
| 401 | No existe autenticación válida. |
| 403 | Usuario autenticado sin permiso. |
| 404 | Recurso inexistente o fuera del alcance visible del solicitante. |
| 409 | Conflicto de estado, duplicidad o regla de negocio. |
| 413 | Archivo demasiado grande. |
| 415 | Tipo de contenido no admitido. |
| 429 | Límite de solicitudes superado, si se implementa limitación. |
| 5xx | Error del servidor, sin filtrar detalles internos. |

## 6. Formato de errores propuesto

Se recomienda un formato uniforme, por ejemplo:

```json
{
  "code": "VALIDATION_ERROR",
  "message": "La solicitud contiene datos inválidos.",
  "fieldErrors": {
    "assetId": "El activo indicado no existe o no está disponible."
  },
  "traceId": "identificador-de-correlacion"
}
```

El ejemplo es ilustrativo y no representa el formato actual de `GlobalExceptionHandler`.

## 7. Identidad y contexto de organización

Cuando se implemente autenticación:

- El backend deberá validar la identidad antes de ejecutar operaciones protegidas.
- El backend resolverá qué organización está activa y qué permisos tiene el usuario.
- El cliente no podrá elegir arbitrariamente el alcance de organización para acceder a datos ajenos.
- Los endpoints de administración central deberán separarse mediante permisos explícitos.
- Las operaciones multiempresa deben probarse contra accesos cruzados no autorizados.

## 8. Idempotencia y sincronización

Los endpoints que reciban operaciones offline deberán aceptar un identificador idempotente estable generado por el cliente. Si una misma operación se reintenta por una caída de conectividad, el backend debe devolver el resultado previamente registrado o una respuesta consistente, sin duplicar incidencias, OT o movimientos de stock.

La semántica exacta de claves idempotentes, retención, reintentos y conflictos queda pendiente de definición en HU-08 y ADR-003.

## 9. Archivos

HU-03 permite adjuntar hasta tres fotografías de hasta 5 MB cada una, con compresión. Las fichas de activos pueden incluir manuales PDF. Deben definirse endpoints de carga/descarga, autorización de acceso, límites, almacenamiento, comprobación de tipo real de archivo y retención. No se ha elegido un proveedor de almacenamiento de objetos.

## 10. Documentación de contrato

Se recomienda incorporar OpenAPI cuando estén definidos los primeros DTOs y endpoints de negocio. El contrato debe revisarse en cada cambio incompatible y vincularse con RF/HU. No se genera una especificación OpenAPI ficticia mientras las rutas y schemas no estén aprobados.

## 11. Referencias

- `backend/src/main/java/cl/amaint/api/controller/EmpresaController.java`.
- `backend/src/main/java/cl/amaint/api/exception/GlobalExceptionHandler.java`.
- `backend/src/main/java/cl/amaint/api/entity/Empresa.java`.
- `frontend/package.json`.
- `frontend/vite.config.ts`.
- `docs/requirements/functional-requirements.md`.
- `docs/requirements/non-functional-requirements.md`.
- `docs/requirements/user-stories.md`.
