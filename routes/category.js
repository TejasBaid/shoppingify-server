const router = require('express').Router()
const auth = require('../middleware/auth')
const Category = require('../models/Category')
const {createCategory,categoryDuplicateCheck,duplicationError} = require('../controller/Category')
const {check, validationResult} = require('express-validator')

/* ----------------------------- Create a new category ---------------------------- */
//* @route   POST /api/category/create
//* @desc    Create a new category
//* @access  PRIVATE

router.post(('/create'),[auth,[
    check('name', 'A category name is required').not().isEmpty(),
]], async (req,res) => {
    const {name} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg:errors})
    }
    const userId = req.user.id
    var response ;
    const isDuplicate = await categoryDuplicateCheck(name,userId)
    if(!isDuplicate){
        response = await createCategory(name,userId)
        return res.status(response.status).json({msg:response.json})
    }
    response = duplicationError()
    return res.status(response.status).json({msg:response.json})
})

module.exports = router
