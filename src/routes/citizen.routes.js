const citizenController = require('../controllers/citizen.controller');

module.exports = async (fastify) => {
  fastify.get('/', citizenController.getAllCitizens);
  fastify.get('/:id', citizenController.getCitizen);
  fastify.post('/', citizenController.createCitizen);
  fastify.put('/:id', citizenController.updateCitizen);
  fastify.delete('/:id', citizenController.deleteCitizen);
};