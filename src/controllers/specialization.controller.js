const prisma = require('../config/prisma');
const SpecializationService = require('../services/specialization.service');

const specializationService = new SpecializationService(prisma);

module.exports = {
  getAllSpecializations: async (request, reply) => {
    try {
      const specializations = await specializationService.getAllSpecializations();
      reply.send(specializations);
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch specializations' });
    }
  },

  getSpecialization: async (request, reply) => {
    try {
      const specialization = await specializationService.getSpecializationByCode(request.params.code);
      if (!specialization) {
        return reply.status(404).send({ error: 'Specialization not found' });
      }
      reply.send(specialization);
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch specialization' });
    }
  },

  createSpecialization: async (request, reply) => {
    try {
      const newSpecialization = await specializationService.createSpecialization(request.body);
      reply.code(201).send(newSpecialization);
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ error: 'Failed to create specialization' });
    }
  },

  updateSpecialization: async (request, reply) => {
    try {
      const updated = await specializationService.updateSpecialization(
        request.params.code,
        request.body
      );
      reply.send(updated);
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ error: 'Failed to update specialization' });
    }
  },

  deleteSpecialization: async (request, reply) => {
    try {
      await specializationService.deleteSpecialization(request.params.code);
      reply.send({ message: 'Specialization deleted successfully' });
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ error: 'Failed to delete specialization' });
    }
  }
};