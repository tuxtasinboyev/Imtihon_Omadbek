import Joi from "joi";
const transportSchema = Joi.object({
    model: Joi.string().min(1).max(255).required(),
    color: Joi.string().min(1).max(255).required(),
    price: Joi.number().positive().required(),
    branch_id: Joi.number().integer().required()
});
export default transportSchema
