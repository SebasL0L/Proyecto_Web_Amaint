
import React from 'react';

export const Introduction: React.FC = () => {
    return (
        <section className="bg-white py-24 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                <div>
                    <p className="text-sm font-bold tracking-widest text-blue-700 mb-4">
                        CONOCE AMaint
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                        Una nueva forma de organizar el mantenimiento industrial.
                    </h2>

                    <p className="text-slate-600 leading-relaxed mt-6">
                        AMaint es una plataforma web diseñada para centralizar
                        la información y facilitar la gestión de mantenimiento
                        en empresas industriales.
                    </p>

                    <p className="text-slate-600 leading-relaxed mt-4">
                        Permite organizar activos, coordinar trabajos, administrar
                        recursos y consultar información relevante desde un
                        mismo entorno digital.
                    </p>

                    <div className="mt-8 space-y-4">
                        {[
                            'Información centralizada.',
                            'Mayor organización de las operaciones.',
                            'Seguimiento de actividades de mantenimiento.',
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">
                  ✓
                </span>
                                <span className="text-slate-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1200"
                        alt="Entorno de trabajo industrial"
                        className="w-full h-[420px] object-cover rounded-2xl shadow-xl"
                    />

                    <div className="absolute -bottom-6 -left-4 md:-left-8 bg-[#142B45] text-white p-6 rounded-xl shadow-xl max-w-xs">
                        <p className="text-blue-300 text-sm font-semibold">
                            AMaint
                        </p>
                        <p className="font-semibold mt-2">
                            Tecnología al servicio de la gestión industrial.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

