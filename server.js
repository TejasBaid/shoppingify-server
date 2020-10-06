const express = require('express')
const db = require('./config/db')
const colors = require('colors')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000

//* Config
cors()
app.use(express.json())
app.listen(PORT, () => console.log(`Shoppingify server running on port ${PORT}`.black.bgBlue.bold))
db()

//* @route   GET /
//* @desc    Home Endpoint
//* @access  PUBLIC
app.get('/', (req,res) => {res.send("This is the shoppingify server")})

//* Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/category',require('./routes/category'))
app.use('/api/item',require('./routes/item'))










