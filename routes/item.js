const router = require('express').Router()
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth')
const {addItem} = require('../controller/Item')
const uuid = require('uuid')
const Category = require('../models/Category')

/* ----------------------------- Create a new item ---------------------------- */
//* @route   POST /api/item/create
//* @desc    Create a new item
//* @access  PUBLIC

router.post('/create',[auth,
[
    check('name', 'Name is required').not().isEmpty(),
    check('categoryId', 'Category Id is required').not().isEmpty(),
]],async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg:errors})
    }
    const {name,categoryId} = req.body
    const response = await addItem(name,categoryId)
    console.log(response)
    return res.status(response.status).json({msg:response.json})
})



module.exports = router