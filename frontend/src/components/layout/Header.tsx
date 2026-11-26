import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';
import { QrCode, RefreshCw, Clock, Layers, Menu, X, UserRound, LogOut, Building2, Settings, ChevronRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { setCurrentView, isSyncing, triggerManualSync } = useApp();
  const [time, setTime] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [email, setEmail] = useState('Cuenta autenticada');
  const [displayName, setDisplayName] = useState('Usuario AMaint');
  const [company, setCompany] = useState('Espacio empresarial');
  const [role, setRole] = useState('Usuario');

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('es-CL', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    update();
    const timer = window.setInterval(update, 30000);
    let active = true;
    const loadIdentity = async () => {
      const { data } = await supabase.auth.getUser();
      if (!active || !data.user) return;
      const user = data.user;
      setEmail(user.email ?? 'Correo no disponible');
      setDisplayName(user.user_metadata?.full_name || user.user_metadata?.name || 'Usuario AMaint');
      const { data: memberships } = await supabase.from('usuario_empresa').select('empresa_id, rol').eq('usuario_id', user.id).eq('activo', true).limit(1);
      const membership = memberships?.[0];
      if (membership && active) {
        setRole(String(membership.rol).replaceAll('_', ' '));
        const { data: companyData } = await supabase.from('empresa').select('razon_social, nombre_comercial').eq('id', membership.empresa_id).maybeSingle();
        if (active && companyData) setCompany(companyData.nombre_comercial || companyData.razon_social || 'Empresa');
      }
    };
    void loadIdentity();
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  const signOut = async () => { await supabase.auth.signOut(); window.location.assign('/'); };

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface-container-low border-b border-outline/10 text-on-surface shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Layers className="w-6 h-6 text-primary" /></div>
            <div className="min-w-0">
              <div className="font-bold text-lg truncate">AMaint</div>
              <p className="text-xs text-on-surface-variant truncate">{company}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-on-surface-variant"><Clock className="w-3.5 h-3.5" />{time} CLT</span>
            <button onClick={() => setCurrentView('escaner-qr-activos')} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20"><QrCode className="w-4 h-4" /><span className="hidden md:inline">Escanear activo</span></button>
            <button onClick={triggerManualSync} disabled={isSyncing} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-outline/20 text-xs font-semibold hover:bg-surface-container disabled:opacity-60"><RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} /><span className="hidden md:inline">{isSyncing ? 'Sincronizando' : 'Sincronizar'}</span></button>
            <button onClick={() => setDrawerOpen(true)} aria-label="Abrir menú de usuario" className="flex items-center gap-2 p-2 rounded-xl hover:bg-surface-container border border-outline/10"><UserRound className="w-5 h-5" /><span className="hidden lg:block text-left"><span className="block text-xs font-semibold">{displayName}</span><span className="block text-[10px] text-on-surface-variant">{role}</span></span><Menu className="w-4 h-4" /></button>
          </div>
        </div>
      </header>
      {drawerOpen && <div className="fixed inset-0 z-[70]">
        <button aria-label="Cerrar menú" onClick={() => setDrawerOpen(false)} className="absolute inset-0 bg-black/50" />
        <aside className="absolute right-0 top-0 h-full w-full max-w-sm bg-surface-container-lowest text-on-surface shadow-2xl p-5 flex flex-col animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between pb-5 border-b border-outline/15"><div className="font-bold text-lg">Mi espacio AMaint</div><button onClick={() => setDrawerOpen(false)} aria-label="Cerrar"><X /></button></div>
          <div className="py-5 border-b border-outline/15"><div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3"><UserRound /></div><p className="font-semibold">{displayName}</p><p className="text-xs text-on-surface-variant break-all">{email}</p><div className="mt-3 text-xs rounded-lg bg-primary/10 text-primary px-3 py-2">{company} · {role}</div></div>
          <nav className="py-4 space-y-1">
            <button onClick={() => { setDrawerOpen(false); setCurrentView('jerarquia-de-activos'); }} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-container text-sm"><span className="flex items-center gap-3"><Building2 className="w-4 h-4" /> Estructura industrial</span><ChevronRight className="w-4 h-4" /></button>
            <button onClick={() => { setDrawerOpen(false); setCurrentView('mis-ots-dashboard'); }} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-container text-sm"><span className="flex items-center gap-3"><Settings className="w-4 h-4" /> Panel de trabajo</span><ChevronRight className="w-4 h-4" /></button>
          </nav>
          <div className="mt-auto border-t border-outline/15 pt-4"><button onClick={() => void signOut()} className="w-full flex items-center gap-3 p-3 rounded-xl text-error hover:bg-error/10 text-sm font-semibold"><LogOut className="w-4 h-4" /> Cerrar sesión</button></div>
        </aside>
      </div>}
    </>
  );
};
