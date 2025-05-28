import pool from "../config/database.js";
import CustomError from "../utils/CustomError.js";
import path from "path"
class TransportService {
    constructor() { }
    async getTransport(branch_id, user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const findPermissionUser = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (findPermissionUser.rows[0]?.can_read !== true) throw new CustomError("no allowed read permission", 401)

        const findBranchTransport = await pool.query("select * from transports where branch_id=$1", [branch_id])

        return {
            status: 200,
            success: true,
            data: findBranchTransport.rows
        }
    }
    async getModel(model, user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const findPermissionUser = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (findPermissionUser.rows[0]?.can_read !== true) throw new CustomError("no allowed read permission", 401)

        const findBranchTransport = await pool.query("select * from transports where model=$1", [model])

        return {
            status: 200,
            success: true,
            data: findBranchTransport.rows
        }
    }
    async addTransport(payload, user_id, img) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const findPermissionUser = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (findPermissionUser.rows[0]?.can_create !== true) throw new CustomError("no allowed create permission", 401)

        const filename = new Date().getTime() + "-" + Math.round(Math.random() * 1e9) + img.name
        await new Promise((resolve, reject) => {
            img.mv(path.join(process.cwd(), "src", "uploads", filename), (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        const result = await pool.query("insert into transports(model,color,img,price,branch_id) values($1,$2,$3,$4,$5) returning * ", [payload.model, payload.color, filename, payload.price, payload.branch_id])

        return {
            status: 201,
            success: true,
            data: result.rows[0]
        }
    }
    async changeTransport(payload, transport_id, user_id, img) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const findPermissionUser = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (findPermissionUser.rows[0]?.can_update !== true) throw new CustomError("no allowed update permission", 401)

        const findUser = await pool.query("select * from transports where id=$1", [transport_id])
        if (findUser.rows.length === 0) throw new CustomError("user not found", 404)


        const filename = new Date().getTime() + "-" + Math.round(Math.random() * 1e9) + img.name
        await new Promise((res, rej) => {
            img.mv(path.join(process.cwd(), "src", "uploads", filename), (err) => {
                if (err) rej(err);
                else res();
            });
        });
        const result = await pool.query("update transports set model=$1,color=$2,img=$3,price=$4,branch_id=$5 where id=$6 returning * ", [payload.model, payload.color, filename, payload.price, payload.branch_id, transport_id])

        return {
            status: 201,
            success: true,
            data: result.rows[0]
        }

    }
    async deleteTransport(transport_id, user_id) {
        const findAdmin = await pool.query("select * from users where id=$1", [user_id])
        if (findAdmin.rows.length === 0) throw new CustomError("admin not found", 404)

        const findPermissionUser = await pool.query("select * from admin_permissions where user_id=$1", [user_id])
        if (findPermissionUser.rows[0]?.can_delete !== true) throw new CustomError("no allowed delete permission", 401)

        const findTransport = await pool.query("select * from transports where id=$1", [transport_id])
        if (findTransport.rows.length === 0) throw new CustomError("transport not found", 404)

        const deletePermission = await pool.query("delete from permissions where transport_id=$1", [transport_id])

        const result = await pool.query("delete from transports where id=$1", [transport_id])
        if (result.rowCount === 0) throw new CustomError("transport already deleted", 404)

        return {
            status: 200,
            success: true,
            message: "Transport deleted successfully"
        }
    }

}
export default TransportService