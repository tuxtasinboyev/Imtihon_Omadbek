import PermissionService from "../service/permission.js";

class PermissionController {
    constructor() {
        this.service = new PermissionService()
    }
    async addPermission(req, res, next) {
        try {
            const result = await this.service.addPermission(req.body, req.user.id)
            res.status(201).json(result)
        } catch (error) {
            console.log(error.message);
            
            next(error)
        }
    }
    async deletePermission(req, res, next) {
        try {
            const result = await this.service.deletePermission(req.params.id, req.user.id)
            res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }
    async changePermission(req, res, next) {
        try {
            const result = await this.service.changePermission(req.body, req.params.id, req.user.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }

    }
    async allPermissions(req, res, next) {
        try {
            const result = await this.service.allPermissions(req.user.id)
            res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }
    async onePermission(req, res, next) {
        try {
            const result = await this.service.onePermission(req.user.id,req.user.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

}
export default PermissionController