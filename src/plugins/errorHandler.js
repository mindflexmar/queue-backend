const fp = require('fastify-plugin');

async function errorHandlerPlugin(fastify) {
  fastify.setErrorHandler((error, request, reply) => {
    const statusCode = error.statusCode || 500;
    
    if (error.validation) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: error.validation
      });
    }
    
    request.log.error(error);
    
    reply.status(statusCode).send({
      error: {
        message: statusCode === 500 ? 'Internal Server Error' : error.message,
        code: error.code
      }
    });
  });
}

module.exports = fp(errorHandlerPlugin);