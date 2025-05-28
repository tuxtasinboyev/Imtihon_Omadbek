import pool from "../config/database.js";
import CustomError from "../utils/CustomError.js";

class PermissionService {
    constructor() { }
    async addPermission(payload, userId) {
        const findUser = await pool.query(" select * from users where id=$1 ", [userId])
        if (findUser.rows.length === 0) throw new CustomError("user not found", 404)

        const checkadmin = await pool.query("SELECT * FROM admin_permissions WHERE user_id=$1", [userId])
        if (checkadmin.rows.length === 0 || checkadmin.rows[0].can_add_permission !== true) throw new CustomError("No allowed addpermission ", 401)

        const result = await pool.query("insert into permissions(user_id,transport_id,can_create,can_read,can_delete,can_update) values($1,$2,$3,$4,$5,$6) returning *", [payload.user_id, payload.transport_id, payload.can_create, payload.can_read, payload.can_delete, payload.can_update])

        return {
            status: 201,
            success: true,
            data: result.rows[0]
        }
    }
    async deletePermission(userIdToDelete, user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const checkadminPermission = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (checkadminPermission.rows.length === 0 || checkadminPermission.rows[0].can_delete !== true) throw new CustomError("No allowed delete permission", 401)

        const findUser = await pool.query("select * from  permissions where id=$1", [userIdToDelete])
        if (findUser.rows.length === 0) throw new CustomError("user not found", 404)

        const result = await pool.query("delete from permissions where user_id=$1", [userIdToDelete])

        return {
            status: 200,
            success: true,
            message: "successfully deleted"
        }
    }
    async changePermission(payload, userIdToUpdate, user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const checkadminPermission = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (checkadminPermission.rows.length === 0 || checkadminPermission.rows[0].can_update !== true) throw new CustomError("No allowed update  permission", 401)

        const findUser = await pool.query("select * from users where id=$1", [userIdToUpdate])
        if (findUser.rows.length === 0) throw new CustomError("user not found", 404)

        const result = await pool.query("update permissions set transport_id=$1,can_create=$2,can_read=$3,can_delete=$4,can_update=$5 where user_id=$6 returning *", [payload.transport_id, payload.can_create, payload.can_read, payload.can_delete, payload.can_update, userIdToUpdate])
        if (result.rowCount === 0) throw new CustomError("no content", 409)

        return {
            status: 200,
            success: true,
            data: result.rows[0]
        }

    }
    async allPermissions(user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("user not found", 404)

        const permisionUser = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (permisionUser.rows.length === 0) throw new CustomError("user's permission not found", 404)

        if (permisionUser.rows.length === 0 || permisionUser.rows[0].can_read !== true) throw new CustomError("No allowed read permission", 401)

        const result = await pool.query("select * from permissions")
        if (result.rows.length === 0) throw new CustomError("permission table empty")

        return {
            status: 200,
            success: true,
            data: result.rows
        }
    }
    async onePermission(userId, user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("user not found", 404)

        const permisionUser = await pool.query("select * from admin_permissions where user_id=$1", [userId])
        if (permisionUser.rows.length === 0) throw new CustomError("user's permission not found", 404)
            
        if (permisionUser.rows[0]?.can_read !== true) throw new CustomError("No allowed read permission", 401)

        const result = await pool.query("select * from permissions where user_id=$1", [userId])
        if (result.rows.length === 0) throw new CustomError("user's permission not found", 404)
        return {
            status: 200,
            success: true,
            data: result.rows[0]
        }
    }
}
export default PermissionService