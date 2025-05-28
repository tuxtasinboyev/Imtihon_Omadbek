import Joi from "joi";
const adminPermissionSchema = Joi.object({
  user_id: Joi.number().required(),
  can_create: Joi.boolean(),
  can_read: Joi.boolean(),
  can_delete: Joi.boolean(),
  can_update: Joi.boolean(),
  can_add_permission: Joi.boolean(),
  can_add_admin: Joi.boolean(),
  can_control_branch: Joi.boolean()
});
export default adminPermissionSchema
