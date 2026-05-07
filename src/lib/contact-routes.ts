/** Rotas da página “Fale conosco” por idioma (formulário será ligado mais tarde). */
export const CONTACT_PAGE_PATH = {
  pt: "/pt/fale-conosco",
  en: "/en/contact",
  es: "/es/contacto",
} as const;

const PATH_SET = new Set<string>(Object.values(CONTACT_PAGE_PATH));

export function isContactPagePath(pathname: string): boolean {
  return PATH_SET.has(pathname);
}
