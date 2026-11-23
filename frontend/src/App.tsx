
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight,
  Menu, X, ShieldCheck, Factory, Settings2, ClipboardList,
  BarChart3, QrCode, Package, Clock3, Users, Zap, Headset,
  Building2, User, LogOut, CreditCard, LayoutDashboard,
  Mail, Lock, Wrench, Activity, CircleHelp
} from 'lucide-react';

import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Toast } from './components/common/Toast';

import { MisOTsView } from './components/modules/MisOTsView';
import { EscanerQRView } from './components/modules/EscanerQRView';
import { ReportarFallaView } from './components/modules/ReportarFallaView';
import { ChecklistCierreView } from './components/modules/ChecklistCierreView';
import { JerarquiaActivosView } from './components/modules/JerarquiaActivosView';
import { AsignacionOTsView } from './components/modules/AsignacionOTsView';
import { BodegaRepuestosView } from './components/modules/BodegaRepuestosView';
import { SincronizacionLogsView } from './components/modules/SincronizacionLogsView';
import { KpisConfiabilidadView } from './components/modules/KpisConfiabilidadView';
import { CostosDisponibilidadView } from './components/modules/CostosDisponibilidadView';
import { loginUser, registerUser, logoutUser } from './lib/auth';
import { supabase } from './lib/supabase';
import type { Session } from '@supabase/supabase-js';
// --------------------------------------------------
// TIPOS
// --------------------------------------------------

type Screen =
    | 'home'
    | 'login'
    | 'register'
    | 'dashboard'
    | 'account'
    | 'subscription'
    | 'application';

type PublicProps = {
  onNavigate: (screen: Screen) => void;
};

// --------------------------------------------------
// ANIMACIONES
// --------------------------------------------------

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const }
  }
};

const SectionReveal = ({ children, className = '' }: {
  children: React.ReactNode;
  className?: string;
}) => (
    <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className={className}
    >
      {children}
    </motion.div>
);

// --------------------------------------------------
// NAVBAR
// --------------------------------------------------


function Navbar({ onNavigate }: PublicProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const sections = [
    ['Inicio', 'inicio'],
    ['Soluciones', 'soluciones'],
    ['Cómo funciona', 'como-funciona'],
    ['Beneficios', 'beneficios'],
    ['Planes', 'planes'],
    ['FAQ', 'faq']
  ];

  // Detecta qué sección está viendo el usuario
  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          const visibleSections = entries
              .filter(entry => entry.isIntersecting)
              .sort(
                  (a, b) =>
                      b.intersectionRatio - a.intersectionRatio
              );

          if (visibleSections.length > 0) {
            setActiveSection(visibleSections[0].target.id);
          }
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: [0, 0.1, 0.25, 0.5]
        }
    );

    sections.forEach(([, id]) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
      <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-r from-[#155eef] to-[#087eaa] backdrop-blur-xl border-b border-white/10 shadow-lg shadow-blue-950/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[76px] flex items-center justify-between">

          {/* LOGO */}
          <button
              onClick={() => scrollTo('inicio')}
              className="flex items-center gap-3 text-white cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Wrench size={22} />
            </div>

            <span className="text-2xl font-bold tracking-tight">
            AMaint<span className="text-blue-400">.</span>
          </span>
          </button>

          {/* MENÚ ESCRITORIO */}
          <nav className="hidden lg:flex items-center gap-7">
            {sections.map(([label, id]) => {
              const isActive = activeSection === id;

              return (
                  <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`
                  relative py-2 text-sm font-medium cursor-pointer
                  transition-all duration-200
                  ${isActive
                          ? 'text-blue-400'
                          : 'text-slate-300 hover:text-white'
                      }
                `}
                  >
                    {label}

                    <span
                        className={`
                    absolute left-0 -bottom-1 h-0.5 bg-blue-500 rounded-full
                    transition-all duration-300
                    ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}
                  `}
                    />
                  </button>
              );
            })}
          </nav>

          {/* ACCIONES */}
          <div className="hidden lg:flex items-center gap-4">
            <button
                onClick={() => onNavigate('login')}
                className="text-sm text-white hover:text-blue-300 transition cursor-pointer"
            >
              Iniciar sesión
            </button>

            <button
                onClick={() => onNavigate('register')}
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-3 rounded-lg transition flex items-center gap-2 cursor-pointer"
            >
              Crear cuenta <ArrowUpRight size={16} />
            </button>
          </div>

          {/* BOTÓN MÓVIL */}
          <button
              className="lg:hidden text-white p-2 cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MENÚ MÓVIL */}
        {mobileOpen && (
            <div className="lg:hidden bg-[#101a29] border-t border-white/10 p-5 space-y-2">

              {sections.map(([label, id]) => {
                const isActive = activeSection === id;

                return (
                    <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        aria-current={isActive ? 'location' : undefined}
                        className={`
                  block w-full text-left py-3 px-4 rounded-lg
                  text-sm font-medium cursor-pointer
                  transition-all duration-200
                  ${isActive
                            ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-500'
                            : 'text-slate-200 hover:bg-white/5 hover:text-white'
                        }
                `}
                    >
                      {label}
                    </button>
                );
              })}

              <div className="border-t border-white/10 my-3" />

              <button
                  onClick={() => {
                    setMobileOpen(false);
                    onNavigate('login');
                  }}
                  className="block w-full text-left text-white py-3 px-4 cursor-pointer hover:text-blue-300"
              >
                Iniciar sesión
              </button>

              <button
                  onClick={() => {
                    setMobileOpen(false);
                    onNavigate('register');
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-3 cursor-pointer transition"
              >
                Crear cuenta
              </button>
            </div>
        )}
      </header>
  );
}


// --------------------------------------------------
// HERO
// --------------------------------------------------

function Hero({ onNavigate }: PublicProps) {
  return (
      <section
          id="inicio"
          className="relative bg-[#101a29] text-white pt-36 pb-24 lg:pt-44 lg:pb-32 overflow-hidden scroll-mt-20"
      >
        <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#6480a5 1px, transparent 1px)',
              backgroundSize: '35px 35px'
            }}
        />

        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">

          {/* PRESENTACIÓN */}
          <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-xs font-semibold tracking-wider mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              GESTIÓN INTELIGENTE DE MANTENIMIENTO
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight"
            >
              El mantenimiento de tu empresa,
              <span className="text-blue-400"> bajo control.</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-lg text-slate-300 leading-relaxed max-w-xl"
            >
              Centraliza tus activos, órdenes de trabajo y operaciones
              industriales en una plataforma diseñada para adaptarse
              a las necesidades de tu organización.
            </motion.p>

            <div className="flex flex-wrap gap-4 mt-10">
              <button
                  onClick={() => onNavigate('register')}
                  className="px-7 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold flex items-center gap-3 transition"
              >
                Comenzar con AMaint <ArrowRight size={18} />
              </button>

              <button
                  onClick={() =>
                      document.getElementById('soluciones')?.scrollIntoView({
                        behavior: 'smooth'
                      })
                  }
                  className="px-7 py-4 border border-white/20 hover:bg-white/10 rounded-lg font-semibold transition"
              >
                Conocer soluciones
              </button>
            </div>

            <div className="flex flex-wrap gap-6 mt-12 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Check className="text-blue-400" size={17} /> Adaptable
            </span>
              <span className="flex items-center gap-2">
              <Check className="text-blue-400" size={17} /> Multiplanta
            </span>
              <span className="flex items-center gap-2">
              <Check className="text-blue-400" size={17} /> Gestión centralizada
            </span>
            </div>
          </div>

          {/* VISTA ILUSTRATIVA DE AMaint */}
          <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
          >
            <div className="rounded-2xl border border-white/15 bg-[#19283b] p-3 shadow-2xl shadow-black/40">

              <div className="flex items-center justify-between px-3 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Wrench size={15} />
                  </div>
                  <span className="font-semibold text-sm">AMaint Dashboard</span>
                </div>

                <span className="text-xs text-blue-300">
                Vista de ejemplo
              </span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3">
                {[
                  [ClipboardList, 'Órdenes de trabajo'],
                  [Activity, 'Indicadores'],
                  [Factory, 'Activos'],
                  [Clock3, 'Gestión de tareas']
                ].map(([Icon, label]: any) => (
                    <div
                        key={label}
                        className="bg-[#22334a] rounded-xl p-4"
                    >
                      <Icon size={22} className="text-blue-400 mb-4" />

                      <p className="text-sm font-semibold text-white">
                        {label}
                      </p>

                      <p className="text-xs text-slate-400 mt-2">
                        Módulo de AMaint
                      </p>
                    </div>
                ))}
              </div>

              <div className="bg-[#22334a] rounded-xl mx-3 mb-3 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 size={22} className="text-blue-400" />

                  <span className="font-semibold text-sm">
                  Información de mantenimiento
                </span>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed">
                  Consulta y organiza la información de mantenimiento
                  de tu organización desde los módulos de AMaint.
                </p>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-xs text-slate-500">
                    Los indicadores se mostrarán cuando existan
                    registros disponibles.
                  </p>
                </div>
              </div>

            </div>

            <p className="text-center text-xs text-slate-500 mt-4">
              Representación ilustrativa de la plataforma AMaint.
            </p>
          </motion.div>

        </div>
      </section>
  );
}

// --------------------------------------------------
// INTRODUCTION
// --------------------------------------------------

function Introduction() {
  return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <SectionReveal>
            <p className="text-blue-700 font-bold text-xs tracking-widest mb-5">
              UNA NUEVA FORMA DE GESTIONAR
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              Cada activo importa.
              Cada decisión también.
            </h2>
            <p className="mt-7 text-slate-600 text-lg leading-relaxed">
              La gestión industrial requiere información clara, procesos
              organizados y equipos coordinados. AMaint reúne estos elementos
              en un mismo entorno de trabajo.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Desde una máquina hasta múltiples plantas, la plataforma permite
              estructurar la información según la realidad de cada empresa.
            </p>
          </SectionReveal>

          <SectionReveal>
            <div className="grid grid-cols-2 gap-4">
              {[
                [Building2, 'Organización', 'Empresas, plantas y áreas.'],
                [Wrench, 'Activos', 'Equipos y subconjuntos.'],
                [ClipboardList, 'Operaciones', 'Órdenes y actividades.'],
                [BarChart3, 'Información', 'Indicadores y resultados.']
              ].map(([Icon, title, desc]: any) => (
                  <div key={title} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:-translate-y-1 transition">
                    <Icon className="text-blue-600 mb-5" size={28} />
                    <h3 className="font-bold text-slate-900">{title}</h3>
                    <p className="text-sm text-slate-500 mt-2">{desc}</p>
                  </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
  );
}

// --------------------------------------------------
// FEATURES
// --------------------------------------------------

function Features() {
  const features = [
    [Factory, 'Jerarquía de activos', 'Organiza empresas, plantas, áreas, líneas y equipos.'],
    [ClipboardList, 'Órdenes de trabajo', 'Centraliza solicitudes, asignaciones y ejecuciones.'],
    [QrCode, 'Identificación QR', 'Consulta información técnica directamente desde los activos.'],
    [Package, 'Gestión de repuestos', 'Controla inventario, despachos y disponibilidad.'],
    [Activity, 'Indicadores de mantenimiento', 'Analiza MTBF, MTTR y disponibilidad operacional.'],
    [ShieldCheck, 'Control de operaciones', 'Organiza perfiles, responsabilidades y procesos.']
  ];

  return (
      <section id="soluciones" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionReveal className="max-w-3xl mb-16">
            <p className="text-blue-700 font-bold text-xs tracking-widest mb-5">
              SOLUCIONES
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              Todo lo que necesitas para gestionar el mantenimiento.
            </h2>
            <p className="text-slate-600 mt-6 text-lg">
              Herramientas conectadas para mejorar la organización y
              trazabilidad de las operaciones industriales.
            </p>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(([Icon, title, desc]: any, i) => (
                <SectionReveal key={title}>
                  <div className="h-full bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-7">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                    <p className="text-slate-600 leading-relaxed mt-3">{desc}</p>
                    <div className="mt-7 text-xs text-blue-700 font-bold">
                      FUNCIONALIDAD 0{i + 1}
                    </div>
                  </div>
                </SectionReveal>
            ))}
          </div>
        </div>
      </section>
  );
}

// --------------------------------------------------
// HOW IT WORKS
// --------------------------------------------------

function HowItWorks() {
  const steps = [
    ['01', 'Organiza tu empresa', 'Define plantas, áreas, líneas y activos.'],
    ['02', 'Coordina a tu equipo', 'Asigna responsabilidades y gestiona órdenes de trabajo.'],
    ['03', 'Registra las actividades', 'Documenta intervenciones, repuestos y resultados.'],
    ['04', 'Analiza y mejora', 'Utiliza indicadores para tomar decisiones.']
  ];

  return (
      <section id="como-funciona" className="py-24 bg-[#101a29] text-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionReveal className="max-w-3xl mb-16">
            <p className="text-blue-400 font-bold text-xs tracking-widest mb-5">
              CÓMO FUNCIONA
            </p>
            <h2 className="text-3xl md:text-5xl font-bold">
              Del registro a la toma de decisiones.
            </h2>
            <p className="text-slate-300 mt-6 text-lg">
              Un proceso organizado que conecta los activos con las personas
              y la información de mantenimiento.
            </p>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(([number, title, desc]) => (
                <SectionReveal key={number}>
                  <div className="border-t-2 border-blue-500 pt-7">
                    <span className="text-4xl font-bold text-blue-400">{number}</span>
                    <h3 className="text-xl font-bold mt-6">{title}</h3>
                    <p className="text-slate-400 leading-relaxed mt-3">{desc}</p>
                  </div>
                </SectionReveal>
            ))}
          </div>
        </div>
      </section>
  );
}

// --------------------------------------------------
// BENEFITS
// --------------------------------------------------

function Benefits() {
  const benefits = [
    [Clock3, 'Mayor organización', 'Información centralizada para reducir tareas dispersas.'],
    [Users, 'Equipos coordinados', 'Responsabilidades y actividades más claras.'],
    [BarChart3, 'Decisiones informadas', 'Indicadores que permiten analizar el rendimiento.'],
    [Zap, 'Adaptabilidad', 'Una estructura que acompaña las necesidades de cada organización.']
  ];

  return (
      <section id="beneficios" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-blue-700 font-bold text-xs tracking-widest mb-5">
              BENEFICIOS
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              Una gestión más clara, conectada y adaptable.
            </h2>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map(([Icon, title, desc]: any) => (
                <SectionReveal key={title}>
                  <div className="flex gap-6 p-7 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="shrink-0 w-14 h-14 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Icon size={26} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                      <p className="text-slate-600 mt-2 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </SectionReveal>
            ))}
          </div>
        </div>
      </section>
  );
}

// --------------------------------------------------
// PRICING
// --------------------------------------------------



function Pricing({ onNavigate }: PublicProps) {
  const plans = [
    {
      name: 'Personal',
      description:
        'Para quienes necesitan organizar y controlar sus actividades de mantenimiento de forma sencilla.',
      tag: 'PARA USO PERSONAL',
      features: [
        'Gestión básica de activos',
        'Órdenes de trabajo',
        'Organización de actividades',
        'Acceso a funcionalidades esenciales',
        'Servicio mediante suscripción SaaS'
      ],
      action: 'Comenzar con AMaint',
      personal: true
    },
    {
      name: 'Empresarial',
      description:
        'Para organizaciones que necesitan adaptar AMaint a sus procesos y estructura operacional.',
      tag: 'PARA ORGANIZACIONES',
      features: [
        'Gestión de empresas y plantas',
        'Administración de áreas, líneas y activos',
        'Gestión de órdenes y operaciones',
        'Indicadores de mantenimiento',
        'Capacidades según necesidades de la empresa',
        'Alternativas de ampliación y personalización'
      ],
      action: 'Solicitar información',
      personal: false
    }
  ];

  return (
    <section id="planes" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-blue-700 font-bold text-xs tracking-widest mb-5">
            PLANES Y MODALIDADES
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            AMaint se adapta a tus necesidades.
          </h2>

          <p className="text-slate-600 mt-6 text-lg">
            Elige una modalidad según el alcance de tu operación.
            Para necesidades empresariales específicas, podemos evaluar
            una propuesta personalizada.
          </p>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map(plan => (
            <SectionReveal key={plan.name}>
              <div className={`relative h-full bg-white rounded-2xl border p-8 lg:p-10 flex flex-col ${
                !plan.personal
                  ? 'border-blue-600 shadow-xl shadow-blue-900/10'
                  : 'border-slate-200'
              }`}>

                {!plan.personal && (
                  <span className="absolute -top-3 left-8 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    SOLUCIÓN EMPRESARIAL
                  </span>
                )}

                <p className="text-xs font-bold tracking-widest text-blue-700">
                  {plan.tag}
                </p>

                <h3 className="text-3xl font-bold text-slate-900 mt-4">
                  {plan.name}
                </h3>

                <p className="text-slate-500 mt-4 leading-relaxed min-h-20">
                  {plan.description}
                </p>

                <div className="mt-8 py-5 border-y border-slate-200">
                  <p className="text-sm font-semibold text-slate-900">
                    Modalidad comercial
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    {plan.personal
                      ? 'Suscripción SaaS'
                      : 'Propuesta según las necesidades de la organización'}
                  </p>
                </div>

                <p className="font-semibold text-sm text-slate-900 mt-7 mb-5">
                  Características contempladas
                </p>

                <ul className="space-y-4 flex-1">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex gap-3 text-sm text-slate-600">
                      <Check size={18} className="text-blue-600 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    if (plan.personal) {
                      onNavigate('register');
                    } else {
                      document.getElementById('faq')?.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`mt-9 w-full rounded-lg py-3.5 font-semibold transition ${
                    !plan.personal
                      ? 'bg-blue-600 text-white hover:bg-blue-500'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {plan.action}
                  <ArrowRight size={16} className="inline ml-2" />
                </button>
              </div>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-14 bg-[#101a29] text-white rounded-2xl p-8 lg:p-10">
          <div className="max-w-4xl">
            <p className="text-blue-400 text-xs font-bold tracking-widest">
              CONDICIONES COMERCIALES
            </p>

            <h3 className="text-2xl md:text-3xl font-bold mt-4">
              Servicios que pueden crecer junto a tu organización.
            </h3>

            <div className="grid sm:grid-cols-2 gap-7 mt-8">
              <div>
                <h4 className="font-semibold">Suscripción SaaS</h4>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  Incluye el alojamiento del sistema como parte del servicio.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Licencia independiente</h4>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  Modalidad de adquisición separada del SaaS. El alojamiento
                  se cotiza por separado.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Usuarios adicionales</h4>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  Se puede evaluar un cambio de perfil o contratar usuarios
                  adicionales.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Soporte prioritario</h4>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  Disponible como servicio adicional con cobro mensual.
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm mt-8 border-t border-white/10 pt-6">
              Los valores y condiciones comerciales se determinan según
              la modalidad, los servicios contratados y las necesidades
              de cada cliente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



// --------------------------------------------------
// FAQ
// --------------------------------------------------


function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  const questions = [
    [
      '¿Qué es AMaint?',
      'AMaint es una plataforma web de gestión de mantenimiento industrial que permite organizar activos, operaciones y equipos de trabajo.'
    ],
    [
      '¿AMaint sirve para distintas empresas?',
      'Sí. Su estructura está pensada para adaptarse a organizaciones con distintas plantas, áreas, líneas y equipos.'
    ],
    [
      '¿Qué diferencia existe entre Personal y Empresarial?',
      'Personal está orientado a una gestión más sencilla. Empresarial contempla capacidades para organizaciones que necesitan adaptar la plataforma a sus procesos y estructura operacional.'
    ],
    [
      '¿Qué incluye la suscripción SaaS?',
      'La modalidad SaaS contempla el servicio de suscripción con el alojamiento del sistema incluido.'
    ],
    [
      '¿Puedo adquirir una licencia en lugar de contratar SaaS?',
      'Sí. AMaint contempla una modalidad de licencia independiente de la suscripción SaaS. En esta modalidad, el alojamiento se cotiza por separado.'
    ],
    [
      '¿Puedo agregar más usuarios?',
      'Sí. Según las necesidades de la organización se puede evaluar un cambio de perfil o la contratación de usuarios adicionales.'
    ],
    [
      '¿AMaint incluye soporte prioritario?',
      'El soporte prioritario se contempla como un servicio adicional con cobro mensual.'
    ],
    [
      '¿La implementación tiene un costo adicional?',
      'Los servicios de implementación se evalúan y cotizan según las necesidades de cada organización.'
    ]
  ];

  return (
    <section id="faq" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-5">
        <SectionReveal className="text-center mb-14">
          <CircleHelp className="text-blue-600 mx-auto mb-5" size={34} />

          <p className="text-blue-700 font-bold text-xs tracking-widest mb-5">
            PREGUNTAS FRECUENTES
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            Resolvamos tus dudas.
          </h2>
        </SectionReveal>

        <div className="space-y-3">
          {questions.map(([question, answer], i) => (
            <div
              key={question}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="w-full flex justify-between items-center gap-5 p-6 text-left hover:bg-slate-50 transition"
              >
                <span className="font-semibold text-slate-900">
                  {question}
                </span>

                <ChevronDown
                  className={`shrink-0 text-blue-600 transition-transform ${
                    active === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {active === i && (
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  {answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// --------------------------------------------------
// FOOTER
// --------------------------------------------------

function Footer({ onNavigate }: PublicProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
      <footer className="bg-[#101a29] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-14">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 text-2xl font-bold">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Wrench size={21} />
                </div>
                AMaint.
              </div>
              <p className="text-slate-400 mt-6 max-w-md leading-relaxed">
                Tecnología para organizar, controlar y mejorar
                la gestión del mantenimiento industrial.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-5">Explorar</h3>
              <div className="space-y-4 text-sm text-slate-400">
                <button onClick={() => scrollTo('soluciones')} className="block hover:text-white">Soluciones</button>
                <button onClick={() => scrollTo('beneficios')} className="block hover:text-white">Beneficios</button>
                <button onClick={() => scrollTo('planes')} className="block hover:text-white">Planes</button>
                <button onClick={() => scrollTo('faq')} className="block hover:text-white">Preguntas frecuentes</button>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-5">Acceso</h3>
              <div className="space-y-4 text-sm text-slate-400">
                <button onClick={() => onNavigate('login')} className="block hover:text-white">Iniciar sesión</button>
                <button onClick={() => onNavigate('register')} className="block hover:text-white">Crear cuenta</button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} AMaint. Todos los derechos reservados.</p>
            <p>Gestión inteligente de mantenimiento industrial.</p>
          </div>
        </div>
      </footer>
  );
}

// --------------------------------------------------
// LANDING PAGE
// --------------------------------------------------

function PublicLanding({ onNavigate }: PublicProps) {
  return (
      <div className="min-h-screen bg-white font-sans">
        <Navbar onNavigate={onNavigate} />
        <main>
          <Hero onNavigate={onNavigate} />
          <Introduction />
          <Features />
          <HowItWorks />
          <Benefits />
          <Pricing onNavigate={onNavigate} />
          <FAQ />
        </main>
        <Footer onNavigate={onNavigate} />
      </div>
  );
}

// --------------------------------------------------
// APLICACIÓN DE MANTENIMIENTO
// --------------------------------------------------

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'mis-ots-dashboard': return <MisOTsView />;
      case 'escaner-qr-activos': return <EscanerQRView />;
      case 'reportar-falla': return <ReportarFallaView />;
      case 'checklist-cierre': return <ChecklistCierreView />;
      case 'jerarquia-de-activos': return <JerarquiaActivosView />;
      case 'asignacion-de-ots': return <AsignacionOTsView />;
      case 'bodega-repuestos': return <BodegaRepuestosView />;
      case 'sincronizacion-logs': return <SincronizacionLogsView />;
      case 'kpis-confiabilidad': return <KpisConfiabilidadView />;
      case 'costos-disponibilidad': return <CostosDisponibilidadView />;
      default: return <MisOTsView />;
    }
  };

  return (
      <div className="min-h-screen bg-surface text-on-surface flex flex-col font-sans">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-surface-container-lowest/30">
            {renderCurrentView()}
          </main>
        </div>
        <Toast />
      </div>
  );
};

// --------------------------------------------------
// LOGIN Y REGISTRO VISUALES
// --------------------------------------------------





function AuthScreen({ mode, onNavigate }: {
  mode: 'login' | 'register';
  onNavigate: (screen: Screen) => void;
}) {
  const isLogin = mode === 'login';

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const inputClass =
      'w-full bg-slate-100 text-slate-900 placeholder:text-slate-500 border border-slate-300 rounded-lg p-3 mb-5 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        await loginUser(email, password);
        onNavigate('dashboard');
      } else {
        const result = await registerUser(
            name,
            email,
            password,
            company
        );

        if (result.session) {
          onNavigate('dashboard');
        } else {
          setMessage(
              'Cuenta creada. Revisa tu correo para confirmar el registro antes de iniciar sesión.'
          );
        }
      }
    } catch (error) {
      setMessage(
          error instanceof Error
              ? error.message
              : 'No se pudo completar la operación.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-[#101a29] flex items-center justify-center p-5">
        <div className="absolute top-0 left-0 w-full p-6">
          <button onClick={() => onNavigate('home')}
                  className="text-white text-2xl font-bold">
            AMaint<span className="text-blue-400">.</span>
          </button>
        </div>

        <div className="w-full max-w-md bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-7">
            {isLogin ? <Lock /> : <User />}
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            {isLogin ? 'Bienvenido de nuevo' : 'Crear una cuenta'}
          </h1>

          <p className="text-slate-600 mt-3 mb-8">
            {isLogin
                ? 'Ingresa a tu espacio de trabajo AMaint.'
                : 'Comienza a organizar el mantenimiento de tu empresa.'}
          </p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
                <>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Nombre
                  </label>
                  <input required value={name}
                         onChange={e => setName(e.target.value)}
                         className={inputClass} placeholder="Tu nombre" />

                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Empresa
                  </label>
                  <input required value={company}
                         onChange={e => setCompany(e.target.value)}
                         className={inputClass}
                         placeholder="Nombre de tu empresa" />
                </>
            )}

            <label className="block text-sm font-medium text-slate-800 mb-2">
              Correo electrónico
            </label>
            <input required type="email" value={email}
                   onChange={e => setEmail(e.target.value)}
                   className={inputClass} placeholder="correo@empresa.com" />

            <label className="block text-sm font-medium text-slate-800 mb-2">
              Contraseña
            </label>
            <input required type="password" minLength={6}
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   className={`${inputClass} mb-7`}
                   placeholder="Mínimo 6 caracteres" />

            {message && (
                <p role="alert" className="text-sm text-red-600 mb-5 break-words">
                  {message}
                </p>
            )}

            <button type="submit" disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold rounded-lg p-3 transition">
              {loading
                  ? 'Procesando...'
                  : isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-7">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button
                onClick={() => onNavigate(isLogin ? 'register' : 'login')}
                className="text-blue-700 font-semibold ml-2">
              {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
            </button>
          </p>

          <button onClick={() => onNavigate('home')}
                  className="block mx-auto mt-7 text-sm text-slate-500 hover:text-slate-800">
            Volver al sitio público
          </button>
        </div>
      </div>
  );
}

// --------------------------------------------------
// PANEL DE CUENTA
// --------------------------------------------------


function AccountDashboard({
                            onNavigate,
                            session,
                            onLogout
                          }: PublicProps & {
  session: Session;
  onLogout: () => Promise<void>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const userName =
      session.user.user_metadata?.full_name ||
      session.user.email?.split('@')[0] ||
      'Usuario';

  const userEmail = session.user.email || '';

  const options = [
    [User, 'Mi cuenta', 'account'],
    [CreditCard, 'Planes y suscripciones', 'subscription'],
    [LayoutDashboard, 'Mi App AMaint', 'application']
  ] as const;

  const handleNavigate = (destination: Screen) => {
    setMenuOpen(false);
    onNavigate(destination);
  };

  const handleLogout = async () => {
    setMenuOpen(false);
    await onLogout();
  };

  return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="bg-gradient-to-r from-[#155eef] to-[#087eaa] text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

            <button
                onClick={() => handleNavigate('home')}
                className="flex items-center gap-3 text-2xl font-bold"
            >
            <span className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
              <Wrench size={22} />
            </span>
              AMaint.
            </button>

            <div className="relative">
              <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-expanded={menuOpen}
                  className="flex items-center gap-3 border border-white/20 rounded-xl px-4 py-2 hover:bg-white/10 transition"
              >
                <div className="w-9 h-9 rounded-full bg-white text-blue-700 flex items-center justify-center">
                  <User size={19} />
                </div>

                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold">{userName}</p>
                  <p className="text-xs text-blue-100">{userEmail}</p>
                </div>

                <ChevronDown size={17} />
              </button>

              {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-xl z-50 p-2 text-slate-900">

                    <div className="px-3 py-3 border-b border-slate-100 mb-2">
                      <p className="font-semibold">{userName}</p>
                      <p className="text-xs text-slate-500">{userEmail}</p>
                    </div>

                    {options.map(([Icon, label, destination]) => (
                        <button
                            key={destination}
                            onClick={() => handleNavigate(destination)}
                            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-sm text-left transition"
                        >
                          <Icon size={18} className="text-blue-600" />
                          {label}
                        </button>
                    ))}

                    <div className="border-t border-slate-200 my-2" />

                    <button
                        onClick={() => {
                          // Los consejos se incorporarán cuando exista
                          // una sección real para este contenido.
                          setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-sm text-left transition text-slate-600"
                    >
                      <Zap size={18} className="text-blue-600" />
                      Consejos y novedades
                    </button>

                    <div className="border-t border-slate-200 my-2" />

                    <button
                        onClick={() => void handleLogout()}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-sm text-left text-red-600 transition"
                    >
                      <LogOut size={18} />
                      Cerrar sesión
                    </button>
                  </div>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-5 py-14">

          <p className="text-blue-700 font-bold text-xs tracking-widest">
            ESPACIO PERSONAL
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-3">
            ¡Hola, {userName}!
          </h1>

          <p className="text-slate-500 mt-3">
            Desde aquí puedes administrar tu cuenta y acceder a tus servicios.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {options.map(([Icon, title, destination]) => (
                <button
                    key={destination}
                    onClick={() => handleNavigate(destination)}
                    className="bg-white border border-slate-200 rounded-2xl p-8 text-left hover:border-blue-400 hover:shadow-lg transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Icon size={23} />
                  </div>

                  <h2 className="text-xl font-bold mt-6">{title}</h2>

                  <p className="text-sm text-slate-500 mt-3">
                    {destination === 'account' &&
                        'Consulta y administra tus datos personales.'}

                    {destination === 'subscription' &&
                        'Consulta las modalidades comerciales de AMaint.'}

                    {destination === 'application' &&
                        'Accede a las herramientas de mantenimiento de tu empresa.'}
                  </p>

                  <p className="text-sm text-blue-700 font-semibold mt-7">
                    Acceder <ArrowRight className="inline" size={16} />
                  </p>
                </button>
            ))}
          </div>
        </main>
      </div>
  );
}

// --------------------------------------------------
// VISTA DE CUENTA Y SUSCRIPCIÓN
// --------------------------------------------------

function SimpleAccountView({ mode, onNavigate, session }: {
  mode: 'account' | 'subscription';
  onNavigate: (screen: Screen) => void;
  session: Session;
}) {
  const isAccount = mode === 'account';

  return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200 px-6 py-5 flex justify-between">
          <button onClick={() => onNavigate('dashboard')} className="font-bold text-xl">
            AMaint<span className="text-blue-600">.</span>
          </button>
          <button onClick={() => onNavigate('dashboard')}
                  className="text-sm text-slate-600 hover:text-blue-700">
            Volver al menú
          </button>
        </header>
        <main className="max-w-4xl mx-auto p-6 md:py-16">
          <p className="text-blue-700 font-bold text-xs tracking-widest">
            CONFIGURACIÓN DE CUENTA
          </p>
          <h1 className="text-3xl font-bold mt-3 text-slate-900">
            {isAccount ? 'Mi cuenta' : 'Planes y suscripciones'}
          </h1>
          <p className="text-slate-500 mt-3">
            {isAccount
                ? 'Información y administración de tu perfil.'
                : 'Consulta las modalidades comerciales de AMaint.'}
          </p>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 mt-10">
            {isAccount ? (
                <>
                  <User className="text-blue-600" size={28} />
                  <h2 className="text-xl font-bold mt-5">Información personal</h2>
                  <div className="mt-4 space-y-3 text-sm">
                    <p><span className="font-semibold text-slate-700">Nombre:</span> {session.user.user_metadata?.full_name || 'Sin nombre registrado'}</p>
                    <p><span className="font-semibold text-slate-700">Correo:</span> {session.user.email || 'No disponible'}</p>
                    <p><span className="font-semibold text-slate-700">ID de usuario:</span> <span className="font-mono text-xs break-all">{session.user.id}</span></p>
                    <p className="text-xs text-slate-500">Identidad administrada por Supabase Auth.</p>
                  </div>
                </>
            ) : (
                <>
                  <CreditCard className="text-blue-600" size={28} />
                  <h2 className="text-xl font-bold mt-5">Modalidades AMaint</h2>
                  <p className="text-slate-500 mt-3">
                    Puedes revisar los planes SaaS y la modalidad de licencia
                    desde nuestra página comercial.
                  </p>
                  <button onClick={() => onNavigate('home')}
                          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
                    Ver planes comerciales
                  </button>
                </>
            )}
          </div>
        </main>
      </div>
  );
}

// --------------------------------------------------
// APP PRINCIPAL
// --------------------------------------------------

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const initializeAuth = async () => {
      const confirmed =
          new URLSearchParams(window.location.search)
              .get('auth') === 'confirmed';

      const { data, error } = await supabase.auth.getSession();

      if (!active) return;

      if (error) {
        console.error('No se pudo recuperar la sesión:', error.message);
      }

      if (confirmed) {
        if (data.session) {
          await supabase.auth.signOut();
        }

        if (!active) return;

        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );

        setSession(null);
        setScreen('login');
        setAuthLoading(false);
        return;
      }

      setSession(data.session);
      setAuthLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthLoading(false);

      if (!nextSession) {
        setScreen(current =>
            ['dashboard', 'account', 'subscription', 'application'].includes(current)
                ? 'home'
                : current
        );
      } else {
        setScreen(current =>
            ['login', 'register', 'home'].includes(current)
                ? 'dashboard'
                : current
        );
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);
  const protectedScreens: Screen[] = ['dashboard', 'account', 'subscription', 'application'];
  useEffect(() => {
    if (!authLoading && protectedScreens.includes(screen) && !session) setScreen('login');
  }, [authLoading, screen, session]);

  if (authLoading) return <div className="min-h-screen bg-[#101a29] text-white flex items-center justify-center">Cargando sesión AMaint...</div>;


  if (screen === 'application' && session) {
    return (
        <AppProvider>
          <div className="min-h-screen">

            <div className="bg-gradient-to-r from-[#155eef] to-[#087eaa] text-white px-5 py-3 flex justify-between items-center shadow-md">

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                  <Wrench size={20} />
                </div>

                <div>
                  <p className="font-bold">AMaint.</p>
                  <p className="text-xs text-blue-100">Mi App AMaint</p>
                </div>
              </div>

              <button
                  onClick={() => setScreen('dashboard')}
                  className="text-sm hover:bg-white/10 px-4 py-2 rounded-lg transition"
              >
                Volver al panel
              </button>

            </div>

            <MainContent />

          </div>
        </AppProvider>
    );
  }


  if (screen === 'home') {
    return <PublicLanding onNavigate={setScreen} />;
  }

  if (screen === 'login' || screen === 'register') {
    return <AuthScreen mode={screen} onNavigate={setScreen} />;
  }

  if (screen === 'dashboard' && session) {
    return <AccountDashboard onNavigate={setScreen} session={session} onLogout={logoutUser} />;
  }

  if ((screen === 'account' || screen === 'subscription') && session) {
    return <SimpleAccountView mode={screen} onNavigate={setScreen} session={session} />;
  }

  return <PublicLanding onNavigate={setScreen} />;
}
