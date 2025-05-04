const specializationController = require('../controllers/specialization.controller');

module.exports = async (fastify) => {
  fastify.get('/', specializationController.getAllSpecializations);
  fastify.get('/:code', specializationController.getSpecialization);
  fastify.post('/', specializationController.createSpecialization);
  fastify.put('/:code', specializationController.updateSpecialization);
  fastify.delete('/:code', specializationController.deleteSpecialization);
};