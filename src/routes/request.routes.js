const { 
    getAllRequests,
    getRequest,
    createRequest,
    updateRequest,
    deleteRequest
  } = require('../controllers/request.controller');
  const { requestSchema } = require('../validation/request.validation');
  
  async function routes(fastify) {
    fastify.get('/', getAllRequests);
    fastify.get('/:id', getRequest);
    fastify.post('/', { schema: requestSchema.create }, createRequest);
    fastify.put('/:id', { schema: requestSchema.update }, updateRequest);
    fastify.delete('/:id', deleteRequest);
  }
  

  module.exports = routes;