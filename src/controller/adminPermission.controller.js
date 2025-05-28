import AdminPermission from "../service/adminPermission.js";

class AdminPermissionController {
    constructor() {
        this.service = new AdminPermission()
    }
    async addPermission(req, res, next) {
        try {
            const result = await this.service.addAdminPermission(req.body)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    async deleteAdminPermission(req, res, next) {
        try {
            const result = await this.service.deleteAdminPermission(req.params.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async updateAdminPermission(req, res, next) {
        try {
            const id=parseInt(req.params.id)
            
            const result = await this.service.updateAdminPermission(req.body, id)
            res.status(200).json(result)
        } catch (error) {
            console.log(error.message);

            next(error)
        }
    }
    async getAllAdminPermission(req, res, next) {
        try {
            const result = await this.service.getAllAdminPermission()
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}
export default AdminPermissionController