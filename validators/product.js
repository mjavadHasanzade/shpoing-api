const Joi = require('joi');

const productValidator = (data) => {

    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0).required(),
        oldPrice: Joi.number().min(0),
        category: Joi.string(),
        properties: Joi.string(),
        quantity: Joi.number(),
    });

    return schema.validate(data);

}

module.exports = productValidator;