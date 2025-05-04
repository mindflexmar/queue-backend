const fp = require('fastify-plugin');
const jwt = require('jsonwebtoken');

async function authPlugin(fastify) {
  fastify.decorate('authenticate', async (request, reply) => {
    try {
      const token = request.headers.authorization?.split(' ')[1];
      if (!token) throw new Error('Missing token');
      
      request.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized' });
    }
  });

  fastify.decorate('authorize', (roles) => async (request, reply) => {
    if (!roles.includes(request.user.role)) {
      reply.code(403).send({ error: 'Forbidden' });
    }
  });
}

module.exports = fp(authPlugin);