import { apiRequest, jsonBody } from './httpClient';
import { ApiWorkOrder, EntityId, ListParams, PageResult, toQuery } from './contracts';

// Endpoint propuesto; confirmar ruta, campos y paginación con Backend antes de activar.
export const workOrdersApi = {
  list: (params: ListParams = {}) => apiRequest<PageResult<ApiWorkOrder> | ApiWorkOrder[]>(`/ordenes-trabajo${toQuery(params)}`),
  get: (id: EntityId) => apiRequest<ApiWorkOrder>(`/ordenes-trabajo/${id}`),
  create: (data: Omit<ApiWorkOrder, 'id' | 'codigo' | 'estado'>) =>
    apiRequest<ApiWorkOrder>('/ordenes-trabajo', { method: 'POST', body: jsonBody(data) }),
  assign: (id: EntityId, tecnicoId: EntityId) =>
    apiRequest<ApiWorkOrder>(`/ordenes-trabajo/${id}/asignacion`, { method: 'PATCH', body: jsonBody({ tecnicoId }) }),
  updateStatus: (id: EntityId, estado: ApiWorkOrder['estado']) =>
    apiRequest<ApiWorkOrder>(`/ordenes-trabajo/${id}/estado`, { method: 'PATCH', body: jsonBody({ estado }) }),
};
