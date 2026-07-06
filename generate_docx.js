const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType
} = require('docx');

// Institutional Colors (Hex without #)
const COLOR_UPEC_GREEN = "056734";
const COLOR_UPEC_GREEN_DARK = "034522";
const COLOR_UPEC_YELLOW = "FFD45B";
const COLOR_SLATE_DARK = "1E293B";
const COLOR_SLATE_MUTED = "64748B";
const COLOR_BG_LIGHT = "F5F5F5";
const COLOR_BORDER_GRAY = "CBD5E1";
const COLOR_WHITE = "FFFFFF";

// Helper for Section Headings with UPEC Styling
function createHeading1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 120 },
    border: {
      bottom: { color: COLOR_UPEC_YELLOW, space: 4, style: BorderStyle.SINGLE, size: 12 }
    }
  });
}

function createHeading2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 }
  });
}

function createHeading3(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 140, after: 60 }
  });
}

// Helper for Paragraph text
function createBullet(text, boldPrefix = "") {
  const children = [];
  if (boldPrefix) {
    children.push(new TextRun({ text: boldPrefix + " ", bold: true, color: COLOR_SLATE_DARK }));
  }
  children.push(new TextRun({ text: text, color: COLOR_SLATE_DARK }));
  return new Paragraph({
    children: children,
    bullet: { level: 0 },
    spacing: { before: 40, after: 40 }
  });
}

function createParagraph(text, options = {}) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        bold: options.bold || false,
        italic: options.italic || false,
        color: options.color || COLOR_SLATE_DARK,
        size: options.size || 22 // 11pt
      })
    ],
    spacing: { before: options.spaceBefore || 60, after: options.spaceAfter || 60 },
    alignment: options.alignment || AlignmentType.LEFT
  });
}

// Callout Box helper
function createCallout(title, text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 100, type: WidthType.PERCENTAGE },
            shading: { fill: "FFFBEB", type: ShadingType.CLEAR, color: "auto" },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_UPEC_YELLOW },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_UPEC_YELLOW },
              right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_UPEC_YELLOW },
              left: { style: BorderStyle.SINGLE, size: 24, color: COLOR_UPEC_YELLOW } // thick left yellow border
            },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: "📌 " + title, bold: true, color: "78350F", size: 22 })
                ],
                spacing: { after: 60 }
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: text, color: "92400E", size: 20 })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

// Build Document
async function generateDocx() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: 22, // 11pt
            color: COLOR_SLATE_DARK
          }
        }
      },
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            font: "Calibri",
            size: 32, // 16pt
            bold: true,
            color: COLOR_UPEC_GREEN
          }
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            font: "Calibri",
            size: 26, // 13pt
            bold: true,
            color: COLOR_UPEC_GREEN_DARK
          }
        },
        {
          id: "Heading3",
          name: "Heading 3",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            font: "Calibri",
            size: 23, // 11.5pt
            bold: true,
            color: COLOR_SLATE_DARK
          }
        }
      ]
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } // 1 inch margins
          }
        },
        children: [
          
          // ================= PORTADA EJECUTIVA =================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "UNIVERSIDAD POLITÉCNICA ESTATAL DEL CARCHI", bold: true, size: 28, color: COLOR_UPEC_GREEN }),
            ],
            spacing: { before: 200, after: 40 }
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "FACULTAD DE INDUSTRIAS AGROPECUARIAS Y CIENCIAS AMBIENTALES (FIACA)", bold: true, size: 22, color: COLOR_SLATE_MUTED }),
            ],
            spacing: { before: 0, after: 300 }
          }),

          // Header Banner
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_UPEC_GREEN, type: ShadingType.CLEAR, color: "auto" },
                    margins: { top: 140, bottom: 140, left: 140, right: 140 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: "PROPUESTA TÉCNICO - FUNCIONAL — FASE 1", bold: true, size: 32, color: COLOR_WHITE })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: "SISTEMA INTEGRAL DE GESTIÓN DE INVENTARIOS, MAQUINARIA E INFRAESTRUCTURA DE PLANTAS PILOTO", bold: true, size: 22, color: COLOR_UPEC_YELLOW })
                        ],
                        spacing: { before: 60 }
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ text: "", spacing: { after: 200 } }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 30, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_BG_LIGHT, type: ShadingType.CLEAR, color: "auto" },
                    children: [createParagraph("Proyecto:", { bold: true })]
                  }),
                  new TableCell({
                    width: { size: 70, type: WidthType.PERCENTAGE },
                    children: [createParagraph("Sistema de Control Operativo y Gestión Piloto (FIACA UPEC)")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: COLOR_BG_LIGHT, type: ShadingType.CLEAR, color: "auto" },
                    children: [createParagraph("Entidad Beneficiaria:", { bold: true })]
                  }),
                  new TableCell({
                    children: [createParagraph("Planta Piloto Agroindustrial (Cereales, Almidón, Frutas/Vegetales, Cárnicos, Lácteos)")]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: COLOR_BG_LIGHT, type: ShadingType.CLEAR, color: "auto" },
                    children: [createParagraph("Alcance Presentado:", { bold: true })]
                  }),
                  new TableCell({
                    children: [createParagraph("Fase 1: Módulos Funcionales, Prototipado Interactivo y Reglas de Negocio", { bold: true, color: COLOR_UPEC_GREEN })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: COLOR_BG_LIGHT, type: ShadingType.CLEAR, color: "auto" },
                    children: [createParagraph("Fecha de Entrega:", { bold: true })]
                  }),
                  new TableCell({
                    children: [createParagraph("Julio de 2026")]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ text: "", spacing: { after: 300 } }),

          // ================= 1. RESUMEN EJECUTIVO Y OBJETIVOS =================
          createHeading1("1. Resumen Ejecutivo y Objetivos del Sistema"),
          
          createParagraph("La presente propuesta técnico-funcional contempla el desarrollo del nuevo Sistema Integral de Gestión de Inventarios, Maquinaria e Infraestructura para la Planta Piloto Universitaria de la Facultad de Industrias Agropecuarias y Ciencias Ambientales (FIACA - UPEC)."),
          
          createParagraph("El objetivo central de la Fase 1 es resolver la necesidad de digitalizar, organizar y automatizar el control operativo en las distintas áreas de producción (Cereales y Harinas, Extracción de Almidón, Frutas y Vegetales, Procesamiento de Cárnicos y Lácteos), eliminando la dependencia de registros en papel o carpetas de cálculo aisladas."),

          createCallout("Beneficio Institucional Directo", "El sistema garantiza la trazabilidad total de insumos entregados a docentes y estudiantes, la alerta oportuna de productos caducados o agotados, la Hoja de Vida digitalizada de la maquinaria y el seguimiento a mantenimientos de infraestructura para el Decanato."),

          // ================= 2. ALCANCE DE LA FASE 1 =================
          createHeading1("2. Alcance Funcional de la Fase 1"),

          createParagraph("La Fase 1 abarca la entrega completa de la plataforma funcional compuesta por 5 módulos principales interconectados, que operan con validación dinámica de datos en tiempo real:"),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: COLOR_UPEC_GREEN, type: ShadingType.CLEAR, color: "auto" },
                    children: [new Paragraph({ children: [new TextRun({ text: "Módulo Funcional", bold: true, color: COLOR_WHITE })] })]
                  }),
                  new TableCell({
                    shading: { fill: COLOR_UPEC_GREEN, type: ShadingType.CLEAR, color: "auto" },
                    children: [new Paragraph({ children: [new TextRun({ text: "Propósito y Operación Específica", bold: true, color: COLOR_WHITE })] })]
                  }),
                  new TableCell({
                    shading: { fill: COLOR_UPEC_GREEN, type: ShadingType.CLEAR, color: "auto" },
                    children: [new Paragraph({ children: [new TextRun({ text: "Impacto Operativo", bold: true, color: COLOR_WHITE })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph("1. Dashboard General", { bold: true })] }),
                  new TableCell({ children: [createParagraph("Indicadores en tiempo real (Totales, Stock 0, Equipos Inactivos, Incidencias) y Panel de Alertas Críticas.")] }),
                  new TableCell({ children: [createParagraph("Toma de decisiones inmediata y prevención de pérdidas de insumos.")] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph("2. Gestión de Plantas e Infraestructura", { bold: true })] }),
                  new TableCell({ children: [createParagraph("Registro dinámico de nuevas plantas piloto y reporte de novedades físicas (goteras, pintura, fallos eléctricos).")] }),
                  new TableCell({ children: [createParagraph("Flexibilidad de expansión y canal de mantenimiento directo con Decanato.")] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph("3. Bodega Central", { bold: true })] }),
                  new TableCell({ children: [createParagraph("Filtros combinados por Planta y Categoría. Control automático de caducidad e insumos agotados.")] }),
                  new TableCell({ children: [createParagraph("Optimización del presupuesto de compra y control sanitario.")] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph("4. Maquinaria en Finca", { bold: true })] }),
                  new TableCell({ children: [createParagraph("Catálogo visual de equipos por planta, semáforo de estado y modal obligatorio de cuaderno de daños.")] }),
                  new TableCell({ children: [createParagraph("Eliminación de bitácoras físicas y seguimiento a la vida útil de los equipos.")] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph("5. Módulo de Despachos", { bold: true })] }),
                  new TableCell({ children: [createParagraph("Registro de salidas a prácticas (Planta, Ítem, Cantidad, Estudiante, Técnico, Fecha) con descuento automático de stock.")] }),
                  new TableCell({ children: [createParagraph("Auditoría total y control del consumo por práctica docente.")] })
                ]
              })
            ]
          }),

          new Paragraph({ text: "", spacing: { after: 200 } }),

          // ================= 3. DETALLE DE FUNCIONALIDADES =================
          createHeading1("3. Detalle de Funcionalidades Entregadas (Fase 1)"),

          createHeading2("3.1. Dashboard General de Control Operativo"),
          createParagraph("El Dashboard General consolida el estado global de la Planta Piloto Universitaria mediante 4 paneles clave de actualización dinámica:"),
          createBullet("Mapea de forma continua la cantidad total de recursos (insumos, materiales y reactivos) custodiados en Bodega Central.", "• Total Ítems en Bodega:"),
          createBullet("Resalta automáticamente en amarillo institucional (#FFD45B) la cifra de insumos cuyo stock ha llegado a 0.00, alertando la necesidad de compra.", "• Insumos por Comprar:"),
          createBullet("Contabiliza en rojo (#EF4444) las máquinas que se encuentran en Mantenimiento o Inactivas por daño técnico.", "• Equipos Inactivos / Dañados:"),
          createBullet("Agrupa las observaciones físicas pendientes en las áreas de trabajo (goteras, pintura, fallos eléctricos).", "• Incidencias de Infraestructura:"),
          createParagraph("Asimismo, el sistema integra un Panel de Alertas Críticas que genera avisos automáticos si algún insumo supera su fecha de vencimiento respecto al año en curso (Julio 2026)."),

          createHeading2("3.2. Configuración de Plantas e Infraestructura"),
          createParagraph("Este módulo garantiza la escalabilidad física del sistema:"),
          createBullet("Permite dar de alta dinámicamente nuevas plantas piloto (ej. 'Planta Piloto de Lácteos y Quesos'). Al registrarse, el sistema inyecta la nueva planta en todos los selectores de la aplicación inmediatamente.", "Creación Dinámica de Plantas:"),
          createBullet("Permite seleccionar cualquier planta y enviar observaciones de fallos físicos (Goteras, Pintura, Eléctrico, Tuberías), alimentando la tabla de seguimiento de mantenimientos edilicios para el Decanato.", "Reporte de Problemas de Infraestructura:"),

          createHeading3("3.3. Bodega Central (Búsqueda Facetada e Inventario Inteligente)"),
          createParagraph("Módulo diseñado para la rápida localización e inspección de existencias:"),
          createBullet("Columna lateral con checkboxes que permite seleccionar una o varias Plantas Piloto y filtrar por Categoría (Insumos, Materiales, Equipos) de manera simultánea.", "Filtros Facetados Combinados:"),
          createBullet("Tabla inteligente con buscador por código o nombre. Aplica de forma automática la regla de negocio: si la fecha de vencimiento es menor a la fecha actual (Julio 2026), genera el badge visual 'CADUCADO'; si el stock es 0, genera el badge 'Por comprar'.", "Control de Caducidad y Stock 0:"),

          createHeading3("3.4. Maquinaria en Finca (Catálogo de Equipos y Bitácora Digital)"),
          createParagraph("Reemplaza el cuaderno físico de bitácora por un catálogo dinámico:"),
          createBullet("Desplegable superior para filtrar y explorar la maquinaria asignada a cada planta (con marca, número de serie o tag 'Sin Etiqueta' y año).", "Filtro por Planta Piloto:"),
          createBullet("Cada máquina incluye tres botones de estado: Operativo (Verde), Mantenimiento (Amarillo) e Inactivo por Daño (Rojo).", "Botones de Estado Semáforo:"),
          createBullet("Si el usuario selecciona Mantenimiento o Inactivo, la plataforma despliega una ventana flotante obligatoria que exige escribir la causa o daño específico antes de actualizar el estado del equipo.", "Registro Obligatorio de Daño:"),

          createHeading3("3.5. Módulo de Despachos Transaccionales"),
          createParagraph("Asegura el control estricto de las materias primas utilizadas en la docencia e investigación:"),
          createBullet("Captura limpia de datos en 2 columnas: Planta Origen, Seleccionar Ítem (filtrado automáticamente según las existencias de esa planta), Cantidad a Entregar, Estudiante/Destinatario, Técnico que despacha y Fecha.", "Formulario de Despacho:"),
          createBullet("Al procesar la transacción, el sistema valida existencias, descuenta automáticamente la cantidad entregada del inventario central en Bodega, refresca los indicadores del Dashboard y almacena la fila en la tabla de Historial de Despachos Recientes.", "Descuento en Tiempo Real e Historial:"),

          // ================= 4. DISEÑO DE INTERFAZ =================
          createHeading1("4. Diseño de Interfaz y Experiencia de Usuario (UX/UI)"),

          createParagraph("El diseño adopta una estética empresarial sobria, técnica y limpia, alineada a los estándares visuales de la UPEC:"),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: COLOR_BG_LIGHT, type: ShadingType.CLEAR, color: "auto" },
                    children: [createParagraph("Componente Visual", { bold: true })]
                  }),
                  new TableCell({
                    shading: { fill: COLOR_BG_LIGHT, type: ShadingType.CLEAR, color: "auto" },
                    children: [createParagraph("Criterio de Diseño y Paleta UPEC", { bold: true })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph("Barra Superior Principal", { bold: true })] }),
                  new TableCell({ children: [createParagraph("Verde UPEC (#056734) fija con distintivo UPEC y perfil de usuario.")] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph("Alertas y Advertencias", { bold: true })] }),
                  new TableCell({ children: [createParagraph("Amarillo UPEC (#FFD45B) para llamadas de atención, badges de stock y notas.")] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph("Fondo General de la Aplicación", { bold: true })] }),
                  new TableCell({ children: [createParagraph("Gris Claro Industrial (#F5F5F5) para descanso visual en jornadas de trabajo.")] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph("Contenedores y Tarjetas", { bold: true })] }),
                  new TableCell({ children: [createParagraph("Blanco Puro (#FFFFFF) con bordes delgados de 1px (#CBD5E1) y esquinas definidas.")] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [createParagraph("Navegación Lateral", { bold: true })] }),
                  new TableCell({ children: [createParagraph("Menú colapsable en Slate Oscuro (#1E293B) con 5 opciones claramente diferenciadas.")] })
                ]
              })
            ]
          }),

          new Paragraph({ text: "", spacing: { after: 200 } }),

          // ================= 5. HOJA DE RUTA =================
          createHeading1("5. Cronograma y Hoja de Ruta del Proyecto"),

          createParagraph("A continuación se sintetiza el plan de entregas establecido:"),

          createBullet("Levantamiento de reglas de negocio, maquetación UX/UI, implementación de la plataforma funcional con las 5 páginas interconectadas, motor de datos en tiempo real y entrega del prototipo ejecutable. (ENTREGADO Y OPERATIVO).", "Fase 1 (Semanas 1 - 4):"),
          createBullet("Conexión con base de datos centralizada, perfiles de usuario por rol (Docente, Técnico, Decanato), generación de comprobantes PDF/Excel e integración con código QR para etiquetas de maquinaria.", "Fase 2 (Siguientes Etapas):"),

          new Paragraph({ text: "", spacing: { after: 300 } }),

          // ================= 6. FIRMAS DE ACEPTACIÓN =================
          createHeading1("6. Conformidad y Firmas de la Propuesta"),

          createParagraph("En constancia de la recepción de los requerimientos y la propuesta funcional de la Fase 1 para la Planta Piloto FIACA UPEC:"),

          new Paragraph({ text: "", spacing: { after: 400 } }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    borders: { top: { style: BorderStyle.SINGLE, size: 8, color: COLOR_SLATE_DARK } },
                    children: [
                      createParagraph("Ing. Carlos Narváez, M.Sc.", { bold: true, alignment: AlignmentType.CENTER }),
                      createParagraph("Docente / Técnico de Planta Piloto", { alignment: AlignmentType.CENTER }),
                      createParagraph("FIACA - UPEC", { color: COLOR_SLATE_MUTED, alignment: AlignmentType.CENTER })
                    ]
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    borders: { top: { style: BorderStyle.SINGLE, size: 8, color: COLOR_SLATE_DARK } },
                    children: [
                      createParagraph("Equipo Desarrollador de Software", { bold: true, alignment: AlignmentType.CENTER }),
                      createParagraph("Líder de Desarrollo y Diseño UX/UI", { alignment: AlignmentType.CENTER }),
                      createParagraph("Sistema FIACA UPEC 2026", { color: COLOR_SLATE_MUTED, alignment: AlignmentType.CENTER })
                    ]
                  })
                ]
              })
            ]
          })

        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, 'PROPUESTA_FASE1_FIACA_UPEC.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log("SUCCESSFULLY_CREATED: " + outputPath);
}

generateDocx().catch(err => {
  console.error("ERROR generating DOCX:", err);
  process.exit(1);
});
