require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const path = require('path');
fastify.register(require('./src/plugins/prisma'));
fastify.register(require('./src/plugins/errorHandler'));
fastify.register(require('./src/plugins/auth'));
fastify.register(require('./src/plugins/swagger')); 
fastify.register(require('./src/routes/citizen.routes'), { prefix: '/citizens' });
fastify.register(require('./src/routes/request.routes'), { prefix: '/requests' });
fastify.register(require('./src/routes/specialist.routes'), { prefix: '/specialists' });
fastify.register(require('./src/routes/specialization.routes'), { prefix: '/specializations' });


//fastify.get('/', async (request, reply) => {
    //return { message: 'API is working' };
  //});

const start = async () => {
    try {
      await fastify.listen({ 
        port: process.env.PORT || 3000, 
        host: '0.0.0.0' 
      });
      console.log(`Server running on ${fastify.server.address().port}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };

start();
