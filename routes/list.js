const router = require('express').Router()
const List = require('../models/List')
const {addItem} = require('../controller/List')
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth')

/* ----------------------------- Add an item to the list ---------------------------- */
//* @route   POST /api/list/add
//* @desc    Add a new item to the list
//* @access  PRIVATE

router.post('/add',[auth,
[
    check('name', 'Name is required').not().isEmpty(),
    check('itemId', 'Item ID is required').not().isEmpty(),
]],async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({msg:errors})
    }
    const {name,itemId} = req.body
    const userId = req.user.id
    const response = await addItem(name,userId,itemId)
    return res.status(response.status).json(response.json)

})

/* ----------------------------- View list items ---------------------------- */
//* @route   GET /api/list/view
//* @desc    View all list items
//* @access  PRIVATE

router.get('/view',auth,async (req,res) => {
    try {
        const list = await List.findOne({userId: req.user.id})
        return res.status(200).json({msg:list})
    } catch (err) {
        console.error(err)
        return res.status(500).json({msg:"Server Error"})
    }
})

module.exports = router
