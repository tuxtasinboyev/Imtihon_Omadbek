import pool from "../config/database.js";
import CustomError from "../utils/CustomError.js";
import bcrypt from "bcrypt";
import tokenGenerate from "../utils/jwt.js";

class Register_and_Login {
    constructor() { }

    async register(payload) {
        const findUser = await pool.query("SELECT * FROM users WHERE username = $1", [payload.username]);

        if (findUser.rows.length > 0)
            throw new CustomError("User already exists", 403);

        if (payload.password !== payload.repeat_password) {
            throw new CustomError("Password mismatch", 400);
        }

        const hashpassword = await bcrypt.hash(payload.password, 10);

        const result = await pool.query(`INSERT INTO users (username, branch_id, password, birth_date, gender, role)VALUES ($1, $2, $3, $4, $5, $6) RETURNING username, branch_id, birth_date, gender, role`,
            [payload.username, payload.branch_id, hashpassword, payload.birth_date, payload.gender, payload.role || 'user']
        );

        const user = result.rows[0];
        const token = tokenGenerate(user);

        return {
            status: 201,
            success: true,
            data: user,
            token
        };
    }

    async login(payload) {
        
        const findUser = await pool.query("SELECT * FROM users WHERE username = $1", [payload.username]);

        if (findUser.rows.length === 0)
            throw new CustomError("User not found", 404);

        const user = findUser.rows[0];
        const isMatch = await bcrypt.compare(payload.password, user.password);

        if (!isMatch)
            throw new CustomError("Username or password incorrect", 401);

        const { password, ...safeUser } = user;
        const token = tokenGenerate(safeUser);

        return {
            status: 200,
            success: true,
            data: safeUser,
            token
        };
    }
}

export default Register_and_Login;
