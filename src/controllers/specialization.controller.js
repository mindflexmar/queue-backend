const { PrismaClient } = require('@prisma/client');
const SpecializationService = require('../services/specialization.service');

const prisma = new PrismaClient();
const specializationService = new SpecializationService(prisma);

exports.getAllSpecializations = async (request, reply) => {
  try {
    const specializations = await specializationService.getAllSpecializations();
    reply.send(specializations);
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Failed to fetch specializations' });
  }
};

exports.getSpecialization = async (request, reply) => {
  try {
    const specialization = await specializationService.getSpecializationByCode(request.params.code);
    if (!specialization) return reply.status(404).send({ error: 'Specialization not found' });
    reply.send(specialization);
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Failed to fetch specialization' });
  }
};

exports.createSpecialization = async (request, reply) => {
  try {
    const newSpecialization = await specializationService.createSpecialization(request.body);
    reply.code(201).send(newSpecialization);
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Failed to create specialization' });
  }
};

exports.updateSpecialization = async (request, reply) => {
  try {
    const updated = await specializationService.updateSpecialization(request.params.code, request.body);
    reply.send(updated);
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Failed to update specialization' });
  }
};

exports.deleteSpecialization = async (request, reply) => {
  try {
    await specializationService.deleteSpecialization(request.params.code);
    reply.send({ message: 'Specialization deleted successfully' });
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Failed to delete specialization' });
  }
};
