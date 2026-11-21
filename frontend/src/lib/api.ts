
import { supabase } from './supabase';

const API_URL = 'http://localhost:8080';

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
) {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    const token = data.session?.access_token;

    if (!token) {
        throw new Error('Debes iniciar sesión');
    }

    const headers = new Headers(options.headers);

    headers.set('Authorization', `Bearer ${token}`);

    if (options.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });

    if (!response.ok) {
        throw new Error(
            `Error API: ${response.status} ${response.statusText}`
        );
    }

    if (response.status === 204) return null;

    return response.json();
}
