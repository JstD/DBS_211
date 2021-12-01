const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = function (req, res, next) {
    try {
        const token = req.header('Authorization').split(' ')[1]
        if (!token) {
            return res.status(401).json({ errors: [{ msg: "Authorization Denied, No Token Found" }] })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).json({ errors: [{ msg: "Token is not valid" }] })
    }
}
