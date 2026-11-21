
import React, { useState } from 'react';

const questions = [
    {
        question: '¿Qué es AMaint?',
        answer:
            'AMaint es una plataforma web orientada a la gestión del mantenimiento industrial. Permite organizar activos, órdenes de trabajo, inventario e indicadores.',
    },
    {
        question: '¿Para qué tipo de empresas está diseñado?',
        answer:
            'Está pensado principalmente para organizaciones que necesitan administrar y supervisar sus actividades de mantenimiento industrial.',
    },
    {
        question: '¿Qué funcionalidades ofrece?',
        answer:
            'Incluye herramientas para gestionar activos, órdenes de trabajo, identificación QR, inventario, indicadores de confiabilidad y costos.',
    },
    {
        question: '¿Puedo acceder desde diferentes dispositivos?',
        answer:
            'AMaint está siendo desarrollado como una aplicación web adaptable a diferentes tamaños de pantalla.',
    },
    {
        question: '¿Cómo puedo obtener una licencia?',
        answer:
            'Las modalidades comerciales y condiciones de contratación se definirán próximamente.',
    },
];

export const FAQ: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="bg-white py-24 px-6">
            <div className="max-w-4xl mx-auto">

                <div className="text-center mb-14">
                    <p className="text-sm font-bold tracking-widest text-blue-700 mb-4">
                        PREGUNTAS FRECUENTES
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                        ¿Tienes alguna duda?
                    </h2>

                    <p className="text-slate-600 mt-4">
                        Aquí encontrarás respuestas sobre AMaint y sus funcionalidades.
                    </p>
                </div>

                <div className="space-y-4">
                    {questions.map((item, index) => (
                        <article
                            key={item.question}
                            className="border border-slate-200 rounded-xl overflow-hidden"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setActiveIndex(activeIndex === index ? null : index)
                                }
                                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-50 transition"
                            >
                <span className="font-semibold text-slate-900">
                  {item.question}
                </span>

                                <span className="text-blue-600 text-xl">
                  {activeIndex === index ? '−' : '+'}
                </span>
                            </button>

                            {activeIndex === index && (
                                <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                                    {item.answer}
                                </div>
                            )}
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
};
