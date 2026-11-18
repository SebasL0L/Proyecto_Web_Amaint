
import React from 'react';

const steps = [
    {
        number: '01',
        title: 'Crea tu cuenta',
        description:
            'Registra tu usuario y comienza a configurar el espacio de trabajo de tu organización.',
        icon: '👤',
    },
    {
        number: '02',
        title: 'Organiza tu empresa',
        description:
            'Define plantas, áreas, equipos y usuarios para estructurar la información.',
        icon: '🏭',
    },
    {
        number: '03',
        title: 'Gestiona el mantenimiento',
        description:
            'Registra activos, organiza órdenes de trabajo y coordina las actividades.',
        icon: '⚙️',
    },
    {
        number: '04',
        title: 'Supervisa los resultados',
        description:
            'Consulta indicadores e información para apoyar las decisiones de mantenimiento.',
        icon: '📊',
    },
];

export const HowItWorks: React.FC = () => {
    return (
        <section id="como-funciona" className="bg-white py-24 px-6">
            <div className="max-w-7xl mx-auto">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-sm font-bold tracking-widest text-blue-700 mb-4">
                        CÓMO FUNCIONA
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                        Organiza tu mantenimiento paso a paso.
                    </h2>

                    <p className="text-slate-600 mt-5 leading-relaxed">
                        AMaint reúne las herramientas necesarias para estructurar
                        y supervisar las actividades de mantenimiento de tu empresa.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step) => (
                        <article
                            key={step.number}
                            className="relative bg-slate-50 border border-slate-200 rounded-2xl p-7"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-3xl">{step.icon}</span>
                                <span className="text-blue-600 font-bold text-sm">
                  {step.number}
                </span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900">
                                {step.title}
                            </h3>

                            <p className="text-slate-600 text-sm leading-relaxed mt-3">
                                {step.description}
                            </p>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
};
