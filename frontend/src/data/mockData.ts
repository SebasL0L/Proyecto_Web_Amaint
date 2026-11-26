import { WorkOrder, AssetNode, SparePartItem, DispatchVoucher, SyncPacket, ForensicLog, Technician } from '../types';

// Datos de demostración para presentar el flujo funcional de AMaint. No representan registros reales de Andina.
export const INITIAL_WORK_ORDERS: WorkOrder[] = [
{id:'demo-ot-001',code:'DEMO-OT-001',assetCode:'MAQ-003',assetName:'Compresor Industrial',location:'Planta Industrial Andina / Mantenimiento Mecánico',priority:'critical',status:'in_progress',type:'CORRECTIVO',description:'Vibración elevada; revisar alineación y rodamientos.',assignedTechnician:'Carlos Mendoza',assignedTechnicianId:'DEMO-TEC-01',assignedTechnicianRole:'Técnico Mecánico',timeElapsed:'01h 20m',slaLimit:'12:30 hrs',slaRemaining:'45 min',progressPercent:65,currentStep:'Inspección de rodamientos',reservedParts:['ROD-6205'],costEstimate:'$185.000 CLP',reportedAt:'08:15 hrs'},
{id:'demo-ot-002',code:'DEMO-OT-002',assetCode:'MAQ-005',assetName:'Envasadora Automática',location:'Planta Industrial Andina / Línea de Envasado',priority:'high',status:'pending',type:'CORRECTIVO',description:'Sensor de alimentación con lecturas intermitentes; verificar cableado.',slaLimit:'14:00 hrs',progressPercent:0,costEstimate:'$65.000 CLP',reportedAt:'09:05 hrs'},
{id:'demo-ot-003',code:'DEMO-OT-003',assetCode:'MAQ-001',assetName:'Compresor Industrial Actualizado',location:'Planta Industrial Andina / Línea de Producción Actualizada',priority:'medium',status:'pending',type:'PREVENTIVO',description:'Inspección de filtros, presión y nivel de lubricante.',slaLimit:'16:00 hrs',progressPercent:0,reportedAt:'07:30 hrs'},
{id:'demo-ot-004',code:'DEMO-OT-004',assetCode:'MAQ-004',assetName:'Motor Eléctrico Principal',location:'Planta Industrial Andina / Mantenimiento Mecánico',priority:'medium',status:'completed',type:'PREVENTIVO',description:'Lubricación y revisión de temperatura completadas.',assignedTechnician:'María Torres',assignedTechnicianId:'DEMO-TEC-02',assignedTechnicianRole:'Técnica Eléctrica',slaLimit:'10:00 hrs',progressPercent:100,reportedAt:'07:10 hrs'},
{id:'demo-ot-005',code:'DEMO-OT-005',assetCode:'MAQ-003',assetName:'Compresor Industrial',location:'Planta Industrial Andina / Mantenimiento Mecánico',priority:'low',status:'completed',type:'PREVENTIVO',description:'Limpieza de radiador y revisión de fugas completadas.',assignedTechnician:'Javier Soto',assignedTechnicianId:'DEMO-TEC-03',assignedTechnicianRole:'Técnico Mecánico',slaLimit:'11:00 hrs',progressPercent:100,reportedAt:'06:50 hrs'},
{id:'demo-ot-006',code:'DEMO-OT-006',assetCode:'MAQ-005',assetName:'Envasadora Automática',location:'Planta Industrial Andina / Línea de Envasado',priority:'high',status:'pending',type:'PREVENTIVO',description:'Inspección de correas, alimentación y resguardos de seguridad.',slaLimit:'15:30 hrs',progressPercent:0,reportedAt:'09:20 hrs'},
{id:'demo-ot-007',code:'DEMO-OT-007',assetCode:'MAQ-006',assetName:'Bomba centrífuga de proceso',location:'Planta Los Andes / Servicios auxiliares',priority:'high',status:'in_progress',type:'CORRECTIVO',description:'Presión de descarga bajo el rango nominal; revisar sello mecánico y posible cavitación.',assignedTechnician:'Daniela Rojas',assignedTechnicianId:'DEMO-TEC-04',assignedTechnicianRole:'Técnica Instrumentista',timeElapsed:'00h 35m',slaLimit:'13:30 hrs',progressPercent:40,currentStep:'Medición de presión y caudal',reservedParts:['SEL-VITON'],costEstimate:'$92.000 CLP',reportedAt:'09:40 hrs'},
{id:'demo-ot-008',code:'DEMO-OT-008',assetCode:'MAQ-004',assetName:'Motor eléctrico principal',location:'Planta Los Andes / Línea de producción',priority:'low',status:'pending',type:'PREVENTIVO',description:'Medición de temperatura, revisión de conexiones y limpieza de ventilación.',slaLimit:'17:00 hrs',progressPercent:0,reportedAt:'10:05 hrs'}
];

// Datos de demostración para presentar el flujo funcional de AMaint. No representan registros reales de Andina.
export const INITIAL_TECHNICIANS: Technician[] = [
{id:'DEMO-TEC-01',name:'Carlos Mendoza',role:'Técnico Mecánico',specialty:'Mecánica',avatar:'CM',status:'busy',shift:'Turno A · 07:00–15:00',currentOT:'DEMO-OT-001',loadPercent:75,lotoCertified:true,matchScore:96},
{id:'DEMO-TEC-02',name:'María Torres',role:'Técnica Eléctrica',specialty:'Eléctrica',avatar:'MT',status:'available',shift:'Turno A · 07:00–15:00',loadPercent:45,lotoCertified:true,matchScore:94},
{id:'DEMO-TEC-03',name:'Javier Soto',role:'Técnico Mecánico',specialty:'Mecánica',avatar:'JS',status:'available',shift:'Turno A · 07:00–15:00',loadPercent:30,lotoCertified:true,matchScore:91},
{id:'DEMO-TEC-04',name:'Daniela Rojas',role:'Técnica Instrumentista',specialty:'Instrumentación',avatar:'DR',status:'available',shift:'Turno A · 07:00–15:00',loadPercent:20,lotoCertified:true,matchScore:93}
];

// Datos de demostración para presentar el flujo funcional de AMaint. No representan registros reales de Andina.
export const INITIAL_SPARE_PARTS: SparePartItem[] = [
{sku:'ROD-6205',name:'Rodamiento rígido 6205-2RS',category:'Rodamientos',shelf:'A-01-03',stockActual:3,stockMin:4,stockReorden:10,unit:'un',unitPriceUSD:18,status:'critical',supplier:'Suministros Industriales',leadTime:'3 días',criticality:'Alta'},
{sku:'FIL-AIR-20',name:'Filtro de aire para compresor',category:'Filtración',shelf:'A-02-01',stockActual:5,stockMin:3,stockReorden:8,unit:'un',unitPriceUSD:32,status:'healthy',supplier:'AireTec',leadTime:'2 días',criticality:'Alta'},
{sku:'SEN-IND-M12',name:'Sensor inductivo M12',category:'Instrumentación',shelf:'B-01-02',stockActual:2,stockMin:4,stockReorden:8,unit:'un',unitPriceUSD:24,status:'warning',supplier:'Control y Sensores',leadTime:'5 días',criticality:'Media'},
{sku:'COR-A42',name:'Correa industrial A42',category:'Transmisión',shelf:'C-02-04',stockActual:12,stockMin:5,stockReorden:12,unit:'un',unitPriceUSD:9,status:'healthy',supplier:'Transmisiones Chile',leadTime:'2 días',criticality:'Media'},
{sku:'ACE-ISO46',name:'Aceite hidráulico ISO VG 46',category:'Lubricantes',shelf:'D-01-01',stockActual:18,stockMin:10,stockReorden:25,unit:'L',unitPriceUSD:6,status:'healthy',supplier:'LubriAndes',leadTime:'1 día',criticality:'Alta'},
{sku:'SEL-VITON',name:'Kit de sellos Viton',category:'Sellos',shelf:'B-03-02',stockActual:1,stockMin:3,stockReorden:6,unit:'kit',unitPriceUSD:42,status:'critical',supplier:'Hidráulica Técnica',leadTime:'4 días',criticality:'Alta'},
{sku:'GRS-EP2',name:'Grasa multipropósito EP2',category:'Lubricantes',shelf:'D-02-01',stockActual:4,stockMin:5,stockReorden:12,unit:'kg',unitPriceUSD:8,status:'warning',supplier:'LubriAndes',leadTime:'1 día',criticality:'Media'},
{sku:'FUS-10A',name:'Fusible industrial 10 A',category:'Protección eléctrica',shelf:'E-01-02',stockActual:18,stockMin:8,stockReorden:20,unit:'un',unitPriceUSD:3.5,status:'healthy',supplier:'ElectroAndes',leadTime:'2 días',criticality:'Media'},
{sku:'SEN-PRES-04',name:'Transmisor de presión 4–20 mA',category:'Instrumentación',shelf:'B-02-01',stockActual:2,stockMin:3,stockReorden:6,unit:'un',unitPriceUSD:76,status:'critical',supplier:'Control y Sensores',leadTime:'5 días',criticality:'Alta'}
];

// Vale vacío hasta que exista un registro persistido de inventario y despacho.
export const INITIAL_VOUCHER: DispatchVoucher = {id:'DEMO-VALE-014',otCode:'DEMO-OT-001',otTitle:'Inspección de rodamientos del compresor',requesterName:'Carlos Mendoza',requesterRole:'Técnico Mecánico',warehouseKeeper:'Paula Herrera',costCenter:'Mantención Industrial',totalCostUSD:44,status:'pending',items:[{sku:'ROD-6205',name:'Rodamiento rígido 6205-2RS',tag:'MAQ-003',location:'Planta Industrial Andina · Mantenimiento Mecánico',stock:3,qtyRequired:2,unit:'un',verified:false},{sku:'GRS-EP2',name:'Grasa multipropósito EP2',tag:'MAQ-003',location:'Planta Industrial Andina · Mantenimiento Mecánico',stock:4,qtyRequired:1,unit:'kg',verified:false}]};

export const INITIAL_ASSET_TREE: AssetNode = {
  id: 'pl01',
  code: 'PL01',
  name: 'Planta Los Andes',
  level: 1,
  levelName: 'Planta',
  status: 'normal',
  criticality: 'CLASE A',
  children: [
    {
      id: 'area-plast',
      code: 'PL1-PLAST',
      name: 'Área Plásticos & Polímeros',
      level: 2,
      levelName: 'Área',
      status: 'normal',
      criticality: 'CLASE A',
      children: [
        {
          id: 'line-ext-01',
          code: 'PL1-EXT01-LINE',
          name: 'Línea Extrusión 01',
          level: 3,
          levelName: 'Línea',
          status: 'normal',
          criticality: 'CLASE B',
          children: [],
        },
        {
          id: 'line-ext-02',
          code: 'PL1-EXT02-LINE',
          name: 'Línea Extrusión 02',
          level: 3,
          levelName: 'Línea',
          status: 'alert',
          criticality: 'CLASE A',
          children: [
            {
              id: 'eq-ext-dos01',
              code: 'PL1-EXT-02-DOS01',
              name: 'Dosificador Gravimétrico 01',
              level: 4,
              levelName: 'Equipo',
              status: 'normal',
              criticality: 'CLASE B',
            },
            {
              id: 'eq-ext-02',
              code: 'PL1-EXT-02',
              name: 'Extrusora Doble Husillo 02',
              level: 4,
              levelName: 'Equipo',
              status: 'alert',
              criticality: 'CLASE A',
              manufacturer: 'KraussMaffei Berstorff',
              model: 'KMD 90-32/P',
              serialNumber: 'KM-2021-99824',
              hoursAccumulated: '14,280 hrs',
              installedAt: '2021-03-15',
              children: [
                {
                  id: 'comp-red01',
                  code: 'PL1-EXT-02-RED01',
                  name: 'Reductor Principal de Velocidad Heloidal',
                  level: 5,
                  levelName: 'Subconjunto',
                  status: 'alert',
                  criticality: 'CLASE A',
                  type: 'Mecánico Rotativo (Transmisión)',
                  manufacturer: 'Hansen Industrial Transmissions',
                  model: 'P4 QVP3-RLN-18.5',
                  serialNumber: 'SN-2019-883492-H',
                  hoursAccumulated: '14,820 hrs',
                  tag: 'PL1-EXT-02-RED01',
                  hash: '#928A-SYS',
                  installedAt: '2021-03-15',
                  nominalSpecs: {
                    power: '75 kW (100 HP)',
                    ratio: '1:18.5 i',
                    lubricant: 'ISO VG 220 Sint.',
                    capacity: '28.5 Litros',
                  },
                },
                {
                  id: 'comp-mot01',
                  code: 'PL1-EXT-02-MOT01',
                  name: 'Motor Asíncrono Siemens 90kW',
                  level: 5,
                  levelName: 'Subconjunto',
                  status: 'normal',
                  criticality: 'CLASE B',
                  type: 'Eléctrico de Potencia',
                  manufacturer: 'Siemens',
                  model: '1LA8 315-4PB80',
                  serialNumber: 'SM-2021-4410',
                  hoursAccumulated: '14,280 hrs',
                },
                {
                  id: 'comp-hus02',
                  code: 'PL1-EXT-02-HUS02',
                  name: 'Par de Husillos Bimetálicos L/D 36',
                  level: 5,
                  levelName: 'Subconjunto',
                  status: 'normal',
                  criticality: 'CLASE B',
                  type: 'Mecánico Extrusión',
                  manufacturer: 'KraussMaffei',
                  model: 'H-90/36-BM',
                },
                {
                  id: 'comp-plc01',
                  code: 'PL1-EXT-02-PLC01',
                  name: 'Tablero Control Siemens S7-1500',
                  level: 5,
                  levelName: 'Subconjunto',
                  status: 'normal',
                  criticality: 'CLASE A',
                  type: 'Instrumentación y Control',
                  manufacturer: 'Siemens',
                  model: 'CPU 1516-3 PN/DP',
                },
              ],
            },
            {
              id: 'eq-ext-vac01',
              code: 'PL1-EXT-02-VAC01',
              name: 'Tina de Vacío y Enfriamiento',
              level: 4,
              levelName: 'Equipo',
              status: 'normal',
              criticality: 'CLASE C',
            },
          ],
        },
        {
          id: 'line-inj-naveb',
          code: 'PL1-INJ-NAVEB',
          name: 'Línea Inyección Nave B',
          level: 3,
          levelName: 'Línea',
          status: 'alert',
          criticality: 'CLASE A',
          children: [
            {
              id: 'eq-inj-03',
              code: 'PL1-INJ-03',
              name: 'Inyectora Hidráulica 03 (500T)',
              level: 4,
              levelName: 'Equipo',
              status: 'alert',
              criticality: 'CLASE A',
              manufacturer: 'Battenfeld',
              model: 'HM 500/3400',
              serialNumber: 'BF-2018-33102',
            },
          ],
        },
      ],
    },
    {
      id: 'area-mat',
      code: 'PL1-MAT',
      name: 'Área Matricería y Tornería',
      level: 2,
      levelName: 'Área',
      status: 'normal',
      criticality: 'CLASE B',
      children: [],
    },
    {
      id: 'area-aux',
      code: 'PL1-AUX',
      name: 'Servicios Auxiliares (Calderas / Chillers)',
      level: 2,
      levelName: 'Área',
      status: 'normal',
      criticality: 'CLASE A',
      children: [],
    },
  ],
};

// Datos de demostración para presentar el flujo funcional de AMaint. No representan registros reales de Andina.
export const INITIAL_SYNC_PACKETS: SyncPacket[] = [{id:'DEMO-PKT-001',payloadType:'ORDEN_TRABAJO',originDevice:'Terminal de supervisión',operator:'María Torres',entityTag:'DEMO-OT-002 · MAQ-005',sizeBytes:'4.2 KB',cipherMethod:'TLS',status:'synced',progress:100,timestamp:'09:12 hrs',payloadJson:{codigo:'DEMO-OT-002',activo:'MAQ-005',estado:'PENDIENTE'}},{id:'DEMO-PKT-002',payloadType:'CIERRE_PREVENTIVO',originDevice:'Tablet de mantenimiento',operator:'Javier Soto',entityTag:'DEMO-OT-005 · MAQ-003',sizeBytes:'6.8 KB',cipherMethod:'TLS',status:'synced',progress:100,timestamp:'08:46 hrs',payloadJson:{codigo:'DEMO-OT-005',activo:'MAQ-003',estado:'COMPLETADA'}},{id:'DEMO-PKT-003',payloadType:'REPORTE_INCIDENCIA',originDevice:'Móvil de producción',operator:'Paula Herrera',entityTag:'MAQ-006 · Bomba centrífuga',sizeBytes:'3.1 KB',cipherMethod:'TLS',status:'queued',progress:0,timestamp:'09:40 hrs',payloadJson:{activo:'MAQ-006',prioridad:'ALTA',estado:'EN_COLA'}}];

// Datos de demostración para presentar el flujo funcional de AMaint. No representan registros reales de Andina.
export const INITIAL_FORENSIC_LOGS: ForensicLog[] = [{id:'DEMO-EVT-001',timestamp:'09:12:00',date:'26/11/2026',level:'INFO',action:'OT_REGISTRADA',description:'Solicitud de inspección registrada para la envasadora.',entity:'DEMO-OT-002',user:'María Torres',role:'Supervisión',ip:'DEMO',terminal:'Terminal de supervisión',sha256Hash:'DEMO-SHA256-001'},{id:'DEMO-EVT-002',timestamp:'08:46:00',date:'26/11/2026',level:'INFO',action:'OT_CERRADA',description:'Mantenimiento preventivo del compresor finalizado.',entity:'DEMO-OT-005',user:'Javier Soto',role:'Técnico Mecánico',ip:'DEMO',terminal:'Tablet de mantenimiento',sha256Hash:'DEMO-SHA256-002'},{id:'DEMO-EVT-003',timestamp:'09:40:00',date:'26/11/2026',level:'WARN',action:'INCIDENCIA_REPORTADA',description:'Presión de descarga fuera del rango esperado en bomba centrífuga.',entity:'MAQ-006',user:'Paula Herrera',role:'Producción',ip:'DEMO',terminal:'Móvil de producción',sha256Hash:'DEMO-SHA256-003'}];
