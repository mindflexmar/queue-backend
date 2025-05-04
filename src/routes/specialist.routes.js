const specialistController = require('../controllers/specialist.controller');

async function specialistRoutes(fastify, options) {
  fastify.get('/', specialistController.getAllSpecialists);
  fastify.get('/:id', specialistController.getSpecialist);
  fastify.post('/', specialistController.createSpecialist);
  fastify.put('/:id', specialistController.updateSpecialist);
  fastify.delete('/:id', specialistController.deleteSpecialist);
}

module.exports = specialistRoutes;
