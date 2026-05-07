/** Apenas dígitos. */
export function onlyDigits(s: string): string {
  return s.replace(/\D/g, "");
}

/** CPF com dígitos verificadores (Brasil). */
export function isValidCPF(raw: string): boolean {
  const c = onlyDigits(raw);
  if (c.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(c)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(c.charAt(i)) * (10 - i);
  let d1 = (sum * 10) % 11;
  if (d1 === 10) d1 = 0;
  if (d1 !== Number(c.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(c.charAt(i)) * (11 - i);
  let d2 = (sum * 10) % 11;
  if (d2 === 10) d2 = 0;
  return d2 === Number(c.charAt(10));
}

/** CNPJ com dígitos verificadores (Brasil). */
export function isValidCNPJ(raw: string): boolean {
  const c = onlyDigits(raw);
  if (c.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(c)) return false;

  const calc = (base: string, weights: number[]) => {
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += Number(base.charAt(i)) * weights[i]!;
    }
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const d1 = calc(c.substring(0, 12), w1);
  if (d1 !== Number(c.charAt(12))) return false;
  const d2 = calc(c.substring(0, 13), w2);
  return d2 === Number(c.charAt(13));
}

export function formatCPFInput(value: string): string {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9)
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

export function formatCNPJInput(value: string): string {
  const d = onlyDigits(value).slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8)
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12)
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

export function formatCEPInput(value: string): string {
  const d = onlyDigits(value).slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

/** Telefone BR: DDD + 8 ou 9 dígitos. */
export function formatPhoneBRInput(value: string): string {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function isValidBrazilPhone(raw: string): boolean {
  const d = onlyDigits(raw);
  if (d.length < 10 || d.length > 11) return false;
  const ddd = Number(d.slice(0, 2));
  if (ddd < 11 || ddd > 99) return false;
  return true;
}

export function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}
