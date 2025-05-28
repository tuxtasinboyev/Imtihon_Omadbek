import BranchService from "../service/branch.js";

class BranchController {
    constructor() {
        this.service = new BranchService()
    }
    async addBranch(req, res, next) {
        try {
            const result = await this.service.addBranch(req.body, req.user.id)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    async changeBranch(req, res, next) {
        try {
            const result = await this.service.changeBranch(req.body, req.params.id, req.user.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async deleteBranch(req, res, next) {
        try {
            const result = await this.service.deleteBranch(req.params.id, req.user.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async getBranches(req, res, next) {
        try {
            const result = await this.service.getBranches(req.user.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }

    }
    async branchStatistica(req, res, next) {
        try {
            const result = await this.service.branchStatistica(req.params.id, req.user.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}
export default BranchController