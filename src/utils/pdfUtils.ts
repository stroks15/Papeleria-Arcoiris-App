import RNFS from 'react-native-fs';
import { generatePDF } from 'react-native-html-to-pdf';

export interface PdfOptions { nombre?: string; }
const safeName = (name: string) => name.replace(/[^a-zA-Z0-9-_áéíóúÁÉÍÓÚñÑ ]/g, '').trim().replace(/\s+/g, '-') || `arcoiris-${Date.now()}`;
const imageSource = async (uri: string) => {
  if (uri.startsWith('data:image/') || uri.startsWith('file://')) return uri;
  if (uri.startsWith('content://')) { const target = `${RNFS.CachesDirectoryPath}/arcoiris-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`; await RNFS.copyFile(uri, target); return `file://${target}`; }
  return uri;
};

export async function generarPDF(listaImagenes: string[], options: PdfOptions = {}): Promise<string> {
  if (!listaImagenes.length) throw new Error('No hay imágenes para crear el PDF.');
  const nombre = safeName(options.nombre || `arcoiris-${Date.now()}`);
  const fuentes = await Promise.all(listaImagenes.map(imageSource));
  const paginas = fuentes.map((src, i) => `<section class="page"><img src="${src}"/><div class="num">${i + 1}</div></section>`).join('');
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>@page{size:letter;margin:0}html,body{margin:0;padding:0;background:#fff}.page{width:8.5in;height:11in;display:flex;align-items:center;justify-content:center;position:relative;page-break-after:always;overflow:hidden}.page:last-child{page-break-after:auto}.page img{max-width:7.9in;max-height:10.4in;width:auto;height:auto;object-fit:contain}.num{position:absolute;right:.25in;bottom:.15in;font:12px Arial;color:#666}</style></head><body>${paginas}</body></html>`;
  const result = await generatePDF({ html, fileName: nombre, directory: 'Documents' });
  if (!result.filePath) throw new Error('No se pudo generar el PDF.');
  return result.filePath;
}
