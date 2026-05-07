export type ViaCepSuccess = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: undefined;
};

export type ViaCepError = { erro: true };

export type ViaCepJson = ViaCepSuccess | ViaCepError;

export function normalizeCepDigits(cep: string): string {
  return cep.replace(/\D/g, "").slice(0, 8);
}

/** Busca endereço na API pública ViaCEP (apenas cliente/servidor com rede). */
export async function fetchViaCep(
  cepDigits: string,
): Promise<ViaCepSuccess | null> {
  const d = normalizeCepDigits(cepDigits);
  if (d.length !== 8) return null;

  const res = await fetch(`https://viacep.com.br/ws/${d}/json/`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return null;

  const data = (await res.json()) as ViaCepJson;
  if ("erro" in data && data.erro) return null;
  const ok = data as ViaCepSuccess;
  if (!ok.localidade || !ok.uf) return null;
  return ok;
}
