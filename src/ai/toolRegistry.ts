export type ToolCategory = 'herramienta' | 'gobierno' | 'navegacion' | 'archivo';

export type ToolDefinition = {
  name: string;
  title: string;
  description: string;
  category: ToolCategory;
  requiresConfirmation?: boolean;
  route?: string;
  parameters?: string[];
};

export const ARCOIRIS_TOOLS: readonly ToolDefinition[] = [
  { name: 'create_pdf_from_photos', title: 'Foto a PDF', description: 'Convierte fotografías seleccionadas en un PDF listo para compartir o imprimir.', category: 'herramienta', route: 'FotoPDF', parameters: ['photos', 'paperSize', 'orientation'] },
  { name: 'scan_to_pdf', title: 'Escaneo múltiple a PDF', description: 'Escanea varias páginas y las reúne en un solo PDF.', category: 'herramienta', route: 'EscaneoPDF', parameters: ['pages', 'paperSize', 'quality'] },
  { name: 'compress_pdf', title: 'Comprimir PDF', description: 'Reduce el tamaño de un PDF para facilitar su envío.', category: 'herramienta', route: 'ComprimirPDF', parameters: ['inputFile', 'compression'] },
  { name: 'restore_photo', title: 'Restaurar fotos', description: 'Prepara una fotografía antigua o dañada para mejorarla y restaurarla.', category: 'herramienta', route: 'RestaurarFotos', parameters: ['photo', 'operations'] },
  { name: 'create_cheatsheet', title: 'Hoja de resumen visual', description: 'Convierte un tema en una hoja visual clara para estudiar.', category: 'herramienta', route: 'Cheatsheet', parameters: ['topic', 'audience', 'format'] },
  { name: 'create_local_ad', title: 'Anuncio / cartel', description: 'Crea material publicitario para un negocio local.', category: 'herramienta', route: 'AnuncioLocal', parameters: ['title', 'services', 'prices', 'contact', 'format'] },
  { name: 'create_flashcards', title: 'Flashcards', description: 'Genera tarjetas de estudio a partir de un tema.', category: 'herramienta', route: 'Flashcards', parameters: ['topic', 'numberOfCards', 'difficulty'] },
  { name: 'create_print_order', title: 'Pedido de impresión', description: 'Prepara un pedido de impresión y solicita confirmación antes de finalizarlo.', category: 'herramienta', route: 'PedidoImpresion', requiresConfirmation: true, parameters: ['quantity', 'color', 'paperSize', 'sides', 'copies'] },
  { name: 'create_id_photos', title: 'Foto tipo credencial', description: 'Prepara fotografías para credencial, infantil u otro formato.', category: 'herramienta', route: 'FotoCredencial', parameters: ['photoType', 'quantity', 'paperSize', 'background'] },
  { name: 'create_reminder', title: 'Recordatorio', description: 'Crea un recordatorio con fecha y hora.', category: 'herramienta', route: 'Recordatorios', parameters: ['title', 'date', 'time'] },
  { name: 'fill_form', title: 'Llenado de formatos', description: 'Ayuda a completar un formato campo por campo y valida la información.', category: 'herramienta', route: 'Formatos', parameters: ['formType', 'fields'] },
  { name: 'research_topic', title: 'Investigación', description: 'Organiza una investigación y sus fuentes.', category: 'herramienta', route: 'Investigacion', parameters: ['topic', 'audience', 'length', 'format'] },
  { name: 'open_government_procedure', title: 'Trámite gubernamental', description: 'Abre el módulo de un trámite gubernamental y guía al usuario paso a paso.', category: 'gobierno', parameters: ['procedure'] },
  { name: 'help_user', title: 'Ayuda', description: 'Explica al usuario qué hacer sin ejecutar una herramienta.', category: 'navegacion' },
  { name: 'reset_procedure', title: 'Nuevo trámite', description: 'Limpia el flujo actual y vuelve al inicio.', category: 'navegacion' },
  { name: 'go_back', title: 'Regresar', description: 'Regresa al paso o pantalla anterior.', category: 'navegacion' },
  { name: 'go_home', title: 'Inicio', description: 'Regresa a la pantalla principal.', category: 'navegacion' },
  { name: 'open_file', title: 'Abrir archivo', description: 'Abre un archivo generado por la aplicación.', category: 'archivo', parameters: ['fileType'] },
  { name: 'share_file', title: 'Compartir archivo', description: 'Abre el menú nativo para compartir un archivo.', category: 'archivo', requiresConfirmation: true, parameters: ['fileUri'] },
  { name: 'print_file', title: 'Imprimir archivo', description: 'Prepara un archivo y abre el sistema de impresión.', category: 'archivo', requiresConfirmation: true, parameters: ['fileUri'] },
] as const;

export function getTool(name: string): ToolDefinition | undefined {
  return ARCOIRIS_TOOLS.find((tool) => tool.name === name);
}
