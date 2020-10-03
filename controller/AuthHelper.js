const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const Signup = async(name,email,password) => {
    try {
        const hash = await bcrypt.hashSync(password, 10);
        let user_duplicate = await User.findOne({email})
        if(user_duplicate){
            let msg = "User Already Exists"
            return {
                status :400,
                json: msg,
            }
        }else{
            const user = new User({
                name,
                email,
                password:hash,
            })
            await user.save()
            const payload = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {expiresIn:360000},
            )
            return {
                status:200,
                json: token
            }
        }
    } catch (err) {
        console.error(err)
        return {
            status:500,
            json:"Server Error"
        }
    }
}

const Login = async(email,password) => {
    try {
        let user = await User.findOne({email});
        if (!user) {
            return{
                status:400,
                json:"Invalid Credentials"
            }
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return{
                status:400,
                json:"Invalid Credentials"
            }
        }

        const payload = {
            user: {
                id: user.id,
            }
        }

        const token = jwt.sign(payload,
            process.env.JWT_SECRET,
            {expiresIn: 360000},
        )
        return {
            status: 200,
            json: token
        }
    } catch (err) {
        console.error(err)
        return {
            status:500,
            json:"Server Error"
        }
    }
}

module.exports = {
    Signup,
    Login,
}