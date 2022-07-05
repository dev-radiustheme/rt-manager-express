const express = require('express')
const app = express()
const dotEnv = require('dotenv').config()
const UserRouter = require('./routes/UserRouter')
const mogodb = require('./config/connect')
app.use(express.json())

app.use('/user', UserRouter)

app.get('/', (req, res) => {
    res.send('Welcome to RTManager')
})

const PORT = process.env.PORT || 3100

app.listen(PORT, (req, res) => {
    console.log(`Server running at ${PORT}`)
})
