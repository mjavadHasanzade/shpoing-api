const Joi = require('joi');

const userValidator = (data) => {

    const schema = Joi.object({
        username: Joi.string().required().messages({
            "any.required": data.t('user_name_null'),
            "any.empty": data.t('user_name_null')
        }),
        password: Joi.string().required().min(4).messages({
            "any.required": data.t('password_null'),
            "string.min": `${data.t('pass_valid')} {#limit} `
        }),
        email: Joi.string().email().required().messages({
            "any.required": data.t('email_null'),
            "string.email": `${data.t('email_valid')}`,
        }),

    });

    return schema.validate(data.body);

}

module.exports = userValidator;