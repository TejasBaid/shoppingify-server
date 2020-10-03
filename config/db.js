const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv').config()

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL , { useUnifiedTopology: true , useNewUrlParser: true , useCreateIndex:true, useFindAndModify:false})
        console.log(`MongoDB connected`.white.bgGreen.bold)
    } catch (error) {
        console.log(error.red)
        // * Exits process with failure
        process.exit(1)
    }
}

module.exports = connectDB