import jwt from "jsonwebtoken"

const tokenGenerate = (payload) => {
    const access = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: "60m" })
    const refresh = jwt.sign(payload, process.env.refresh_SECRET_KEY, { expiresIn: "30d" })
    return {
        access,
        refresh
    }
}

export default tokenGenerate