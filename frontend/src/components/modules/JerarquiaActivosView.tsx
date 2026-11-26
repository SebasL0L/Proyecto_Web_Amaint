import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Building2, Factory, Layers3, GitBranch, Settings, Component, RefreshCw, AlertCircle } from 'lucide-react';

type Row = { id: number; nombre: string; empresa_id?: number; planta_id?: number; area_id?: number; linea_id?: number; maquina_id?: number };
type Company = { id: number; razon_social: string; nombre_comercial?: string | null };
type TreeData = { company: Company | null; plants: Row[]; areas: Row[]; lines: Row[]; machines: Row[]; components: Row[] };

export const JerarquiaActivosView: React.FC = () => {
  const [data, setData] = useState<TreeData>({ company: null, plants: [], areas: [], lines: [], machines: [], components: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const load = async () => {
    setLoading(true); setError('');
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) throw new Error('Tu sesión no está disponible. Vuelve a iniciar sesión.');
      const { data: memberships, error: membershipError } = await supabase.from('usuario_empresa').select('empresa_id').eq('usuario_id', userData.user.id).eq('activo', true).limit(1);
      if (membershipError) throw membershipError;
      const companyId = memberships?.[0]?.empresa_id;
      if (!companyId) throw new Error('Tu usuario todavía no tiene una empresa asignada.');
      const [companyRes, plantsRes] = await Promise.all([
        supabase.from('empresa').select('id, razon_social, nombre_comercial').eq('id', companyId).maybeSingle(),
        supabase.from('planta').select('id, nombre, empresa_id').eq('empresa_id', companyId).order('id')
      ]);
      if (companyRes.error) throw companyRes.error;
      if (plantsRes.error) throw plantsRes.error;
      const plantIds = (plantsRes.data ?? []).map(x => x.id);
      const areasRes = plantIds.length ? await supabase.from('area').select('id, nombre, planta_id').in('planta_id', plantIds).order('id') : { data: [], error: null };
      if (areasRes.error) throw areasRes.error;
      const areaIds = (areasRes.data ?? []).map(x => x.id);
      const linesRes = areaIds.length ? await supabase.from('linea').select('id, nombre, area_id').in('area_id', areaIds).order('id') : { data: [], error: null };
      if (linesRes.error) throw linesRes.error;
      const lineIds = (linesRes.data ?? []).map(x => x.id);
      const machinesRes = lineIds.length ? await supabase.from('maquina').select('id, nombre, linea_id').in('linea_id', lineIds).order('id') : { data: [], error: null };
      if (machinesRes.error) throw machinesRes.error;
      const machineIds = (machinesRes.data ?? []).map(x => x.id);
      const componentsRes = machineIds.length ? await supabase.from('componente').select('id, nombre, maquina_id').in('maquina_id', machineIds).order('id') : { data: [], error: null };
      if (componentsRes.error) throw componentsRes.error;
      setData({ company: companyRes.data, plants: plantsRes.data ?? [], areas: areasRes.data ?? [], lines: linesRes.data ?? [], machines: machinesRes.data ?? [], components: componentsRes.data ?? [] });
    } catch (e) { setError(e instanceof Error ? e.message : 'No se pudo cargar la estructura empresarial.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);
  const counts = useMemo(() => [data.plants.length, data.areas.length, data.lines.length, data.machines.length, data.components.length], [data]);
  const toggle = (key: string) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  const renderNode = (key: string, label: string, id: number, icon: React.ReactNode, children: React.ReactNode) => <div key={key} className="border-l border-outline/15 ml-3 pl-3"><button onClick={() => toggle(key)} className="w-full flex items-center gap-3 text-left rounded-lg p-3 hover:bg-surface-container transition"><span className="text-primary">{icon}</span><span className="flex-1"><span className="block text-sm font-semibold text-on-surface">{label}</span><span className="block text-xs text-on-surface-variant">ID {id}</span></span><span className="text-xs text-primary">{expanded[key] ? 'Ocultar' : 'Ver detalle'}</span></button>{expanded[key] && <div className="pb-2">{children}</div>}</div>;
  return <div className="p-5 sm:p-7 max-w-6xl mx-auto space-y-6">
    <div className="flex flex-wrap justify-between items-start gap-3"><div><p className="text-xs font-bold tracking-widest text-primary uppercase">Empresa · Activos</p><h1 className="text-2xl font-bold mt-2">Estructura industrial</h1><p className="text-sm text-on-surface-variant mt-1">Información consultada directamente desde Supabase.</p></div><button onClick={() => void load()} disabled={loading} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline/20 text-sm hover:bg-surface-container disabled:opacity-50"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}/>Actualizar</button></div>
    {error && <div className="p-4 rounded-xl border border-error/30 bg-error/5 text-error flex gap-3"><AlertCircle className="w-5 h-5 shrink-0"/><p className="text-sm">{error}</p></div>}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">{['Plantas','Áreas','Líneas','Máquinas','Componentes'].map((label,i)=><div key={label} className="rounded-xl border border-outline/15 bg-surface-container-low p-4"><p className="text-2xl font-bold">{loading ? '—' : counts[i]}</p><p className="text-xs text-on-surface-variant">{label}</p></div>)}</div>
    <section className="rounded-2xl border border-outline/15 bg-surface-container-low p-4 sm:p-6"><div className="flex items-center gap-3 pb-4 border-b border-outline/10"><Building2 className="w-6 h-6 text-primary"/><div><h2 className="font-bold">{data.company?.nombre_comercial || data.company?.razon_social || (loading ? 'Cargando empresa…' : 'Empresa no disponible')}</h2><p className="text-xs text-on-surface-variant">Jerarquía asociada a tu cuenta autenticada</p></div></div>
    {loading ? <p className="py-8 text-sm text-on-surface-variant">Consultando empresa y activos…</p> : !error && data.plants.length === 0 ? <p className="py-8 text-sm text-on-surface-variant">La empresa no tiene plantas registradas todavía.</p> : <div className="pt-4 space-y-2">{data.plants.map(plant => renderNode('p'+plant.id, plant.nombre, plant.id, <Factory className="w-4 h-4"/>, data.areas.filter(a=>a.planta_id===plant.id).map(area=>renderNode('a'+area.id,area.nombre,area.id,<Layers3 className="w-4 h-4"/>,data.lines.filter(l=>l.area_id===area.id).map(line=>renderNode('l'+line.id,line.nombre,line.id,<GitBranch className="w-4 h-4"/>,data.machines.filter(m=>m.linea_id===line.id).map(machine=>renderNode('m'+machine.id,machine.nombre,machine.id,<Settings className="w-4 h-4"/>,data.components.filter(c=>c.maquina_id===machine.id).map(component=><div key={component.id} className="ml-10 flex items-center gap-2 py-2 text-sm text-on-surface-variant"><Component className="w-4 h-4 text-secondary"/>{component.nombre}<span className="text-xs opacity-60">ID {component.id}</span></div>)))))))))}</div>}</section>
  </div>;
};
