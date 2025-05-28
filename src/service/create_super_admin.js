import bcrypt from "bcrypt"
import pool from "../config/database.js"

async function super_adminCreate() {
    try {
        const username = 'Omadbek@gmail.com'
        const password = process.env.PASSWORD

        const hashpassword = await bcrypt.hash(password, 10)
        const role = 'super_admin'
        const gender = 'male'
        const birth_date = '17-09-2008'

        const findAdmin = await pool.query("select * from users where username = $1", [username])
        if (findAdmin.rows.length > 0) {
            console.log("oldin qushilgan")
        }

        const createSuper_admin = await pool.query("insert into users(username,password,gender,birth_date,role) values($1,$2,$3,$4,$5)", [username, hashpassword, gender, birth_date, role])
        if (createSuper_admin.rowCount === 1) {
            console.log("super_admin qushildi");
        }
    } catch (error) {
        console.log(error.message);
        console.error("super_admin yaratishda xatolik")
    }
}
export default super_adminCreate