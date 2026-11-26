import React from 'react';
import { useApp } from '../../context/AppContext';
import { ViewPath } from '../../types';
import { ClipboardList, QrCode, AlertTriangle, CheckSquare, Network, Users, Package, Activity, DollarSign, Terminal, Factory, Wrench } from 'lucide-react';

interface NavItem { id: ViewPath; label: string; icon: React.ComponentType<{ className?: string }>; }
export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView } = useApp();
  const groups: { title: string; items: NavItem[] }[] = [
    { title: 'OPERACIÓN', items: [
      { id: 'mis-ots-dashboard', label: 'Resumen de trabajo', icon: ClipboardList },
      { id: 'reportar-falla', label: 'Reportar incidencia', icon: AlertTriangle },
      { id: 'checklist-cierre', label: 'Checklist de trabajo', icon: CheckSquare },
      { id: 'escaner-qr-activos', label: 'Escanear activo', icon: QrCode },
    ]},
    { title: 'EMPRESA Y ACTIVOS', items: [
      { id: 'jerarquia-de-activos', label: 'Estructura industrial', icon: Network },
      { id: 'asignacion-de-ots', label: 'Asignación de trabajos', icon: Users },
      { id: 'bodega-repuestos', label: 'Inventario y repuestos', icon: Package },
    ]},
    { title: 'ANÁLISIS', items: [
      { id: 'kpis-confiabilidad', label: 'Indicadores', icon: Activity },
      { id: 'costos-disponibilidad', label: 'Costos y disponibilidad', icon: DollarSign },
      { id: 'sincronizacion-logs', label: 'Actividad y sincronización', icon: Terminal },
    ]},
  ];
  return <aside className="w-64 bg-surface-container-lowest border-r border-outline/10 shrink-0 h-[calc(100vh-65px)] overflow-y-auto">
    <div className="p-4 border-b border-outline/10"><div className="flex items-center gap-2 text-sm font-semibold"><Factory className="w-4 h-4 text-primary" /> Espacio de empresa</div><p className="text-xs text-on-surface-variant mt-1">Gestión de mantenimiento</p></div>
    <nav className="p-3 space-y-6">{groups.map(group => <section key={group.title}><h2 className="px-3 mb-2 text-[10px] font-bold tracking-widest text-outline">{group.title}</h2><div className="space-y-1">{group.items.map(item => { const Icon=item.icon; const active=currentView===item.id; return <button key={item.id} onClick={()=>setCurrentView(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition ${active ? 'bg-primary/10 text-primary border-l-2 border-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}><Icon className="w-4 h-4 shrink-0"/><span>{item.label}</span></button>; })}</div></section>)}</nav>
    <div className="mx-3 mt-3 mb-5 rounded-xl bg-surface-container-low p-3 text-xs text-on-surface-variant"><div className="flex items-center gap-2 font-semibold text-on-surface mb-1"><Wrench className="w-3.5 h-3.5 text-primary"/> AMaint</div>Los registros empresariales se consultan desde la base de datos conectada.</div>
  </aside>;
};
