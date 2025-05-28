import UserService from "../service/user.js";

class UserController {
    constructor() {
        this.service = new UserService()
    }
    async addUser(req, res, next) {
        try {

            const result = await this.service.addUser(req.body, req.user.id)
            res.status(201).json(result)
        } catch (error) {
            console.log(error.message);

            next(error)
        }
    }
    async stafInfo(req, res, next) {
        try {
            const result = await this.service.stafInfo(req.params.id, req.user.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }

    }
    async deleteUser(req, res, next) {
        try {
            const id = parseInt(req.params.id)
            const result = await this.service.deleteUser(id, req.user.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }


    }

    async changeUser(req, res, next) {
        try {
            const result = await this.service.changeUser(req.body, req.params.id, req.user.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }

    }


}
export default UserController