import Joi from "joi";

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
    repeat_password: Joi.ref('password'),
    birth_date: Joi.date().required(),
    gender: Joi.string().valid("male", "female", "other").required(),
    role: Joi.string().valid("super_admin", "admin", "user").default("user"),
    branch_id: Joi.number().integer().required()
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});
export default {
    registerSchema,
    loginSchema
}
