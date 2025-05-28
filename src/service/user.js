import bcrypt from "bcrypt"
import pool from "../config/database.js"
import CustomError from "../utils/CustomError.js"
class UserService {
    constructor() { }
    async addUser(payload, user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const findPermissionUser = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (findPermissionUser.rows[0]?.can_create !== true) throw new CustomError("no allowed create permission", 401)

        if (payload.repeat_password !== payload.password) throw new CustomError("password isn't match", 401)
        const hashpassword = await bcrypt.hash(payload.password, 10)
        const result = await pool.query("insert into users(username,password,birth_date,gender,role,branch_id) values($1,$2,$3,$4,$5,$6) returning username,birth_date,gender,role,branch_id ", [payload.username, hashpassword, payload.birth_date, payload.gender, payload.role, payload.branch_id])

        return {
            status: 201,
            success: true,
            data: result.rows[0]
        }
    }
    async stafInfo(userId, user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const findPermissionUser = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (findPermissionUser.rows[0]?.can_read !== true) throw new CustomError("no allowed read permission", 401)

        const result = await pool.query(`
        SELECT 
            u.id, u.username, u.birth_date, u.role,
            t.model, t.color, t.img, t.price, t.created_at,
            b.name AS branch_name, b.location AS branch_location
        FROM users AS u
        LEFT JOIN branches AS b ON u.branch_id = b.id
        LEFT JOIN transports AS t ON t.branch_id = b.id
        WHERE u.id = $1
    `, [userId])

        return {
            status: 200,
            success: true,
            data: result.rows[0]
        }

    }
    async deleteUser(userId, user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const findPermissionUser = await pool.query("select * from admin_permissions where user_id=$1", [user_id])

        const deletePermission = await pool.query("delete from permissions where user_id=$1", [userId])

        const deleteAdminPermission = await pool.query("delete from admin_permissions where user_id=$1", [userId])

        const result = await pool.query("delete from users where id=$1", [userId])
        if (result.rowCount === 0) throw new CustomError("already deleted", 404)

        return {
            status: 200,
            success: true,
            message: "successfuly deleted"
        }

    }

    async changeUser(payload, userId, user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const findPermissionUser = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (findPermissionUser.rows[0]?.can_update !== true) throw new CustomError("no allowed update permission", 401)
        const hashpassword = await bcrypt.hash(payload.password, 10)
        if (payload.repeat_password !== payload.password) throw new CustomError("password isn't match", 401)
        const result = await pool.query("update users set username=$1,password=$2,birth_date=$3,gender=$4,role=$5,branch_id=$6 where id=$7 returning  username,birth_date,gender,role,branch_id", [payload.username, hashpassword, payload.birth_date, payload.gender, payload.role, payload.branch_id, userId])

        return {
            status: 200,
            success: true,
            data: result.rows[0]
        }

    }

}
export default UserService