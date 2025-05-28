import TransportService from "../service/transports.js";

class TransportController {
    constructor() {
        this.service = new TransportService()
    }
    async getTransport(req, res, next) {
        try {
            const branch_id = parseInt(req.params.branch_id)

            const result = await this.service.getTransport(branch_id, req.user.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async getModel(req, res, next) {
        try {
            const result = await this.service.getModel(req.params.model, req.user.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async addTransport(req, res, next) {
        try {
            const result = await this.service.addTransport(req.body, req.user.id, req.files.img)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    async changeTransport(req, res, next) {
        try {
            const result = await this.service.changeTransport(req.body, req.params.id, req.user.id, req.files.img)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }

    }
    async deleteTransport(req, res, next) {
        try {
            const result = await this.service.deleteTransport(req.params.id, req.user.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}
export default TransportController