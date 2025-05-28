import Joi from "joi";
const permissionSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    transport_id: Joi.number().integer().required(),
    can_create: Joi.boolean(),
    can_read: Joi.boolean(),
    can_delete: Joi.boolean(),
    can_update: Joi.boolean()
});
export default permissionSchema
