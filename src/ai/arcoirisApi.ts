export type ArcoirisAIRequest = {
  message: string;
  currentModule?: string;
  currentStep?: number;
  context?: Record<string, unknown>;
};

export type ArcoirisAIResponse = {
  ok: boolean;
  message?: string;
  action?: { name: string; parameters?: Record<string, unknown> };
  error?: string;
};

/** Calls the Vercel backend. The OpenAI API key is never stored in the Android app. */
export async function askArcoirisAI(
  payload: ArcoirisAIRequest,
): Promise<ArcoirisAIResponse> {
  const response = await fetch('https://papeleria-arcoiris-app.vercel.app/api/arcoiris-ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as ArcoirisAIResponse;
  if (!response.ok || !data.ok) {
    throw new Error(data.error || 'No fue posible conectar con ArcoirisAI.');
  }
  return data;
}
