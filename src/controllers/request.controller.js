const RequestService = require('../services/request.service');
const prisma = require('../config/prisma');
const requestService = new RequestService(prisma);

const handleError = (err, req, reply, customMessage) => {
  req.log.error(err);
  reply.status(500).send({ error: customMessage || 'Something went wrong' });
};


module.exports = {
  getAllRequests: async (req, reply) => {
    try {
      const requests = await requestService.getAllRequests();
      reply.send(requests);
    } catch (err) {
      handleError(err, req, reply, 'Failed to fetch requests');
    }
  },

  getRequest: async (req, reply) => {
    try {
      const request = await requestService.getRequestById(req.params.id);
      if (!request) {
        return reply.status(404).send({ error: 'Request not found' });
      }
      reply.send(request);
    } catch (err) {
      handleError(err, req, reply, 'Failed to fetch request');
    }
  },

  createRequest: async (req, reply) => {
    try {
      const newRequest = await requestService.createRequest(req.body);
      reply.code(201).send(newRequest);
    } catch (err) {
      handleError(err, req, reply, 'Failed to create request');
    }
  },

  updateRequest: async (req, reply) => {
    try {
      const updated = await requestService.updateRequest(req.params.id, req.body);
      if (!updated) {
        return reply.status(404).send({ error: 'Request not found' });
      }
      reply.send(updated);
    } catch (err) {
      handleError(err, req, reply, 'Failed to update request');
    }
  },

  deleteRequest: async (req, reply) => {
    try {
      const deleted = await requestService.deleteRequest(req.params.id);
      if (!deleted) {
        return reply.status(404).send({ error: 'Request not found' });
      }
      reply.send({ message: 'Request deleted successfully' });
    } catch (err) {
      handleError(err, req, reply, 'Failed to delete request');
    }
  }
};