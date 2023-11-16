const { Joi, celebrate } = require('celebrate');
const { urlValidation } = require('./urlValidation');

module.exports.validateCardByData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlValidation),
  }),
});

module.exports.validateCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});
