# AION Site (Next.js)

Site institucional multilíngue (`/pt`, `/en`, `/es`), otimizado para deploy em **Node** / **Docker** / **Coolify** / **Railway**.

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

## Coolify

O repositório inclui `docker-compose.yml` pronto para o **Docker Compose Build Pack** do Coolify v4.

### Como funciona 80 / 443

No Coolify, **não** publique `80:80` nem `443:443` no container. O **Traefik** (proxy integrado do Coolify) escuta nas portas 80 e 443 do servidor, obtém certificados Let's Encrypt e encaminha o tráfego HTTPS para a porta interna **3000** deste serviço.

### Passos no painel

1. **Novo recurso** → repositório Git (`aion-site`) → branch de produção.
2. **Build Pack:** Docker Compose (Coolify deteta `docker-compose.yml` na raiz).
3. **Variáveis de ambiente** (mínimo):
   - `NEXT_PUBLIC_SITE_URL` — ex.: `https://www.aion.eng.br` (sem barra final).
   - Marque `NEXT_PUBLIC_*` também para a fase de **build** (são inlined no JavaScript no `next build`).
   - Opcional: `CONTACT_ADMIN_SECRET` (export admin de contactos).
4. **Porta exposta:** `3000` (serviço `web` no compose).
5. **Domínio:** adicione o FQDN no recurso (ex.: `https://www.aion.eng.br`). O Coolify configura HTTP→HTTPS e o certificado.
6. **Health check:** path `/api/health` (já definido no compose e no `Dockerfile`).

### Volume persistente

Pedidos de contacto são gravados em `/data/contacts.json` dentro do container (volume `contact-data`). Redeploys não apagam estes dados.

### Teste local (sem Coolify)

```bash
docker compose up --build
# Site em http://localhost:3000 — localmente não há proxy 80/443; use Coolify ou um reverse proxy à parte.
```

## Railway

1. **Root Directory:** `aion-site` (se o repositório tiver esta subpasta).
2. Ficheiros na raiz do serviço: `railway.toml` (Dockerfile + healthcheck), opcionalmente `nixpacks.toml` se usar builder Nixpacks em vez de Docker.
3. **Variáveis de serviço:** pelo menos `NEXT_PUBLIC_SITE_URL`. Para **Dockerfile**, no Railway ative essas variáveis também para a fase de **build** (Settings → variáveis → “Add” com contexto Build, ou equivalente).
4. **Deploy / Health check:** path `/api/health` (já referenciado em `railway.toml`).
5. **Porta:** o serviço escuta `PORT` (Railway injeta automaticamente).

## Manutenção

- Dependências: Dependabot em `.github/dependabot.yml`.
- CI: `.github/workflows/ci.yml` (lint, typecheck, build).
