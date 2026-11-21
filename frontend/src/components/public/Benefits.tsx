
import React from 'react';

const benefits = [
    {
        icon: '🎯',
        title: 'Mayor organización',
        description:
            'Centraliza la información de mantenimiento y facilita el seguimiento de las actividades.',
    },
    {
        icon: '⏱️',
        title: 'Mejor seguimiento',
        description:
            'Consulta el estado de las órdenes de trabajo y conoce las actividades pendientes.',
    },
    {
        icon: '🔎',
        title: 'Información accesible',
        description:
            'Mantén los datos de activos, equipos y operaciones organizados en una plataforma.',
    },
    {
        icon: '📈',
        title: 'Decisiones informadas',
        description:
            'Utiliza indicadores de mantenimiento para comprender el desempeño de tu operación.',
    },
];

export const Benefits: React.FC = () => {
    return (
        <section className="bg-[#142B45] text-white py-24 px-6">
            <div className="max-w-7xl mx-auto">

                <div className="grid lg:grid-cols-2 gap-14 items-center">

                    <div>
                        <p className="text-sm font-bold tracking-widest text-blue-300 mb-4">
                            ¿POR QUÉ AMaint?
                        </p>

                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            Más claridad para gestionar tus operaciones.
                        </h2>

                        <p className="text-slate-300 mt-6 leading-relaxed">
                            Una buena gestión de mantenimiento necesita información
                            organizada, seguimiento y herramientas que faciliten
                            el trabajo de los equipos.
                        </p>

                        <div className="mt-10 space-y-7">
                            {benefits.map((benefit) => (
                                <div key={benefit.title} className="flex gap-4">
                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">
                                        {benefit.icon}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            {benefit.title}
                                        </h3>

                                        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200"
                            alt="Profesional trabajando en un entorno industrial"
                            className="w-full h-[480px] object-cover rounded-2xl shadow-2xl"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

