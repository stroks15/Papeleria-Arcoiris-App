export default function handler(_req, res) {
  res.status(200).json({ ok: true, service: 'Papelería Arcoíris API', ai: Boolean(process.env.OPENAI_API_KEY) });
}
