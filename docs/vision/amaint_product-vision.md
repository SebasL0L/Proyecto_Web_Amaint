# Visión del producto — Amaint

| Campo | Detalle |
|---|---|
| Producto | Amaint |
| Documento | Visión del producto |
| Fecha | 19 de noviembre de 2026 |

> **Propósito de este documento:** establecer por qué existe Amaint, a quién busca ayudar, qué valor pretende entregar y cuáles son los límites generales del producto.

## 1. Resumen del producto

Amaint es una plataforma de gestión de mantenimiento industrial (CMMS) concebida para que distintas organizaciones puedan administrar, desde un entorno centralizado, la información de sus activos, las incidencias, las órdenes de trabajo, los repuestos y los indicadores de mantenimiento.

El producto se plantea como una solución configurable y multiempresa. Cada organización podrá trabajar con sus propios usuarios, permisos, módulos y configuraciones, mientras que la plataforma contará con capacidades de administración central de organizaciones. La experiencia prevista contempla el acceso web y el uso desde dispositivos móviles, especialmente para las actividades que se realizan directamente en planta.

El caso de Manufacturas Andina S.A. constituye el contexto inicial de análisis y validación: una empresa manufacturera que necesita ordenar y digitalizar la gestión de sus activos y mantenciones. Sin embargo, la visión de Amaint como producto busca que la solución pueda adaptarse también a otras empresas con necesidades de gestión de mantenimiento.

## 2. Problema y oportunidad

En el contexto del caso inicial, la información sobre los activos industriales y sus mantenciones se encuentra dispersa y su gestión depende de fuentes internas diferentes. El uso de bitácoras físicas y archivos independientes dificulta disponer de información consolidada y actualizada sobre el estado de las máquinas, sus fallas, las intervenciones realizadas y los repuestos consumidos.

Esta fragmentación afecta la coordinación entre producción, técnicos, supervisores y bodega. También dificulta consultar oportunamente el historial de un activo, organizar las órdenes de trabajo, hacer seguimiento a las intervenciones y disponer de datos confiables para tomar decisiones.

La oportunidad consiste en centralizar esa información y conectar los principales procesos de mantenimiento en una plataforma compartida. El acceso móvil y la capacidad de operar en lugares con conectividad limitada son especialmente relevantes para que el registro y la consulta puedan realizarse en terreno.

## 3. Declaración de visión

> **Amaint busca convertirse en una plataforma CMMS multiempresa que ayude a las organizaciones industriales a centralizar y controlar la gestión de sus activos y mantenimiento, conectando el trabajo realizado en planta con información trazable y actualizada para coordinar las intervenciones, administrar los recursos y tomar mejores decisiones operativas.**

La plataforma debe facilitar tanto la gestión administrativa del mantenimiento como las tareas que técnicos y operadores realizan directamente en terreno. Su propuesta combina una gestión estructurada de activos, seguimiento de fallas y órdenes de trabajo, control de repuestos y consulta de indicadores, con una experiencia accesible desde web y dispositivos móviles.

## 4. Usuarios y organizaciones a las que se dirige

### 4.1. Organizaciones objetivo

**Público principal:** empresas industriales que necesitan centralizar la información de sus activos, planificar y registrar mantenciones, gestionar fallas, controlar repuestos y consultar indicadores operativos. El caso de Manufacturas Andina S.A., dedicado a la producción de envases plásticos, sirve como referencia concreta para el diseño inicial.

**Público potencial complementario:** pequeños negocios o usuarios individuales que requieran funciones simplificadas de gestión de mantenimiento. Esta posibilidad aparece en el modelo comercial del informe y deberá traducirse en una definición de alcance y planes antes de su implementación.

### 4.2. Perfiles que interactúan con el producto

| Perfil | Necesidad principal que Amaint busca apoyar |
|---|---|
| Personal de producción | Informar fallas o anomalías de los activos que utiliza. |
| Personal técnico | Consultar información del activo, revisar trabajos asignados, registrar la intervención y cerrar órdenes de trabajo. |
| Supervisor de mantenimiento | Revisar incidencias, planificar y asignar órdenes de trabajo, coordinar recursos y controlar repuestos. |
| Encargado de bodega o repuestos | Mantener actualizado el inventario y registrar la entrega y consumo de materiales asociados al mantenimiento. |
| Jefe de planta o administrador de la organización | Consultar indicadores, supervisar la operación y apoyar decisiones y aprobaciones. |
| Administración central de Amaint | Gestionar las organizaciones que utilizan la plataforma y sus configuraciones generales. |

Los cinco primeros perfiles corresponden al contexto de usuarios descrito para Manufacturas Andina S.A. La administración central se incorpora a la visión de plataforma multiempresa descrita en el README del repositorio.

## 5. Propuesta de valor

Amaint pretende entregar valor mediante las siguientes capacidades integradas:

- **Información centralizada de activos:** disponer de fichas técnicas e historial de mantenimiento en un único entorno, con una estructura jerárquica que permita localizar los activos.
- **Registro desde terreno:** facilitar el reporte de fallas desde dispositivos móviles, incluyendo evidencia fotográfica y referencia al activo correspondiente.
- **Coordinación del mantenimiento:** organizar, priorizar, calendarizar y asignar órdenes de trabajo según las necesidades de la operación y las especialidades técnicas.
- **Trazabilidad de las intervenciones:** mantener el registro de las actividades realizadas, sus responsables, checklists y materiales utilizados.
- **Control de repuestos:** relacionar el inventario y el consumo de insumos con las órdenes de trabajo y los activos intervenidos.
- **Continuidad en terreno:** permitir que determinadas actividades móviles se realicen sin conexión y que la información se sincronice al recuperar conectividad.
- **Información para decisiones:** ofrecer indicadores de mantenimiento, entre ellos MTBF, MTTR, disponibilidad operativa y costos por activo.
- **Adaptación por organización:** permitir que distintas empresas utilicen la plataforma con usuarios, permisos, módulos y configuraciones acordes con sus necesidades.

## 6. Objetivos del producto

La visión de Amaint se orienta a los siguientes objetivos generales:

1. Centralizar la información técnica de los activos y su historial de mantenimiento.
2. Digitalizar el registro y seguimiento de fallas e intervenciones, reduciendo la dependencia de bitácoras y archivos separados.
3. Mejorar la coordinación y el seguimiento de las órdenes de trabajo preventivas y correctivas.
4. Relacionar el consumo de repuestos con los trabajos ejecutados y los activos intervenidos.
5. Facilitar el trabajo de los usuarios que operan directamente en planta, incluso cuando la conectividad sea limitada.
6. Proporcionar información operativa que permita evaluar el mantenimiento y apoyar decisiones.
7. Ofrecer una plataforma adaptable a más de una organización, con administración diferenciada de sus datos, usuarios y configuraciones.

## 7. Alcance general y límites del producto

Esta sección expresa el alcance a nivel de visión. La descripción verificable de cada función, sus reglas y criterios de aceptación se desarrollará en `docs/requirements/`.

### 7.1. Dentro de la visión de Amaint

- Administración de organizaciones y configuración de módulos por empresa.
- Gestión de activos industriales y su organización jerárquica: planta, área, línea, máquina y subconjunto.
- Identificación de activos mediante códigos únicos y soporte para QR.
- Registro de fallas e incidencias, incluyendo evidencia fotográfica desde dispositivos móviles.
- Consulta de fichas técnicas e historial de activos.
- Gestión de órdenes de trabajo preventivas y correctivas, incluida su planificación, asignación, seguimiento y cierre.
- Gestión de repuestos e inventario vinculados a las órdenes de trabajo.
- Notificaciones y alertas relacionadas con incidencias y órdenes de trabajo.
- Acceso móvil y operación sin conexión para los procesos que se definan, con sincronización posterior.
- Indicadores y reportes de mantenimiento.
- Administración central de las organizaciones que utilizan Amaint.

### 7.2. Fuera del alcance declarado para la solución inicial

- **Contabilidad general, facturación y funciones contables:** el alcance financiero se limita a la valoración de costos de mantenimiento y al consumo de repuestos con fines operativos.
- **Mantenimiento predictivo basado en inteligencia artificial:** la analítica descrita se concentra en datos históricos e indicadores estándar de mantenimiento, como MTBF y MTTR.
- **Registros paralelos independientes como fuente oficial:** la gestión y el historial deberán mantenerse centralizados en Amaint, en lugar de depender de bitácoras en papel o archivos locales separados como Excel o Word.

La integración con sistemas ERP o plataformas de inventario externas se considera una posibilidad futura, no una dependencia para el funcionamiento central descrito en el informe.

## 8. Resultados esperados y señales de éxito

El informe de requisitos define las siguientes metas para el caso de Manufacturas Andina S.A. Se conservan aquí como objetivos de referencia del caso inicial; no deben interpretarse automáticamente como garantías ni como metas universales para todas las organizaciones que utilicen Amaint.

| Resultado esperado | Meta definida para el caso inicial | Horizonte indicado |
|---|---:|---|
| Aumento de disponibilidad operativa global de las líneas de producción | Incremento del 12% | Primeros 6 meses posteriores a la implementación |
| Reducción del tiempo medio de reparación (MTTR) de fallas no planificadas | Reducción del 20% | 6 meses |
| Digitalización de reportes de anomalías y cierres de órdenes de trabajo | 100% de los registros | Primeros 60 días de operación |
| Cumplimiento del plan de mantenimiento preventivo | Igual o superior al 90% de las órdenes preventivas programadas | Medición mensual |
| Coincidencia entre repuestos descontados en el sistema y stock físico | 98% | Según control de inventario |
| Notificación de eventos críticos o paradas de planta a supervisores | 95% de los eventos en menos de 2 minutos desde su registro | Según operación |

Para utilizar estas metas como indicadores de evaluación será necesario definir en requisitos cómo se calcula cada métrica, cuál es su línea base, qué datos la alimentan y quién valida el resultado.

## 9. Enfoque de producto y modelo comercial

El repositorio define Amaint como una plataforma multiempresa, configurable y escalable. El informe de requisitos contempla dos modalidades comerciales generales:

- **Suscripción SaaS mensual o anual:** acceso a las funcionalidades incluidas en el plan durante el período contratado, con soporte, mantenimiento y actualizaciones según las condiciones del servicio.
- **Licencia de pago único:** derecho de uso de una versión determinada bajo condiciones contractuales. El alojamiento, soporte, respaldos y actualizaciones futuras no se consideran necesariamente incluidos de forma permanente.

Esta visión reconoce ambas modalidades como alternativas consideradas para el producto, pero no fija precios, niveles de servicio, límites de usuarios, módulos por plan ni condiciones contractuales. Esos aspectos deberán definirse antes de una oferta comercial.

## 10. Principios que deben orientar la evolución

Los siguientes principios resumen las características que la visión espera preservar:

1. **Centralización:** la información operativa de mantenimiento debe poder consultarse desde una plataforma común.
2. **Trazabilidad:** las fallas, órdenes, intervenciones y movimientos de repuestos deben mantener relación con los activos y las actividades correspondientes.
3. **Utilidad en terreno:** las tareas esenciales de los usuarios de planta deben ser accesibles desde dispositivos móviles y considerar las condiciones de conectividad del entorno.
4. **Adaptabilidad multiempresa:** la plataforma debe permitir que organizaciones distintas configuren su uso sin mezclar su información ni sus permisos.
5. **Orientación a la operación:** las funciones deben apoyar el mantenimiento industrial y la continuidad operativa, sin transformarse en un sistema contable general.
6. **Decisiones basadas en información:** los indicadores deben derivarse de los registros operativos de activos, órdenes e inventario.

## 11. Aspectos que deben validarse en las siguientes etapas

Esta visión establece una dirección común, pero hay decisiones que no corresponde cerrar en este documento. Deberán aclararse al levantar y refinar los requisitos:

- Qué funcionalidades formarán parte de la primera versión y cuáles quedarán para versiones posteriores.
- Qué significa exactamente la configuración de módulos por empresa y qué capacidades tendrá la administración central.
- Qué operaciones estarán disponibles en modo offline, cuánto tiempo podrán permanecer pendientes y cómo se resolverán conflictos de sincronización.
- Cómo se delimitará el acceso a la información entre organizaciones y qué roles existirán en cada una.
- Qué experiencia móvil se entregará y qué dispositivos/plataformas deberán soportarse.
- Qué indicadores se calcularán en la primera versión y qué datos serán necesarios para obtenerlos correctamente.
- Cómo se relacionarán las modalidades SaaS y de licencia con el alojamiento, soporte, respaldos y actualizaciones.
- Qué integraciones externas serán necesarias en el futuro y cuáles quedan fuera de la primera versión.

Las respuestas deberán quedar registradas en los documentos de requisitos antes de utilizarse como base definitiva para la arquitectura.

## 12. Relación con los demás documentos

- `docs/requirements/`: transformará esta visión en requisitos funcionales y no funcionales, reglas de negocio, perfiles, casos de uso e historias de usuario verificables.
- `docs/architecture/`: describirá cómo se implementará la solución una vez que los requisitos estén suficientemente definidos y validados.
- `designs/`: recogerá los prototipos, flujos y recursos visuales que materialicen la experiencia prevista.
- `infrastructure/`: documentará los entornos, la base de datos y los mecanismos de despliegue que se definan para operar el producto.