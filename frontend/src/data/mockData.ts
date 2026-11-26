import { WorkOrder, AssetNode, SparePartItem, DispatchVoucher, SyncPacket, ForensicLog, Technician } from '../types';

// Sin registros de demostración: las órdenes, técnicos, repuestos y bitácoras deben provenir de datos persistidos.
export const INITIAL_WORK_ORDERS: WorkOrder[] = [];

// Sin registros de demostración: las órdenes, técnicos, repuestos y bitácoras deben provenir de datos persistidos.
export const INITIAL_TECHNICIANS: Technician[] = [];

// Sin registros de demostración: las órdenes, técnicos, repuestos y bitácoras deben provenir de datos persistidos.
export const INITIAL_SPARE_PARTS: SparePartItem[] = [];

// Vale vacío hasta que exista un registro persistido de inventario y despacho.
export const INITIAL_VOUCHER: DispatchVoucher = {
  id: '', otCode: '', otTitle: '', requesterName: '', requesterRole: '', warehouseKeeper: '', costCenter: '', totalCostUSD: 0, status: 'pending', items: [],
};

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

// Sin registros de demostración: las órdenes, técnicos, repuestos y bitácoras deben provenir de datos persistidos.
export const INITIAL_SYNC_PACKETS: SyncPacket[] = [];

// Sin registros de demostración: las órdenes, técnicos, repuestos y bitácoras deben provenir de datos persistidos.
export const INITIAL_FORENSIC_LOGS: ForensicLog[] = [];
