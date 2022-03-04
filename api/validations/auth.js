import Joi from "joi";

const registerSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    name: Joi.string().required().trim(),
});

export { registerSchema };
