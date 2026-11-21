# Integración Frontend–Backend

## Configuración local

Crea `frontend/.env.local` a partir de `.env.example` y define `VITE_API_BASE_URL`. Por defecto, la capa HTTP apunta a `http://localhost:8080/api`, que coincide con el puerto y el prefijo de los controladores actuales.

No incluyas contraseñas de PostgreSQL/Supabase ni claves de servicio en variables `VITE_*`: Vite las expone al navegador. El frontend solo consume la API del backend.

## Cliente y módulos

- `src/api/httpClient.ts`: URL base, JSON, errores HTTP y token Bearer centralizados.
- `src/api/assetsApi.ts`: rutas actuales de empresas y jerarquía de activos.
- `src/api/workOrdersApi.ts` y `src/api/inventoryApi.ts`: ejemplos de contrato por acordar con Backend; no activar hasta confirmar rutas y DTOs.
- `setAccessTokenProvider()` permite conectar el proveedor de sesión acordado. Sin configurar proveedor, las llamadas se envían sin token.

## Contrato que debe confirmar Backend

Acordar rutas, DTOs, estados, errores, autenticación, filtros y paginación. Las rutas de órdenes e inventario son propuestas. Los controladores actuales de activos devuelven listas simples y no muestran paginación; no asumir `PageResult` para ellos.

Las vistas siguen usando datos simulados hasta que cada flujo se migre deliberadamente a estos servicios. Esto permite integrar módulo por módulo.
