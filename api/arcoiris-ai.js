const MODEL = process.env.ARCOIRIS_AI_MODEL || 'gpt-5.6-luna';

const TOOLS = [
  ['create_pdf_from_photos', 'Foto a PDF'],
  ['scan_to_pdf', 'Escaneo múltiple a PDF'],
  ['compress_pdf', 'Comprimir PDF'],
  ['restore_photo', 'Restaurar fotos'],
  ['create_cheatsheet', 'Hoja de resumen visual'],
  ['create_local_ad', 'Anuncio / cartel'],
  ['create_flashcards', 'Flashcards'],
  ['create_print_order', 'Pedido de impresión'],
  ['create_id_photos', 'Foto tipo credencial'],
  ['create_reminder', 'Recordatorio'],
  ['fill_form', 'Llenado de formatos'],
  ['research_topic', 'Investigación'],
  ['open_government_procedure', 'Trámite gubernamental'],
  ['help_user', 'Ayuda'],
  ['reset_procedure', 'Nuevo trámite'],
  ['go_back', 'Regresar'],
  ['go_home', 'Inicio'],
  ['open_file', 'Abrir archivo'],
  ['share_file', 'Compartir archivo'],
  ['print_file', 'Imprimir archivo'],
];

const SYSTEM_PROMPT = `Eres ArcoirisAI Assistant de Papelería Arcoíris, una asistente amable para personas que pueden tener poca experiencia con tecnología.

Tu trabajo es entender la petición del usuario y elegir UNA acción de la lista permitida. Nunca inventes acciones, nunca ejecutes código y nunca intentes saltarte CAPTCHAs.

Devuelve EXCLUSIVAMENTE JSON válido con esta forma:
{"reply":"respuesta breve y clara en español","action":"nombre_de_accion","parameters":{}}

Si solo necesita orientación usa help_user. Para trámites gubernamentales usa open_government_procedure y pide los datos mínimos necesarios. Para compartir, imprimir, pedidos, pagos o acciones que puedan afectar datos personales, indica que se pedirá confirmación en la app.

Acciones permitidas:
${TOOLS.map(([name, title]) => `- ${name}: ${title}`).join('\n')}`;

function getText(data) {
  if (typeof data.output_text === 'string' && data.output_text.trim()) return data.output_text;
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.type === 'output_text' && typeof content.text === 'string') return content.text;
    }
  }
  return '';
}

function cleanJson(text) {
  const trimmed = String(text || '').trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fenced ? fenced[1].trim() : trimmed;
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    return res.status(204).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Método no permitido.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ ok: false, error: 'ArcoirisAI no está configurado todavía.' });
  }

  const body = req.body || {};
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) return res.status(400).json({ ok: false, error: 'Falta el mensaje.' });

  const context = body.context && typeof body.context === 'object' ? body.context : {};
  const input = [
    `Contexto actual: módulo=${context.currentModule || 'inicio'}, paso=${context.currentStep || 'inicio'}.`,
    `Mensaje del usuario: ${message}`,
  ].join('\n');

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        instructions: SYSTEM_PROMPT,
        input,
        max_output_tokens: 500,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI request failed:', response.status, data?.error?.type || 'unknown');
      return res.status(502).json({ ok: false, error: 'No se pudo conectar con ArcoirisAI.' });
    }

    const raw = cleanJson(getText(data));
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return res.status(502).json({ ok: false, error: 'ArcoirisAI devolvió una respuesta no válida.' });
    }

    const allowed = new Set(TOOLS.map(([name]) => name));
    if (!allowed.has(parsed.action)) {
      return res.status(502).json({ ok: false, error: 'La acción solicitada no está permitida.' });
    }

    return res.status(200).json({
      ok: true,
      reply: typeof parsed.reply === 'string' ? parsed.reply : 'Listo. Te ayudo con el siguiente paso.',
      action: parsed.action,
      parameters: parsed.parameters && typeof parsed.parameters === 'object' ? parsed.parameters : {},
      model: MODEL,
    });
  } catch (error) {
    console.error('ArcoirisAI error:', error instanceof Error ? error.message : 'unknown');
    return res.status(500).json({ ok: false, error: 'Error interno de ArcoirisAI.' });
  }
}
