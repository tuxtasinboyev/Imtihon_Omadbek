import Register_and_Login from "../service/Register_and_Login.js";

class Register_and_Login_Controller {
    constructor() {
        this.service = new Register_and_Login()
    }

    async register(req, res, next) {
        try {
            const result = await this.service.register(req.body)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const result = await this.service.login(req.body)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
}

export default Register_and_Login_Controller;
