import { Router } from "express";
import PermissionController from "../controller/permission.controller.js";
import authencate from "../middleware/authMiddleware.js";
import validates from "../middleware/validate.middleware.js";
import permissionSchema from "../validation/permission.validation.js";

const permissionRouters = Router()
const controller = new PermissionController()
permissionRouters
    .post("/api/add/permission", authencate(['super_admin', 'admin']), validates(permissionSchema), controller.addPermission.bind(controller))
    .delete("/api/delete/permision/:id", authencate(['super_admin', 'admin']), controller.deletePermission.bind(controller))
    .put("/api/update/permission/:id", authencate(['super_admin', 'admin']), validates(permissionSchema), controller.changePermission.bind(controller))
    .get("/api/get/all/permission", authencate(['super_admin', 'admin']), controller.allPermissions.bind(controller))
    .get("/api/one/permission/:id", authencate(['super_admin', 'admin']), controller.onePermission.bind(controller))

export default permissionRouters