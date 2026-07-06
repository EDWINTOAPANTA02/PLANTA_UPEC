# FIACA - Sistema de Gestión de Plantas Piloto UPEC 🌾🐄🧪

Este repositorio contiene la **Fase 1 (Propuesta Técnico-Funcional e Interfaz Interactiva)** del Sistema de Gestión de Inventarios, Maquinaria e Infraestructura para la Planta Piloto de la **Facultad de Industrias Agropecuarias y Ciencias Ambientales (FIACA)** de la **Universidad Politécnica Estatal del Carchi (UPEC)**.

El objetivo principal de esta fase es digitalizar y automatizar el control operativo en las distintas áreas de producción (Cereales, Almidón, Frutas y Vegetales, Cárnicos y Lácteos), eliminando los registros en papel o plantillas desarticuladas.

---

## 📂 Contenido del Repositorio

1. **`index.html`**: Prototipo web de alta fidelidad, 100% interactivo y autocontenido. Emula visualmente los estándares de diseño institucionales con colores oficiales UPEC y funciona completamente en memoria con JavaScript nativo.
2. **`PROPUESTA_FASE1_FIACA_UPEC.docx`**: Documento formal de propuesta técnico-funcional en formato Microsoft Word con estructura profesional, justificación, cronograma y hojas de ruta.
3. **`generate_docx.js`**: Script en Node.js utilizado para generar el documento de propuesta en formato Word con el formato oficial.

---

## 🎨 Paleta de Colores Institucional UPEC
* **Verde UPEC (`#056734`)**: Barra superior de la aplicación, menús activos y encabezados principales.
* **Amarillo UPEC (`#FFD45B`)**: Destacados de stock crítico, advertencias y badges de stock agotado.
* **Fondo Neutro (`#F5F5F5`)**: Interfaz limpia tipo empresarial.

---

## ⚙️ Características Funcionales de la Fase 1

### 1. Dashboard General de Control Operativo
* **Métricas en tiempo real**: Tarjetas dinámicas que contabilizan el total de ítems en bodega, insumos agotados, equipos inactivos/en mantenimiento y problemas de infraestructura reportados.
* **Panel de Alertas Críticas**: Notificación automática de insumos caducados (con fecha de vencimiento menor al año en curso 2026), insumos con stock cero y fallos mecánicos de maquinaria.

### 2. Gestión de Plantas e Infraestructura
* **Creación de plantas en vivo**: Permite registrar dinámicamente nuevas plantas piloto (ej. *Planta de Lácteos*) y actualiza de inmediato todos los selectores de la aplicación sin recargar la página.
* **Reporte de novedades físicas**: Permite reportar problemas de goteras, pintura, fallas eléctricas o tuberías para la revisión del Decanato.

### 3. Bodega Central (Búsqueda Facetada)
* **Búsqueda e inspección rápida**: Filtros combinados laterales que permiten aislar recursos por planta y categoría (Insumos, Materiales, Equipos).
* **Control de vencimiento automático**: Badges de advertencia según la fecha de expiración e inventario disponible.

### 4. Maquinaria en Finca (Cards Region)
* **Bitácora digital de equipos**: Mapeo visual de la maquinaria de cada planta piloto con estados semáforo (*Operativo*, *Mantenimiento*, *Inactivo por Daño*).
* **Motivo obligatorio**: Al cambiar un equipo a mantenimiento o inactivo, se exige escribir el daño específico, el cual se asienta en la bitácora técnica de la máquina.

### 5. Módulo de Despachos Transaccionales
* **Registro de salidas**: Formulario para despachar insumos a estudiantes indicando el técnico responsable, el estudiante y la fecha.
* **Descuento automático de stock**: Al procesar el despacho, el sistema resta las cantidades entregadas en tiempo real de la Bodega Central y recalcula las métricas del Dashboard.

---

## 🚀 Cómo Visualizar el Prototipo

Para abrir la interfaz interactiva:
1. Descarga el archivo `index.html`.
2. Haz doble clic sobre él para abrirlo en cualquier navegador web (Chrome, Edge, Firefox, etc.).
3. ¡Prueba toda la funcionalidad interactiva en memoria!

---
*FIACA - Universidad Politécnica Estatal del Carchi © 2026*
