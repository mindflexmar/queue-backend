const specializationController = require('../controllers/specialization.controller');

async function specializationRoutes(fastify, options) {
  fastify.get('/', specializationController.getAllSpecializations);
  fastify.get('/:code', specializationController.getSpecialization);
  fastify.post('/', specializationController.createSpecialization);
  fastify.put('/:code', specializationController.updateSpecialization);
  fastify.delete('/:code', specializationController.deleteSpecialization);
}

module.exports = specializationRoutes;
