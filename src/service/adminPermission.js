import pool from "../config/database.js";
import CustomError from "../utils/CustomError.js";

class AdminPermission {
    constructor() { }
    async addAdminPermission(payload) {
        const result = await pool.query("insert into admin_permissions(user_id,can_create,can_read,can_delete,can_update,can_add_permission,can_add_admin,can_control_branch) values($1,$2,$3,$4,$5,$6,$7,$8) returning * ", [payload.user_id, payload.can_create, payload.can_read, payload.can_delete, payload.can_update, payload.can_add_permission, payload.can_add_admin, payload.can_control_branch])
        return {
            status: 201,
            success: true,
            data: result.rows[0]
        }
    }
    async deleteAdminPermission(userId) {
        const findUser = await pool.query("select * from users where id=$1", [userId])
        if (findUser.rows.length === 0) throw new CustomError("user not found", 404)

        const result = await pool.query("delete from  admin_permissions where user_id=$1", [userId])

        return {
            status: 200,
            success: true,
            message: "successfully deleted"
        }
    }
    async updateAdminPermission(payload, userId) {
        console.log(typeof userId);
        
        const findUser = await pool.query("select * from users where id=$1", [userId])
        if (findUser.rows.length === 0) throw new CustomError("user not found", 404)

        const result = await pool.query("update admin_permissions set user_id=$1,can_create=$2,can_read=$3,can_delete=$4,can_update=$5,can_add_permission=$6,can_add_admin=$7,can_control_branch=$8 where user_id=$9 returning * ", [payload.user_id, payload.can_create, payload.can_read, payload.can_delete, payload.can_update, payload.can_add_permission, payload.can_add_admin, payload.can_control_branch,userId])

        return {
            status: 200,
            success: true,
            data:result.rows[0]
        }
    }
    async getAllAdminPermission() {
        const result = await pool.query("select * from admin_permissions")

        return {
            status: 200,
            success: true,
            data: result.rows
        }
    }
}
export default AdminPermission