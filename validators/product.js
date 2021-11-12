const Joi = require('joi');

const productValidator = (data) => {

    const schema = Joi.object({
        name: Joi.string().required().messages({
            "any.required": data.t('product_name_null')
        }),
        description: Joi.string().required().messages({
            "any.required": data.t('product_description_null')
        }),
        price: Joi.number().min(0).required().messages({
            "any.required": data.t('product_price_null'),
            "number.min": `${data.t('product_price_size')} {#limit} `,
        }),
        oldPrice: Joi.number().min(0).messages({
            "number.min": `${data.t('product_price_size')} {#limit} `,
        }),
        category: Joi.string(),
        properties: Joi.string(),
        quantity: Joi.number(),
    });

    return schema.validate(data.body);

}

module.exports = productValidator;