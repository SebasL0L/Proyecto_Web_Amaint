# Requisitos no funcionales — Amaint

| Campo | Detalle |
|---|---|
| Documento | Requisitos no funcionales |
| Versión | 0.1 |
| Estado | Borrador para revisión y validación |
| Fuente principal | Informe de Requisitos N.º 2, sección 3.2, página 13 |

## Propósito

Registrar las condiciones de rendimiento, seguridad, usabilidad y disponibilidad que el sistema debe satisfacer. Se mantienen los identificadores RNF-1 a RNF-8 del informe.

## Rendimiento y capacidad

### RNF-1 — Tiempo de respuesta

El 95% de las consultas del catálogo de activos y del historial deberán responder en menos de **1,5 segundos** en condiciones de red local, considerando la latencia de la API (backend) y la carga total de la interfaz móvil y web.

**Verificación prevista:** prueba de rendimiento sobre consultas representativas, registrando percentil 95 y condiciones de red/carga. El conjunto exacto de consultas y el entorno de medición deben acordarse con QA.

### RNF-2 — Concurrencia

El sistema deberá soportar un mínimo de **50 usuarios concurrentes** interactuando simultáneamente sin degradación de la interfaz gráfica.

**Verificación prevista:** prueba de carga con al menos 50 sesiones concurrentes y revisión de tiempos de respuesta y errores. El informe no establece duración de la prueba, mezcla de operaciones ni umbral cuantitativo para «sin degradación».

### RNF-3 — Sincronización

Los registros de fallas generados en modo offline deberán sincronizarse completamente en menos de **5 segundos** al recuperar la conectividad.

**Verificación prevista:** medir el tiempo desde que el dispositivo recupera conexión hasta que los registros pendientes quedan sincronizados en el servidor. Deben definirse el volumen de datos y las condiciones de red de prueba.

## Seguridad

### RNF-4 — Control de acceso

La autenticación se realizará mediante credenciales únicas y el acceso se controlará mediante **RBAC (Role-Based Access Control)** para limitar privilegios según los perfiles definidos.

**Verificación prevista:** probar que cada perfil solo puede ejecutar las operaciones autorizadas. La matriz completa de permisos debe validarse con el Product Owner y los responsables del negocio.

### RNF-5 — Trazabilidad y auditoría

El sistema deberá mantener logs de auditoría para todas las operaciones de creación, modificación y eliminación de órdenes de trabajo y de stock de repuestos.

**Verificación prevista:** ejecutar operaciones de cada tipo y comprobar que el registro de auditoría permita identificar la operación realizada. El informe no especifica campos, retención, acceso ni protección de los logs.

### RNF-6 — Encriptación

El informe exige cifrado de datos en tránsito mediante **HTTPS (TLS 1.3)** y cifrado **AES-256 para credenciales almacenadas**.

**Verificación prevista:** revisar la configuración de transporte seguro y la protección de los datos almacenados conforme a la definición que apruebe el equipo.

## Usabilidad y disponibilidad

### RNF-7 — Usabilidad

La interfaz deberá ser adaptativa (responsive) y estar diseñada con contraste optimizado para dispositivos móviles utilizados en entornos de planta industrial.

**Verificación prevista:** revisar la adaptación a tamaños de pantalla objetivo y evaluar la legibilidad/contraste en condiciones de uso representativas. El informe no define dispositivos, medidas de contraste ni método de evaluación.

### RNF-8 — Disponibilidad

La plataforma deberá garantizar una disponibilidad continua (**uptime del 99,5% mensual**) durante el horario de operación de la planta.

**Verificación prevista:** calcular la disponibilidad durante el horario operativo mensual acordado. Deben definirse el calendario de operación, las ventanas de mantenimiento, las exclusiones y el método de medición.

## Resumen de objetivos medibles

| ID | Atributo | Objetivo de origen | Aspecto por precisar |
|---|---|---|---|
| RNF-1 | Rendimiento | 95% de consultas bajo 1,5 s en red local | Consultas, ambiente y percentil exacto de medición. |
| RNF-2 | Capacidad | 50 usuarios concurrentes | Carga de trabajo y definición cuantitativa de degradación. |
| RNF-3 | Sincronización | Menos de 5 s al recuperar conectividad | Volumen, calidad de red y punto exacto de inicio/fin. |
| RNF-4 | Seguridad | Credenciales únicas y RBAC | Matriz de permisos y políticas de autenticación. |
| RNF-5 | Auditoría | Logs para altas, cambios y eliminaciones de OT y stock | Campos, retención, protección y consulta. |
| RNF-6 | Cifrado | HTTPS/TLS 1.3 y AES-256 para credenciales almacenadas | Alcance de cifrado, gestión de claves y relación con datos offline. |
| RNF-7 | Usabilidad | Responsive y contraste optimizado para móvil industrial | Dispositivos y criterios medibles de accesibilidad/contraste. |
| RNF-8 | Disponibilidad | 99,5% mensual en horario de planta | Calendario, exclusiones y método de cálculo. |

## Fuente

Informe de Requisitos N.º 2, sección 3.2, página 13. La condición de cifrado local AES-256 también aparece en HU-07, página 17.
