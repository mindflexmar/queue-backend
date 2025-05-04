const requestController = require('../controllers/request.controller');
const { requestSchema } = require('../validation/request.validation');

module.exports = async (fastify) => {
  fastify.get('/', requestController.getAllRequests);
  fastify.get('/:id', requestController.getRequest);
  fastify.post('/', { schema: requestSchema.create }, requestController.createRequest);
  fastify.put('/:id', { schema: requestSchema.update }, requestController.updateRequest);
  fastify.delete('/:id', requestController.deleteRequest);
};