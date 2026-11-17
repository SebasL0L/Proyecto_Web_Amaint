import { apiRequest, jsonBody } from './httpClient';
import { ApiAsset, ApiCompany, EntityId } from './contracts';

// Estas rutas corresponden a los controladores actuales del backend.
export const assetsApi = {
  companies: () => apiRequest<ApiCompany[]>('/empresas'),
  plants: () => apiRequest<ApiAsset[]>('/plantas'),
  areas: () => apiRequest<ApiAsset[]>('/areas'),
  lines: () => apiRequest<ApiAsset[]>('/lineas'),
  machines: () => apiRequest<ApiAsset[]>('/maquinas'),
  components: () => apiRequest<ApiAsset[]>('/componentes'),
  machine: (id: EntityId) => apiRequest<ApiAsset>(`/maquinas/${id}`),
  createMachine: (data: Pick<ApiAsset, 'nombre'> & { linea: { id: EntityId } }) =>
    apiRequest<ApiAsset>('/maquinas', { method: 'POST', body: jsonBody(data) }),
};
