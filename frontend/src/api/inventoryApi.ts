import { apiRequest, jsonBody } from './httpClient';
import { ApiSparePart, EntityId, ListParams, PageResult, toQuery } from './contracts';

// Endpoint propuesto; confirmar ruta, campos y semántica del movimiento con Backend.
export const inventoryApi = {
  list: (params: ListParams = {}) => apiRequest<PageResult<ApiSparePart> | ApiSparePart[]>(`/repuestos${toQuery(params)}`),
  get: (id: EntityId) => apiRequest<ApiSparePart>(`/repuestos/${id}`),
  registerMovement: (id: EntityId, data: { cantidad: number; tipo: 'entrada' | 'salida'; referencia?: string }) =>
    apiRequest<ApiSparePart>(`/repuestos/${id}/movimientos`, { method: 'POST', body: jsonBody(data) }),
};
