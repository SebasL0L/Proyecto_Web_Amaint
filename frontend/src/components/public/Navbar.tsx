
import React from 'react';

interface NavbarProps {
    onLogin: () => void;
    onRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
                                                  onLogin,
                                                  onRegister,
                                              }) => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#10243B]/95 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                <a href="#inicio" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">A</span>
                    </div>

                    <span className="text-2xl font-bold tracking-tight text-white">
            AMaint
          </span>
                </a>

                <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
                    <a href="#inicio" className="hover:text-white transition">
                        Inicio
                    </a>
                    <a href="#funcionalidades" className="hover:text-white transition">
                        Funcionalidades
                    </a>
                    <a href="#como-funciona" className="hover:text-white transition">
                        Cómo funciona
                    </a>
                    <a href="#planes" className="hover:text-white transition">
                        Planes
                    </a>
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onLogin}
                        className="hidden sm:block text-sm text-white hover:text-blue-300 transition"
                    >
                        Iniciar sesión
                    </button>

                    <button
                        onClick={onRegister}
                        className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-3 rounded-lg transition shadow-lg shadow-blue-950/30"
                    >
                        Crear cuenta
                    </button>
                </div>

            </div>
        </header>
    );
};
