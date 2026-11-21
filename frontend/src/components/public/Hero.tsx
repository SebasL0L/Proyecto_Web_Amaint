
import React from 'react';

interface HeroProps {
    onRegister: () => void;
    onLogin: () => void;
}

export const Hero: React.FC<HeroProps> = ({
                                              onRegister,
                                              onLogin,
                                          }) => {
    return (
        <section
            id="inicio"
            className="relative overflow-hidden bg-[#10243B] text-white"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-transparent to-blue-600/10" />

            <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">

                <div className="grid lg:grid-cols-2 gap-14 items-center">

                    <div>
                        <div className="inline-flex items-center gap-2 border border-blue-400/30 bg-blue-500/10 rounded-full px-4 py-2 mb-7">
                            <span className="w-2 h-2 rounded-full bg-blue-400" />
                            <span className="text-xs font-semibold tracking-wider text-blue-200">
                GESTIÓN DE MANTENIMIENTO INDUSTRIAL
              </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
                            El control de tu mantenimiento
                            <span className="text-blue-400"> comienza aquí.</span>
                        </h1>

                        <p className="text-lg text-slate-300 leading-relaxed mt-7 max-w-xl">
                            Organiza activos, administra órdenes de trabajo y supervisa
                            tus operaciones desde una sola plataforma.
                            AMaint conecta la información de mantenimiento de tu empresa.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-9">
                            <button
                                onClick={onRegister}
                                className="bg-blue-600 hover:bg-blue-500 px-7 py-4 rounded-lg font-semibold transition"
                            >
                                Comenzar ahora
                            </button>

                            <button
                                onClick={onLogin}
                                className="border border-slate-500 hover:bg-white/10 px-7 py-4 rounded-lg font-semibold transition"
                            >
                                Ya tengo una cuenta
                            </button>
                        </div>

                        <p className="text-sm text-slate-400 mt-6">
                            Una plataforma para organizar y mejorar la gestión industrial.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-5 bg-blue-500/10 blur-3xl rounded-full" />

                        <div className="relative rounded-2xl border border-white/10 bg-slate-900/70 p-3 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200"
                                alt="Profesional trabajando con tecnología industrial"
                                className="w-full h-[360px] object-cover rounded-xl"
                            />

                            <div className="absolute bottom-7 left-7 right-7 bg-[#10243B]/90 backdrop-blur-md border border-white/10 rounded-xl p-4">
                                <p className="text-sm text-blue-300 font-semibold">
                                    AMaint · Gestión inteligente
                                </p>
                                <p className="text-white font-medium mt-1">
                                    Toda tu operación, conectada en un solo lugar.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
