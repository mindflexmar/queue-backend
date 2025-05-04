require('dotenv').config();

let isShuttingDown = false;

const createServer = async () => {
  const fastify = require('fastify')({ 
    logger: true,
    disableRequestLogging: process.env.NODE_ENV === 'production'
  });

  const registerPlugins = async () => {
    await fastify.register(require('./src/plugins/prisma'));
    await fastify.register(require('./src/plugins/errorHandler'));
    await fastify.register(require('./src/plugins/auth'));
    await fastify.register(require('./src/plugins/swagger'));
  };

  const registerRoutes = async () => {
    fastify.get('/', async () => ({ 
      status: 'running', 
      timestamp: new Date().toISOString() 
    }));

    await fastify.register(require('./src/routes'));
  };

  try {
    await registerPlugins();
    await registerRoutes();

    await fastify.listen({ 
      port: process.env.PORT || 3000, 
      host: '0.0.0.0' 
    });

    console.log(`Server ready at http://localhost:${fastify.server.address().port}`);
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Documentation available at http://localhost:${fastify.server.address().port}/docs`);
    }

    return fastify;
  } catch (err) {
    fastify.log.error(err);
    throw err;
  }
};

const shutdown = async (server) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  try {
    if (server) {
      await server.close();
      console.log('Server successfully shut down');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
};


(async () => {
  process.removeAllListeners('SIGTERM');
  process.removeAllListeners('SIGINT');
  process.removeAllListeners('SIGUSR2');

  let server;
  try {
    server = await createServer();

    process.on('SIGTERM', () => shutdown(server));
    process.on('SIGINT', () => shutdown(server));
    process.once('SIGUSR2', () => {
      shutdown(server).then(() => {
        process.kill(process.pid, 'SIGUSR2');
      });
    });

    process.setMaxListeners(20);
  } catch (err) {
    console.error('Failed to start server:', err);
    await shutdown(server);
  }
})();