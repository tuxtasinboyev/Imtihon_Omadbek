import AdminService from "../service/admin.js";

class AdminController {
    constructor() {
        this.service = new AdminService()
    }
    async addAdmin(req, res, next) {
        try {
            const result = await this.service.addAdmin(req.body)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    async adminsRole(req, res, next) {
        try {
            const result = await this.service.adminsRole()
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async adminsUsername(req, res, next) {
       try {
            const result = await this.service.adminsUsername(req.body.username)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async adminInfo(req, res, next) {
         try {
            const result = await this.service.adminInfo(req.body.username)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async deleteAdmin(req, res, next) {
        try {
            const result = await this.service.deleteAdmin(req.params.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
} 
export default AdminController