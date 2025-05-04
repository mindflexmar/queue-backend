const { PrismaClient } = require('@prisma/client');
const CitizenService = require('../services/citizen.service');

const prisma = new PrismaClient();
const citizenService = new CitizenService(prisma);

exports.getAllCitizens = async (request, reply) => {
  try {
    const citizens = await citizenService.getAllCitizens();
    reply.send(citizens);
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Failed to fetch citizens' });
  }
};

exports.getCitizen = async (request, reply) => {
  try {
    const citizen = await citizenService.getCitizenById(request.params.id);
    if (!citizen) return reply.status(404).send({ error: 'Citizen not found' });
    reply.send(citizen);
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Failed to fetch citizen' });
  }
};

exports.createCitizen = async (request, reply) => {
  try {
    const newCitizen = await citizenService.createCitizen(request.body);
    reply.code(201).send(newCitizen);
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Failed to create citizen' });
  }
};

exports.updateCitizen = async (request, reply) => {
  try {
    const updated = await citizenService.updateCitizen(request.params.id, request.body);
    reply.send(updated);
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Failed to update citizen' });
  }
};

exports.deleteCitizen = async (request, reply) => {
  try {
    await citizenService.deleteCitizen(request.params.id);
    reply.send({ message: 'Citizen deleted successfully' });
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Failed to delete citizen' });
  }
};
