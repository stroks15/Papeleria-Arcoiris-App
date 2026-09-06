import RNFS from 'react-native-fs';

export interface PdfOptions { nombre?: string; }

/**
 * Base de generación PDF. La implementación nativa de PDF se conecta en la
 * siguiente etapa para evitar depender de un motor WebView.
 */
export async function generarPDF(listaImagenes: string[], options: PdfOptions = {}): Promise<string> {
  if (!listaImagenes.length) throw new Error('No hay imágenes para crear el PDF.');
  const nombre = options.nombre?.trim() || `arcoiris-${Date.now()}`;
  const destino = `${RNFS.CachesDirectoryPath}/${nombre}.pdf`;
  // TODO: conectar el generador PDF nativo (Letter, una página por imagen,
  // respetando proporción y orientación). No se simula un PDF válido.
  return destino;
}
