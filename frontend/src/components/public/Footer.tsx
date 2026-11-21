
import React from 'react';

interface FooterProps {
    onLogin: () => void;
    onRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({
                                                  onLogin,
                                                  onRegister,
                                              }) => {
    return (
        <footer className="bg-[#10243B] text-white">

            <div className="max-w-7xl mx-auto px-6 py-16">

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">
                                A
                            </div>
                            <span className="text-2xl font-bold">AMaint</span>
                        </div>

                        <p className="text-slate-300 max-w-md leading-relaxed">
                            Plataforma web para organizar, gestionar y supervisar
                            las actividades de mantenimiento industrial.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-5">Explorar</h3>

                        <ul className="space-y-4 text-sm text-slate-300">
                            <li><a href="#inicio" className="hover:text-blue-300">Inicio</a></li>
                            <li><a href="#funcionalidades" className="hover:text-blue-300">Funcionalidades</a></li>
                            <li><a href="#como-funciona" className="hover:text-blue-300">Cómo funciona</a></li>
                            <li><a href="#planes" className="hover:text-blue-300">Planes</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-5">Tu espacio</h3>

                        <ul className="space-y-4 text-sm text-slate-300">
                            <li>
                                <button onClick={onLogin} className="hover:text-blue-300">
                                    Iniciar sesión
                                </button>
                            </li>
                            <li>
                                <button onClick={onRegister} className="hover:text-blue-300">
                                    Crear cuenta
                                </button>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-white/10 mt-14 pt-7 flex flex-col sm:flex-row justify-between gap-4 text-sm text-slate-400">
                    <p>© {new Date().getFullYear()} AMaint. Todos los derechos reservados.</p>
                    <p>Gestión de mantenimiento industrial.</p>
                </div>

            </div>
        </footer>
    );
};
