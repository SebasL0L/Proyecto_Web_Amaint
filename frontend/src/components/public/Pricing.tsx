
import React from 'react';

interface PricingProps {
    onRegister: () => void;
}

const plans = [
    {
        name: 'Individual',
        description: 'Para usuarios que necesitan organizar sus actividades.',
        price: 'Por definir',
        features: [
            'Acceso personal a la plataforma',
            'Gestión de actividades',
            'Consulta de información',
            'Herramientas de mantenimiento',
        ],
        featured: false,
    },
    {
        name: 'Empresarial',
        description: 'Para organizaciones que necesitan gestionar sus operaciones.',
        price: 'Por definir',
        features: [
            'Gestión de empresas y usuarios',
            'Administración de activos',
            'Órdenes de trabajo',
            'Inventario y repuestos',
            'Indicadores de mantenimiento',
        ],
        featured: true,
    },
];

export const Pricing: React.FC<PricingProps> = ({ onRegister }) => {
    return (
        <section id="planes" className="bg-slate-100 py-24 px-6">
            <div className="max-w-6xl mx-auto">

                <div className="text-center max-w-2xl mx-auto mb-14">
                    <p className="text-sm font-bold tracking-widest text-blue-700 mb-4">
                        PLANES Y LICENCIAS
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                        Una solución para cada tipo de organización.
                    </h2>

                    <p className="text-slate-600 mt-5">
                        Conoce las alternativas de acceso a AMaint y encuentra
                        la modalidad que mejor se adapte a tus necesidades.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan) => (
                        <article
                            key={plan.name}
                            className={`rounded-2xl p-8 border ${
                                plan.featured
                                    ? 'bg-[#142B45] text-white border-blue-600 shadow-xl'
                                    : 'bg-white text-slate-900 border-slate-200'
                            }`}
                        >
                            {plan.featured && (
                                <span className="inline-block bg-blue-500 text-white text-xs font-bold px-3 py-2 rounded-full mb-5">
                  PARA EMPRESAS
                </span>
                            )}

                            <h3 className="text-2xl font-bold">{plan.name}</h3>

                            <p className={`mt-3 text-sm leading-relaxed ${
                                plan.featured ? 'text-slate-300' : 'text-slate-600'
                            }`}>
                                {plan.description}
                            </p>

                            <p className="text-3xl font-bold mt-8">
                                {plan.price}
                            </p>

                            <p className={`text-xs mt-2 ${
                                plan.featured ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                                Próximamente más información comercial.
                            </p>

                            <div className="my-8 border-t border-current/20" />

                            <ul className="space-y-4 mb-9">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex gap-3 text-sm">
                                        <span className="text-blue-400">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={onRegister}
                                className={`w-full py-3 rounded-lg font-semibold transition ${
                                    plan.featured
                                        ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                        : 'bg-[#142B45] hover:bg-blue-800 text-white'
                                }`}
                            >
                                Comenzar
                            </button>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
};
