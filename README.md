<div align="center">

# Rede Auto Fácil - Strapi CMS

Backend headless CMS para o website da Rede Auto Fácil, desenvolvido com Strapi v5.

[![Strapi](https://img.shields.io/badge/Strapi-5-4945FF?style=for-the-badge&logo=strapi&logoColor=white)](https://strapi.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Railway](https://img.shields.io/badge/Railway-Deploy-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app/)

</div>

## Visão Geral

Este projeto fornece a API e o painel de administração para gerenciar o conteúdo do website da Rede Auto Fácil.

## Tecnologias

- **Strapi v5** - Headless CMS
- **PostgreSQL** - Banco de dados
- **Node.js 18+** - Runtime

## Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior
- PostgreSQL (local ou remoto)

## Instalação

```bash
# Clone o repositório
git clone https://github.com/redeautofacil/cms.git
cd cms

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute em desenvolvimento
npm run develop
```

Acesse o painel admin em [http://localhost:1337/admin](http://localhost:1337/admin)

## Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

| Variável | Descrição |
|----------|-----------|
| `HOST` | Host do servidor (0.0.0.0) |
| `PORT` | Porta do servidor (1337) |
| `APP_KEYS` | Chaves de aplicação (separadas por vírgula) |
| `API_TOKEN_SALT` | Salt para tokens de API |
| `ADMIN_JWT_SECRET` | Secret para JWT do admin |
| `TRANSFER_TOKEN_SALT` | Salt para tokens de transferência |
| `JWT_SECRET` | Secret para JWT |
| `DATABASE_CLIENT` | Cliente do banco (postgres) |
| `DATABASE_URL` | URL de conexão PostgreSQL |

## Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run develop` | Servidor de desenvolvimento |
| `npm run start` | Servidor de produção |
| `npm run build` | Build de produção |
| `npm run strapi` | CLI do Strapi |

## Content Types

### Portfolio
- `title` - Título do trabalho
- `description` - Descrição do serviço
- `images` - Galeria de imagens (antes/depois)
- `category` - Categoria (funilaria, pintura, etc.)

### Services
- `name` - Nome do serviço
- `description` - Descrição detalhada
- `icon` - Ícone do serviço
- `featured` - Destaque na home

### Testimonials
- `author` - Nome do cliente
- `content` - Depoimento
- `rating` - Avaliação (1-5)
- `date` - Data do depoimento

## Deploy no Railway

### 1. Criar projeto

1. Acesse [railway.app](https://railway.app)
2. Clique em "New Project"
3. Selecione "Deploy from GitHub repo"
4. Conecte este repositório

### 2. Adicionar PostgreSQL

1. No projeto, clique em "+ New"
2. Selecione "Database" → "PostgreSQL"

### 3. Configurar variáveis

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=chave1,chave2,chave3,chave4
API_TOKEN_SALT=salt-aleatorio
ADMIN_JWT_SECRET=jwt-secret-aleatorio
TRANSFER_TOKEN_SALT=transfer-salt
JWT_SECRET=jwt-secret
DATABASE_CLIENT=postgres
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

### 4. Gerar domínio

1. Clique no serviço
2. Settings → Networking → Generate Domain

## Gerando Tokens de API

1. Acesse o painel admin
2. Settings → API Tokens
3. Create new API Token
4. Tipo: Full access ou Custom
5. Copie o token gerado

## Integração com Frontend

O frontend Next.js consome a API do Strapi através de:

```env
STRAPI_URL=https://seu-dominio.railway.app
STRAPI_API_TOKEN=seu-token-api
```

## Estrutura do Projeto

```
redeautofacil-cms/
├── config/           # Configurações do Strapi
├── database/         # Migrações e seeds
├── public/           # Arquivos públicos
├── src/
│   ├── api/          # Content Types e controllers
│   ├── components/   # Componentes reutilizáveis
│   └── extensions/   # Extensões do Strapi
├── types/            # Tipos TypeScript
├── .env              # Variáveis de ambiente
├── package.json
└── tsconfig.json
```

## Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.

---

© 2025 Rede Auto Fácil. Todos os direitos reservados.
