# AION Site (Next.js)

Site institucional multilíngue (`/pt`, `/en`, `/es`), otimizado para deploy em **Node** / **Docker** / **Railway**.

## Requisitos

- Node **22** (ver `.nvmrc`)
- `npm ci`

## Variáveis de ambiente

Copie `.env.example` e ajuste:

| Variável | Uso |
|----------|-----|
| `NEXT_PUBLIC_SITE_URL` | URL canónica (SEO, sitemap, OG, JSON-LD). Sem barra final. Obrigatória em produção. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Opcional. Se definido, aparece banner de cookies e métricas Plausible após consentimento. |
| `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC` | Opcional. Self-hosted Plausible; senão usa `plausible.io/js/script.js`. |

**Importante (Docker / build em CI):** variáveis `NEXT_PUBLIC_*` são incorporadas no JavaScript no momento do **`next build`**. Com Dockerfile, configure as mesmas variáveis no Railway como **variáveis de build** (Build / Docker build args), não só no runtime.

## Comandos

```bash
npm run dev          # desenvolvimento
npm run check        # lint + typecheck + build
npm run start        # produção (após build)
```

## Healthcheck

- `GET /api/health` — JSON `{ ok: true }` (Railway / load balancer).

## Docker (standalone)

Na pasta deste projeto, passando a URL pública no **build**:

```bash
docker build -t aion-site \
  --build-arg NEXT_PUBLIC_SITE_URL=https://www.aion.eng.br \
  --build-arg NEXT_PUBLIC_PLAUSIBLE_DOMAIN= \
  .
docker run --rm -p 3000:3000 aion-site
```

O `Dockerfile` já define defaults para `NEXT_PUBLIC_*` para o build não falhar localmente; em produção use `--build-arg` com os valores reais.

## Railway

1. **Root Directory:** `aion-site` (se o repositório tiver esta subpasta).
2. Ficheiros na raiz do serviço: `railway.toml` (Dockerfile + healthcheck), opcionalmente `nixpacks.toml` se usar builder Nixpacks em vez de Docker.
3. **Variáveis de serviço:** pelo menos `NEXT_PUBLIC_SITE_URL`. Para **Dockerfile**, no Railway ative essas variáveis também para a fase de **build** (Settings → variáveis → “Add” com contexto Build, ou equivalente).
4. **Deploy / Health check:** path `/api/health` (já referenciado em `railway.toml`).
5. **Porta:** o serviço escuta `PORT` (Railway injeta automaticamente).

## Manutenção

- Dependências: Dependabot em `.github/dependabot.yml`.
- CI: `.github/workflows/ci.yml` (lint, typecheck, build).
