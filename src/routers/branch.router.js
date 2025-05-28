import { Router } from "express";
import BranchController from "../controller/branch.controller.js";
import authencate from "../middleware/authMiddleware.js";
import validates from "../middleware/validate.middleware.js";

const branchRouter = Router()
const controller = new BranchController()
branchRouter
    .post("/api/post/branch", authencate(['super_admin', 'admin']), controller.addBranch.bind(controller))
    .put("/api/put/branch/:id", authencate(['super_admin', 'admin']), controller.changeBranch.bind(controller))
    .delete("/api/delete/branch/:id", authencate(['super_admin', 'admin']), controller.deleteBranch.bind(controller))
    .get("/api/get/all/branch", authencate(['super_admin', 'admin']), controller.getBranches.bind(controller))
    .get("/api/get/statistica/branch/:id", authencate(['super_admin', 'admin']), controller.branchStatistica.bind(controller))

export default branchRouter