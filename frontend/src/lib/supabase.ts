import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
        auth: {
            // Mantiene la sesión en el navegador al recargar o volver a abrir AMaint.
            persistSession: true,
            // Renueva el token mientras la sesión siga vigente.
            autoRefreshToken: true,
            // Procesa enlaces de confirmación y recuperación de Supabase.
            detectSessionInUrl: true,
            // Usa almacenamiento local del navegador.
            storage: window.localStorage
        }
    }
);
