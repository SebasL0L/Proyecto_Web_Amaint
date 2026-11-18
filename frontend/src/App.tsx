
import React, { useState } from 'react';
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

type Screen =
    | 'home'
    | 'login'
    | 'register'
    | 'dashboard'
    | 'account'
    | 'subscription'
    | 'application';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'mis-ots-dashboard':
        return <MisOTsView />;
      case 'escaner-qr-activos':
        return <EscanerQRView />;
      case 'reportar-falla':
        return <ReportarFallaView />;
      case 'checklist-cierre':
        return <ChecklistCierreView />;
      case 'jerarquia-de-activos':
        return <JerarquiaActivosView />;
      case 'asignacion-de-ots':
        return <AsignacionOTsView />;
      case 'bodega-repuestos':
        return <BodegaRepuestosView />;
      case 'sincronizacion-logs':
        return <SincronizacionLogsView />;
      case 'kpis-confiabilidad':
        return <KpisConfiabilidadView />;
      case 'costos-disponibilidad':
        return <CostosDisponibilidadView />;
      default:
        return <MisOTsView />;
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

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  // Aplicación de mantenimiento
  if (screen === 'application') {
    return (
        <AppProvider>
          <div className="min-h-screen">
            <div className="bg-slate-900 text-white px-5 py-2 flex justify-between items-center">
              <span className="text-sm">AMaint · Aplicación</span>
              <button
                  onClick={() => setScreen('dashboard')}
                  className="text-sm hover:underline"
              >
                Volver al panel
              </button>
            </div>
            <MainContent />
          </div>
        </AppProvider>
    );
  }

  // Panel principal del usuario
  if (screen === 'dashboard') {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
          <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
            <span className="text-2xl font-bold text-slate-900">AMaint</span>
            <button
                onClick={() => setScreen('home')}
                className="text-sm text-slate-600 hover:text-slate-900"
            >
              Cerrar sesión
            </button>
          </header>

          <main className="max-w-6xl mx-auto px-6 py-12">
            <section className="mb-10">
              <p className="text-sm font-semibold text-blue-700 mb-2">
                ESPACIO PERSONAL
              </p>
              <h1 className="text-3xl font-bold text-slate-900">
                ¡Bienvenido a AMaint!
              </h1>
              <p className="text-slate-500 mt-3">
                Desde aquí puedes administrar tu cuenta y acceder a tus servicios.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                  onClick={() => setScreen('account')}
                  className="bg-white border border-slate-200 rounded-xl p-6 text-left hover:border-blue-400 hover:shadow-sm transition"
              >
                <div className="text-2xl mb-4">👤</div>
                <h2 className="text-lg font-semibold">Mi cuenta</h2>
                <p className="text-sm text-slate-500 mt-2">
                  Consulta y administra tus datos personales.
                </p>
                <p className="text-sm text-blue-700 font-semibold mt-5">
                  Administrar cuenta →
                </p>
              </button>

              <button
                  onClick={() => setScreen('subscription')}
                  className="bg-white border border-slate-200 rounded-xl p-6 text-left hover:border-blue-400 hover:shadow-sm transition"
              >
                <div className="text-2xl mb-4">📋</div>
                <h2 className="text-lg font-semibold">Suscripción y licencias</h2>
                <p className="text-sm text-slate-500 mt-2">
                  Consulta los planes y las licencias disponibles.
                </p>
                <p className="text-sm text-blue-700 font-semibold mt-5">
                  Ver suscripciones →
                </p>
              </button>

              <button
                  onClick={() => setScreen('application')}
                  className="bg-white border border-slate-200 rounded-xl p-6 text-left hover:border-blue-400 hover:shadow-sm transition"
              >
                <div className="text-2xl mb-4">⚙️</div>
                <h2 className="text-lg font-semibold">Aplicación AMaint</h2>
                <p className="text-sm text-slate-500 mt-2">
                  Accede a las herramientas de gestión de mantenimiento.
                </p>
                <p className="text-sm text-blue-700 font-semibold mt-5">
                  Abrir aplicación →
                </p>
              </button>
            </section>
          </main>

          <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-500">
            AMaint · Tu espacio de trabajo
          </footer>
        </div>
    );
  }

  // Sitio público, inicio de sesión y registro
  return (
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <button
              onClick={() => setScreen('home')}
              className="text-2xl font-bold tracking-tight text-slate-900"
          >
            AMaint
          </button>

          <nav className="flex items-center gap-5 text-sm">
            <button onClick={() => setScreen('home')}>Inicio</button>
            <button onClick={() => setScreen('login')}>Iniciar sesión</button>
            <button
                onClick={() => setScreen('register')}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg"
            >
              Crear cuenta
            </button>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-20">
          {screen === 'home' && (
              <section className="max-w-2xl">
                <p className="text-sm font-semibold text-blue-700 mb-4">
                  GESTIÓN DE MANTENIMIENTO INDUSTRIAL
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                  El mantenimiento de tu empresa, en un solo lugar.
                </h1>
                <p className="text-lg text-slate-600 mt-6 leading-relaxed">
                  AMaint permite organizar activos, órdenes de trabajo,
                  mantenimiento y operaciones desde una plataforma web.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <button
                      onClick={() => setScreen('register')}
                      className="bg-slate-900 text-white px-6 py-3 rounded-lg"
                  >
                    Comenzar
                  </button>
                  <button
                      onClick={() => setScreen('login')}
                      className="border border-slate-300 px-6 py-3 rounded-lg"
                  >
                    Ya tengo una cuenta
                  </button>
                </div>
              </section>
          )}

          {screen === 'login' && (
              <section className="max-w-md mx-auto bg-white border border-slate-200 rounded-xl p-8">
                <h1 className="text-2xl font-bold">Iniciar sesión</h1>
                <p className="text-slate-500 mt-2 mb-6">
                  Accede a tu espacio de trabajo AMaint.
                </p>

                <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setScreen('dashboard');
                    }}
                >
                  <label className="block text-sm mb-2">Correo electrónico</label>
                  <input
                      type="email"
                      required
                      className="w-full border rounded-lg p-3 mb-4"
                      placeholder="correo@empresa.com"
                  />

                  <label className="block text-sm mb-2">Contraseña</label>
                  <input
                      type="password"
                      required
                      className="w-full border rounded-lg p-3 mb-6"
                      placeholder="Tu contraseña"
                  />

                  <button className="w-full bg-slate-900 text-white p-3 rounded-lg">
                    Iniciar sesión
                  </button>
                </form>

                <p className="text-sm text-center mt-6">
                  ¿No tienes cuenta?{' '}
                  <button
                      onClick={() => setScreen('register')}
                      className="text-blue-700 font-semibold"
                  >
                    Crear cuenta
                  </button>
                </p>
              </section>
          )}

          {screen === 'register' && (
              <section className="max-w-md mx-auto bg-white border border-slate-200 rounded-xl p-8">
                <h1 className="text-2xl font-bold">Crear cuenta</h1>
                <p className="text-slate-500 mt-2 mb-6">
                  Comienza a utilizar AMaint.
                </p>

                <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert('El registro todavía no está conectado al backend.');
                    }}
                >
                  <label className="block text-sm mb-2">Nombre</label>
                  <input
                      required
                      className="w-full border rounded-lg p-3 mb-4"
                      placeholder="Tu nombre"
                  />

                  <label className="block text-sm mb-2">Correo electrónico</label>
                  <input
                      type="email"
                      required
                      className="w-full border rounded-lg p-3 mb-4"
                      placeholder="correo@empresa.com"
                  />

                  <label className="block text-sm mb-2">Contraseña</label>
                  <input
                      type="password"
                      required
                      className="w-full border rounded-lg p-3 mb-6"
                      placeholder="Crea una contraseña"
                  />

                  <button className="w-full bg-slate-900 text-white p-3 rounded-lg">
                    Crear cuenta
                  </button>
                </form>

                <p className="text-sm text-center mt-6">
                  ¿Ya tienes cuenta?{' '}
                  <button
                      onClick={() => setScreen('login')}
                      className="text-blue-700 font-semibold"
                  >
                    Iniciar sesión
                  </button>
                </p>
              </section>
          )}
        </main>

        <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-500">
          AMaint · Plataforma de gestión de mantenimiento industrial
        </footer>
      </div>
  );
}
