import { Router } from "express";
import Register_and_Login_Controller from "../controller/register_login.controller.js";
import validates from "../middleware/validate.middleware.js";
import register_loginValidation from "../validation/register_login.validation.js";

const router = Router()
const register_and_Login_Controller = new Register_and_Login_Controller()
router
    .post("/api/register", validates(register_loginValidation.registerSchema), register_and_Login_Controller.register.bind(register_and_Login_Controller))
    .post("/api/login", validates(register_loginValidation.loginSchema), register_and_Login_Controller.login.bind(register_and_Login_Controller))

export default router