import Joi from "joi";

const profileSchema = Joi.object({
    profile: {
        status: Joi.string().max(10),
        desired_job: Joi.string(),
        links: {
            title: Joi.string().valid("github", "facebook", "instagram", "velog"),
            url: Joi.string().uri(),
        },
    },
    user: {
        name: Joi.string(),
        college: Joi.string(),
        major: Joi.string(),
    },
});

export { profileSchema };
