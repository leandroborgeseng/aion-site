import type { PortalLoginDict } from "@/components/PortalLoginSection";

export type PortalLoginPageSource = PortalLoginDict & {
  browserTitle: string;
  metaDescription: string;
};

export function portalFormDict(full: PortalLoginPageSource): PortalLoginDict {
  return {
    h1: full.h1,
    subtitle: full.subtitle,
    emailLabel: full.emailLabel,
    passwordLabel: full.passwordLabel,
    emailPlaceholder: full.emailPlaceholder,
    passwordPlaceholder: full.passwordPlaceholder,
    submit: full.submit,
    backHome: full.backHome,
  };
}
