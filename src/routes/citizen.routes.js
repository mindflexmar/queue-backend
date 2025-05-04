const citizenController = require('../controllers/citizen.controller');

async function citizenRoutes(fastify, options) {
  fastify.get('/', citizenController.getAllCitizens);
  fastify.get('/:id', citizenController.getCitizen);
  fastify.post('/', citizenController.createCitizen);
  fastify.put('/:id', citizenController.updateCitizen);
  fastify.delete('/:id', citizenController.deleteCitizen);
}

module.exports = citizenRoutes;
