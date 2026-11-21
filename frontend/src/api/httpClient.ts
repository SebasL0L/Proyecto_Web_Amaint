const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api').replace(/\/$/, '');

export type AccessTokenProvider = () => string | null | Promise<string | null>;
let accessTokenProvider: AccessTokenProvider = () => null;

export function setAccessTokenProvider(provider: AccessTokenProvider): void {
  accessTokenProvider = provider;
}

export class ApiError extends Error {
  constructor(message: string, public readonly status: number, public readonly code?: string, public readonly fieldErrors?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
  }
}

type ApiErrorBody = { message?: string; error?: string; code?: string; fieldErrors?: Record<string, string> };

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await accessTokenProvider();
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');
  if (init.body && !(init.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`, { ...init, headers });
  } catch {
    throw new ApiError('No se pudo conectar con el servidor. Revisa tu conexión e inténtalo nuevamente.', 0, 'NETWORK_ERROR');
  }

  if (response.status === 204) return undefined as T;
  const contentType = response.headers.get('content-type') ?? '';
  const body = contentType.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok) {
    const errorBody = typeof body === 'object' && body !== null ? body as ApiErrorBody : {};
    const textMessage = typeof body === 'string' && body.length > 0 ? body : undefined;
    const message = errorBody.message ?? errorBody.error ?? textMessage ?? `Error HTTP ${response.status}`;
    throw new ApiError(message, response.status, errorBody.code, errorBody.fieldErrors);
  }
  return body as T;
}

export function jsonBody(value: unknown): string { return JSON.stringify(value); }
