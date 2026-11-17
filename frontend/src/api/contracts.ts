export type EntityId = string | number;

export interface PageResult<T> {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiCompany {
  id: EntityId;
  razonSocial: string;
  nombreComercial?: string;
  rut: string;
  activo: boolean;
  fechaCreacion?: string;
}

export interface ApiAsset {
  id: EntityId;
  nombre: string;
  activo: boolean;
  fechaCreacion?: string;
  empresa?: { id: EntityId };
  planta?: { id: EntityId };
  area?: { id: EntityId };
  linea?: { id: EntityId };
  maquina?: { id: EntityId };
  ubicacion?: string;
}

export interface ApiWorkOrder {
  id: EntityId;
  codigo: string;
  activoId: EntityId;
  descripcion: string;
  prioridad: 'critical' | 'high' | 'medium' | 'low';
  estado: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  tipo: 'EMERGENCIA' | 'CORRECTIVO' | 'PREVENTIVO' | 'PREDICTIVO';
  tecnicoId?: EntityId;
  fechaCreacion?: string;
  fechaLimite?: string;
}

export interface ApiSparePart {
  id: EntityId;
  sku: string;
  nombre: string;
  stockActual: number;
  stockMinimo: number;
  unidad: string;
}

export interface ListParams {
  page?: number;
  size?: number;
  search?: string;
  sort?: string;
  direction?: 'asc' | 'desc';
  activo?: boolean;
}

export function toQuery(params: ListParams): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') query.set(key, String(value));
  });
  const serialized = query.toString();
  return serialized ? `?${serialized}` : '';
}
