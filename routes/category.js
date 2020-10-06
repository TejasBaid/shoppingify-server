const router = require('express').Router()
const auth = require('../middleware/auth')
const Category = require('../models/Category')
const {createCategory,categoryDuplicateCheck,duplicationError,getCategories,deleteCategory} = require('../controller/Category')
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

/* ----------------------------- View all categories of the user ---------------------------- */
//* @route   GET /api/categories/view
//* @desc    View all categories of the user
//* @access  PRIVATE

router.get('/view',[auth],async(req,res) => {
    const userId = req.user.id
    const response = await getCategories(userId)
    return res.status(response.status).json({msg:response.json})
})

/* ----------------------------- Remove a category ---------------------------- */
//* @route   DELETE /api/categories/delete
//* @desc    Description of the endpoint
//* @access  PUBLIC

router.delete('/delete',[auth,
[check("categoryId","Category id is required").not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg:errors})
    }
    const {categoryId} = req.body
    const response = await deleteCategory(categoryId)
    return res.status(response.status).json({msg:response.json})


})


module.exports = router
