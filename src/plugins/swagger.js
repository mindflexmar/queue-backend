const fp = require('fastify-plugin');
const path = require('path');
const yaml = require('yaml');
const fs = require('fs');

async function swaggerPlugin(fastify) {
  const swaggerConfig = yaml.parse(
    fs.readFileSync(path.join(__dirname, '../config/swagger-config.yaml'), 'utf8')
  );

  await fastify.register(require('@fastify/swagger'), {
    openapi: swaggerConfig
  });

  await fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full'
    }
  });
}

module.exports = fp(swaggerPlugin);