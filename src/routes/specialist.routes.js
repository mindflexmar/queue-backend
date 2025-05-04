const specialistController = require('../controllers/specialist.controller');

module.exports = async (fastify) => {
  fastify.get('/', specialistController.getAllSpecialists);
  fastify.get('/:id', specialistController.getSpecialist);
  fastify.post('/', specialistController.createSpecialist);
  fastify.put('/:id', specialistController.updateSpecialist);
  fastify.delete('/:id', specialistController.deleteSpecialist);
};