const express = require("express")
const router = express.Router()
const {Signup , Login} = require('../controller/AuthHelper')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../../../marketplace_api/config/config')
const User = require('../models/User')
const { check, validationResult } = require("express-validator");

/* ------------------------------ Auth Route ------------------------------ */

//* @route   POST /api/auth/signup
//* @desc    This is the auth page
//* @access  PUBLIC

router.post(
    '/signup',
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password','Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        console.log("Signuppppp")
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors});
        }
        const { name, email, password } = req.body;
        const response = await Signup(name,email,password)

        res.status(response.status).json({msg:response.json})

})

/* ------------------------------- Login route ------------------------------ */

//* @route   POST /api/auth/login
//* @desc    This is the login endpoint
//* @access  PUBLIC


router.post('/login',[
    check("email","Email is required").not().isEmpty(),
    check("password","Password is required").exists()
],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors });
    }
    const { name, email, password } = req.body;
    const response = await Login(email,password)
    res.status(response.status).json({msg:response.json})

})


module.exports = router