const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerHandler = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const user = new User({
            name, email
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
        user.save()
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.TOKEN, { 'expiresIn': '2h' })

        res.status(200).send({ access_token: token, msg: 'User successfully created!' })
    } catch (err) {
        console.log(err)
    }
}


exports.loginHandler = async (req, res) => {
    const { email, password } = req.body


    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).send({ message: 'User not found !' })
        }

        const hasValidPassword = await bcrypt.compare(password, user.password)

        if (!hasValidPassword) {
            res.status(404).send({ message: 'Invalid Password !' })
        }
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.TOKEN, { 'expiresIn': '2hr' })

        res.status(200).send({ access_token: token, 'message': 'You have successfullly logged !' })



    } catch (e) {
        console.log(e)
    }

}

exports.loggedHandler = (req, res) => {
    res.send(req.user).status(200)

}