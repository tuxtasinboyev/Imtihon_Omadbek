import CustomError from "../utils/CustomError.js"

const validates = (schema) => {
    return function (req, res, next) {
        try {
            const { error } = schema.validate(req.body)
            if (error) throw new CustomError(error.details[0].message || "authorization error", 401)
            next()
        } catch (error) {
            
            next(error)
        }
    }
}
export default validates