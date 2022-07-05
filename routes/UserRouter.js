const router = require('express').Router()
const verifyToken = require('../middleware/auth')
const { registerHandler, loginHandler, loggedHandler } = require('../controller/UserController')
router.post('/register', registerHandler)
router.post('/login', loginHandler)
router.get('/me', verifyToken, loggedHandler)


module.exports = router