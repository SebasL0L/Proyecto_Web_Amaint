
import { supabase } from './supabase';

export async function registerUser(
    name: string,
    email: string,
    password: string,
    company: string
) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                company_name: company
            }
        }
    });

    if (error) throw error;
    return data;
}

export async function loginUser(
    email: string,
    password: string
) {
    const { data, error } =
        await supabase.auth.signInWithPassword({
            email,
            password
        });

    if (error) throw error;
    return data;
}

export async function logoutUser() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
}

export async function getCurrentSession() {
    const { data, error } =
        await supabase.auth.getSession();

    if (error) throw error;
    return data.session;
}
