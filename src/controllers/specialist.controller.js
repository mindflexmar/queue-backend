const prisma = require('../config/prisma');
const SpecialistService = require('../services/specialist.service');

const specialistService = new SpecialistService(prisma);

module.exports = {
  getAllSpecialists: async (request, reply) => {
    try {
      const specialists = await specialistService.getAllSpecialists();
      reply.send(specialists);
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch specialists' });
    }
  },

  getSpecialist: async (request, reply) => {
    try {
      const specialist = await specialistService.getSpecialistById(request.params.id);
      if (!specialist) return reply.status(404).send({ error: 'Specialist not found' });
      reply.send(specialist);
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch specialist' });
    }
  },

  createSpecialist: async (request, reply) => {
    try {
      const newSpecialist = await specialistService.createSpecialist(request.body);
      reply.code(201).send(newSpecialist);
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ error: 'Failed to create specialist' });
    }
  },

  updateSpecialist: async (request, reply) => {
    try {
      const updated = await specialistService.updateSpecialist(request.params.id, request.body);
      reply.send(updated);
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ error: 'Failed to update specialist' });
    }
  },

  deleteSpecialist: async (request, reply) => {
    try {
      await specialistService.deleteSpecialist(request.params.id);
      reply.send({ message: 'Specialist deleted successfully' });
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ error: 'Failed to delete specialist' });
    }
  }
};