export const PRICE = 2300;
export const MAX_INSTALLMENTS = 6;

export function getAsaasConfig() {
  const env = (Deno.env.get("ASAAS_ENV") ?? "production").toLowerCase();
  const isSandbox = env === "sandbox";
  const base = isSandbox
    ? "https://api-sandbox.asaas.com/v3"
    : "https://api.asaas.com/v3";
  const key = isSandbox
    ? Deno.env.get("ASAAS_API_KEY_CHORDATA_SANDBOX")
    : Deno.env.get("ASAASOFICIAL");

  return { env, base, key };
}

export async function asaasFetch(
  path: string,
  init: RequestInit = {},
): Promise<unknown> {
  const { base, key } = getAsaasConfig();
  if (!key) {
    throw new Error("Configuração Asaas ausente (chave API).");
  }

  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      access_token: key,
      ...(init.headers ?? {}),
    },
  });

  const text = await res.text();
  let body: unknown = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  if (!res.ok) {
    const errObj = body as { errors?: Array<{ description?: string }> } | null;
    console.error(`Asaas ${path} failed [${res.status}]:`, body);
    throw new Error(
      `Asaas ${res.status}: ${
        typeof body === "object" && body
          ? errObj?.errors?.[0]?.description ?? JSON.stringify(body)
          : String(body)
      }`,
    );
  }

  return body;
}
