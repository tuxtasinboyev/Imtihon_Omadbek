import pool from "../config/database.js"
import CustomError from "../utils/CustomError.js"

class BranchService {
    constructor() { }
    async addBranch(payload, user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const findPermissionUser = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (findPermissionUser.rows.length === 0 || findPermissionUser.rows[0].can_create !== true || findPermissionUser.rows[0].can_control_branch !== true) throw new CustomError("no allowed create permission", 401)

        const result = await pool.query("insert into branches(name,location) values($1,$2)", [payload.name, payload.location])

        return {
            status: 201,
            success: true,
            data: result.rows[0]
        }
    }
    async changeBranch(payload, branch_id, user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const findPermissionUser = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (findPermissionUser.rows.length === 0 || findPermissionUser.rows[0].can_update !== true || findPermissionUser.rows[0].can_control_branch !== true) throw new CustomError("no allowed update permission", 401)

        const findBranch = await pool.query("SELECT * FROM branches WHERE id=$1", [branch_id])
        if (findBranch.rows.length === 0) {
            throw new CustomError("branch not found", 404)
        }

        const result = await pool.query("update branches set name=$1,location=$2 where id=$3 returning * ", [payload.name, payload.location, branch_id])
        if (result.rowCount === 0) throw new CustomError("already deleted", 404)

        return {
            status: 200,
            success: true,
            data: result.rows[0]
        }
    }
    async deleteBranch(branch_id, user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const findPermissionUser = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (findPermissionUser.rows.length === 0 || findPermissionUser.rows[0].can_delete !== true || findPermissionUser.rows[0].can_control_branch !== true) throw new CustomError("no allowed delete permission", 401)

        const findBranch = await pool.query("SELECT * FROM branches WHERE id=$1", [branch_id])
        if (findBranch.rows.length === 0) {
            throw new CustomError("branch not found", 404)
        }
        const deleteTransport = await pool.query("delete from transports where branch_id=$1", [branch_id])

        const deleteUser = await pool.query("delete from users where branch_id=$1", [branch_id])

        const result = await pool.query("delete from branches where id=$1", [branch_id])
        if (result.rowCount === 0) throw new CustomError("already deleted", 404)

        return {
            status: 200,
            success: true,
            message: "succesfully deleted"
        }
    }
    async getBranches(user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const findPermissionUser = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (findPermissionUser.rows.length === 0 || findPermissionUser.rows[0].can_read !== true || findPermissionUser.rows[0].can_control_branch !== true) throw new CustomError("no allowed read permission", 401)

        const result = await pool.query("select * from branches")

        return {
            status: 200,
            success: true,
            data: result.rows
        }

    }
    async branchStatistica(branch_id, user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const findPermissionUser = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (findPermissionUser.rows.length === 0 || findPermissionUser.rows[0].can_read !== true || findPermissionUser.rows[0].can_control_branch !== true) throw new CustomError("no allowed read permission", 401)

        const result = await pool.query("SELECT b.id as branch_id, b.name as branch_name, u.id as user_id,u.username,u.birth_date,u.gender,u.role,t.id as transport_id,t.model,t.color,t.price,t.img FROM branches b LEFT JOIN users u ON u.branch_id = b.id LEFT JOIN transports t ON t.branch_id = b.id WHERE b.id = $1",[branch_id])

        return {
            status: 200,
            success: true,
            data: result.rows
        }
    }
}
export default BranchService