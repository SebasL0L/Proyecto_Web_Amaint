
import React from 'react';

const features = [
    {
        number: '01',
        icon: '📋',
        title: 'Órdenes de trabajo',
        description:
            'Organiza, asigna y realiza seguimiento de las actividades de mantenimiento.',
    },
    {
        number: '02',
        icon: '🏭',
        title: 'Activos y maquinaria',
        description:
            'Mantén organizada la estructura de plantas, áreas, equipos y componentes.',
    },
    {
        number: '03',
        icon: '📦',
        title: 'Inventario y repuestos',
        description:
            'Administra los recursos y repuestos utilizados en las operaciones.',
    },
    {
        number: '04',
        icon: '📱',
        title: 'Identificación QR',
        description:
            'Facilita la identificación y consulta de información de los activos.',
    },
    {
        number: '05',
        icon: '📊',
        title: 'Indicadores de mantenimiento',
        description:
            'Consulta información sobre confiabilidad, disponibilidad y desempeño.',
    },
    {
        number: '06',
        icon: '💰',
        title: 'Costos y disponibilidad',
        description:
            'Organiza información relevante para evaluar los recursos y resultados.',
    },
];

export const Features: React.FC = () => {
    return (
        <section id="funcionalidades" className="bg-slate-100 py-24 px-6">
            <div className="max-w-7xl mx-auto">

                <div className="max-w-2xl mb-14">
                    <p className="text-sm font-bold tracking-widest text-blue-700 mb-4">
                        FUNCIONALIDADES
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                        Todo lo que necesitas para gestionar el mantenimiento.
                    </h2>

                    <p className="text-slate-600 mt-5 leading-relaxed">
                        Diferentes herramientas conectadas para organizar
                        las actividades y recursos de tu operación.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature) => (
                        <article
                            key={feature.number}
                            className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition duration-300"
                        >
                            <div className="flex items-center justify-between mb-7">
                                <span className="text-3xl">{feature.icon}</span>
                                <span className="text-sm font-bold text-blue-600">
                  {feature.number}
                </span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900">
                                {feature.title}
                            </h3>

                            <p className="text-slate-600 leading-relaxed mt-3">
                                {feature.description}
                            </p>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
};

