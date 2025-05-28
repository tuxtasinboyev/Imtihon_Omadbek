import jwt from "jsonwebtoken"
const authencate = (roles = []) => {
    return function (req, res, next) {
        const authheader = req.headers.authorization;

        if (!authheader || !authheader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "token is not defind" })
        }
        const token = authheader.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY)
            req.user = decoded
            if (roles.length > 0 && !roles.includes(req.user.role)) {
                return res.status(406).json({ message: "No permission" })
            }
            next()
        } catch (error) {
            console.log(error.message,"salom")
            return res.status(401).json({ message: error.message || "invalid token" })
        }

    }
}
export default authencate