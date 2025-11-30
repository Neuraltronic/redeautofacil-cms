# CLAUDE.md

Este arquivo fornece orientações ao Claude Code (claude.ai/code) para trabalhar com este repositório.

## Idioma / Language

**IMPORTANTE:** Sempre se comunique em **Português Brasileiro**. Todas as respostas, mensagens de commit e documentação devem ser em PT-BR.

## Visão Geral

Strapi CMS v5 para a Rede Auto Fácil. Backend headless que fornece API REST para o website Next.js.

## Comandos Essenciais

```bash
npm run develop   # Servidor de desenvolvimento (http://localhost:1337)
npm run build     # Build de produção
npm run start     # Servidor de produção
npm run strapi    # CLI do Strapi
```

## Arquitetura

### Content Types (src/api/)
- **portfolio** - Trabalhos realizados (galeria antes/depois)
- **services** - Serviços oferecidos
- **testimonials** - Depoimentos de clientes

### Configurações (config/)
- `admin.ts` - Configuração do painel admin
- `database.ts` - Conexão com PostgreSQL
- `middlewares.ts` - CORS, uploads, etc.
- `plugins.ts` - Plugins do Strapi
- `server.ts` - Configuração do servidor

## Banco de Dados

- **Desenvolvimento:** SQLite (padrão)
- **Produção:** PostgreSQL (Railway)

## Variáveis de Ambiente Críticas

```env
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://...
APP_KEYS=chave1,chave2,chave3,chave4
API_TOKEN_SALT=salt-para-api-tokens
ADMIN_JWT_SECRET=secret-jwt-admin
```

## Deploy

Hospedado no Railway com PostgreSQL. Deploy automático via push no `main`.

## Convenções

- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`)
- **Content Types:** Nomes em inglês, singular
- **API:** REST, autenticação via Bearer Token
