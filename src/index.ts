import type { Core } from '@strapi/strapi';
import crypto from 'crypto';

const MIGRATION_TOKEN_NAME = 'Migration Token';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // 1. Configurar permissões públicas para os Content-Types
    await setupPublicPermissions(strapi);

    // 2. Criar API Token para migração (se não existir)
    await createMigrationToken(strapi);
  },
};

async function setupPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (publicRole) {
    const permissions = await strapi.query('plugin::users-permissions.permission').findMany({
      where: { role: publicRole.id },
    });

    const existingActions = permissions.map((p: { action: string }) => p.action);

    // Permissões que queremos habilitar para acesso público (somente leitura)
    const publicPermissions = [
      // Categories
      'api::category.category.find',
      'api::category.category.findOne',
      // Authors
      'api::author.author.find',
      'api::author.author.findOne',
      // Blog Posts
      'api::blog-post.blog-post.find',
      'api::blog-post.blog-post.findOne',
      // Projects
      'api::project.project.find',
      'api::project.project.findOne',
    ];

    for (const action of publicPermissions) {
      if (!existingActions.includes(action)) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: {
            action,
            role: publicRole.id,
          },
        });
        console.log(`[Bootstrap] Permissão adicionada: ${action}`);
      }
    }

    console.log('[Bootstrap] Permissões públicas configuradas!');
  }
}

async function createMigrationToken(strapi: Core.Strapi) {
  try {
    // Verifica se já existe um token com esse nome
    const existingToken = await strapi.query('admin::api-token').findOne({
      where: { name: MIGRATION_TOKEN_NAME },
    });

    if (existingToken) {
      console.log(`[Bootstrap] API Token "${MIGRATION_TOKEN_NAME}" já existe.`);
      return;
    }

    // Gera um novo token
    const accessKey = crypto.randomBytes(128).toString('hex');

    // Cria o token usando o serviço interno do Strapi
    const apiTokenService = strapi.service('admin::api-token');

    if (apiTokenService && typeof apiTokenService.create === 'function') {
      const token = await apiTokenService.create({
        name: MIGRATION_TOKEN_NAME,
        description: 'Token para migração de dados do Supabase para Strapi',
        type: 'full-access',
        lifespan: null, // Sem expiração
      });

      console.log('\n' + '='.repeat(60));
      console.log('[Bootstrap] API TOKEN CRIADO COM SUCESSO!');
      console.log('='.repeat(60));
      console.log(`Nome: ${MIGRATION_TOKEN_NAME}`);
      console.log('Tipo: Full Access');
      console.log('\nIMPORTANTE: Copie este token! Ele não será mostrado novamente.');
      console.log('\nSTRAPI_API_TOKEN=' + token.accessKey);
      console.log('\nAdicione ao .env.local do projeto Next.js');
      console.log('='.repeat(60) + '\n');
    } else {
      console.log('[Bootstrap] Serviço de API Token não disponível.');
    }
  } catch (error) {
    console.error('[Bootstrap] Erro ao criar API Token:', error);
  }
}
