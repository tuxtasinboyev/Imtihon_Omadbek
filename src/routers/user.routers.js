import { Router } from "express";
import UserController from "../controller/user.controller.js";
import authencate from "../middleware/authMiddleware.js";
import validates from "../middleware/validate.middleware.js";
import register_loginValidation from "../validation/register_login.validation.js";

const userRouter = Router()
const controller = new UserController()
userRouter
    .post("/api/post/user", authencate(['super_admin', 'admin']),validates(register_loginValidation.registerSchema), controller.addUser.bind(controller))
    .get("/api/get/all/info/:id",authencate(['super_admin', 'admin']),controller.stafInfo.bind(controller))
    .delete("/api/delete/user/:id",authencate(['super_admin', 'admin']),controller.deleteUser.bind(controller))
    .put("/api/put/user/:id",authencate(['super_admin', 'admin']),validates(register_loginValidation.registerSchema),controller.changeUser.bind(controller))

export default userRouter