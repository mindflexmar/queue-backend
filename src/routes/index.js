module.exports = async (fastify) => {
    await fastify.register(require('./citizen.routes'), { prefix: '/citizens' });
    await fastify.register(require('./request.routes'), { prefix: '/requests' });
    await fastify.register(require('./specialist.routes'), { prefix: '/specialists' });
    await fastify.register(require('./specialization.routes'), { prefix: '/specializations' });
  };
  