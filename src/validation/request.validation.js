const { type } = require('joi');
const Joi = require('joi');

const requestSchema = {
  create: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('pending', 'approved', 'rejected').required(),
    
  }),
  
  update: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid('pending', 'approved', 'rejected'),
    
  })
};

module.exports = { requestSchema };
