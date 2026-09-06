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

type BackendResponse = {
  ok: boolean;
  reply?: string;
  action?: string;
  parameters?: Record<string, unknown>;
  error?: string;
};

const API_URL = 'https://app-arcoiris496.vercel.app/api/arcoiris-ai';

/** Calls the Vercel backend. The OpenAI API key is never stored in the Android app. */
export async function askArcoirisAI(
  payload: ArcoirisAIRequest,
): Promise<ArcoirisAIResponse> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      context: {
        ...(payload.context || {}),
        currentModule: payload.currentModule || 'inicio',
        currentStep: payload.currentStep || 1,
      },
    }),
  });

  const data = (await response.json()) as BackendResponse;
  if (!response.ok || !data.ok) {
    throw new Error(data.error || 'No fue posible conectar con ArcoirisAI.');
  }

  return {
    ok: true,
    message: data.reply,
    action: data.action
      ? { name: data.action, parameters: data.parameters || {} }
      : undefined,
  };
}
