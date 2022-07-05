const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

    const token = req.headers['authorization']
    if (!token) {
        res.status(400).send({ message: 'Authorizaiton token is required' })
    }
    try {
        const bearerToken = token.split(" ")
        const decodeData = jwt.verify(bearerToken[1], process.env.TOKEN)
        req.user = decodeData
    } catch (err) {
        return res.status(401).send({ message: "Invalid Token" });
    }


    next()
}

module.exports = verifyToken