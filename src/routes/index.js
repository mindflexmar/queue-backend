const requestRoutes = require('./request.routes');
const citizenRoutes = require('./citizen.routes');

async function routes(fastify, options) {
  fastify.register(requestRoutes, { prefix: '/requests' });
  fastify.register(citizenRoutes, { prefix: '/citizens' });
}

module.exports = routes;
