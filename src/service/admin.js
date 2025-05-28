import pool from "../config/database.js";
import CustomError from "../utils/CustomError.js";
import bcrypt from "bcrypt"
class AdminService {
    constructor() { }
    async addAdmin(payload) {
        const findAdmin = await pool.query("select * from users where username=$1", [payload.username])
        if (findAdmin.rows.length > 0) throw new CustomError("admin already exist", 403)

        const hashpassword = await bcrypt.hash(payload.password, 10)
        if (payload.role !== 'admin' && payload.role !== 'super_admin') {
            throw new CustomError("role must be 'admin' or 'super_admin'", 400)
        }

        const result = await pool.query("insert into users(username,password,birth_date,gender,role,branch_id) values($1,$2,$3,$4,$5,$6) returning username,birth_date,gender,role,branch_id", [payload.username, hashpassword, payload.birth_date, payload.gender, payload.role, payload.branch_id])

        return {
            status: 201,
            success: true,
            data: result.rows[0]
        }
    }
    async adminsRole() {
        const result = await pool.query("select id, username, birth_date, gender, role, branch_id from users where role=$1", ['admin'])
        return {
            status: 200,
            success: true,
            data: result.rows
        }
    }
    async adminsUsername(username) {
        const result = await pool.query("select id, username, birth_date, gender, role, branch_id from users where username=$1", [username])
        return {
            status: 200,
            success: true,
            data: result.rows[0] || null
        }
    }
    async adminInfo(username) {
        const result = await pool.query(`
        SELECT 
            u.id, u.username, u.birth_date, u.role,
            t.model, t.color, t.img, t.price, t.created_at,
            b.name AS branch_name, b.location AS branch_location
        FROM users AS u
        LEFT JOIN branches AS b ON u.branch_id = b.id
        LEFT JOIN transports AS t ON t.branch_id = b.id
        WHERE u.username = $1
    `, [username])
        return {
            status: 200,
            success: true,
            data: result.rows
        }
    }
    async deleteAdmin(adminId) {
        const checkAdmin = await pool.query("select * from users where id=$1 and role in ('admin', 'super_admin')", [adminId]);
        if (checkAdmin.rows.length === 0) {
            throw new CustomError("Admin not found", 404);
        }

        const deletePermission = await pool.query("delete from admin_permissions where user_id=$1", [adminId]);
        const deleteAdmin = await pool.query("delete from users where id=$1", [adminId]);

        if (deleteAdmin.rowCount === 0) {
            throw new CustomError("Admin already deleted or not found", 404);
        }

        return {
            status: 200,
            success: true,
            message: "successfuly deleted"
        }
    }
}
export default AdminService