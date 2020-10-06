const Category = require("../models/Category");
const uuid = require('uuid')

/* ----------------------------- Check for duplicates while adding ---------------------------- */

const isDuplicateCheck = async (categoryId,name) => {
    try {
        const duplicate = await Category.findOne({_id:categoryId})
        const items = duplicate.items
        const duplicateItem = items.find(item => item.name === name)
        return !!duplicateItem;
    } catch (err) {
        console.error(err)
    }
}

/* ----------------------------- Add an item to a category ---------------------------- */

const addItem = async (name,categoryId) => {
    try {
        const isDuplicate = await isDuplicateCheck(categoryId,name)
        if(!isDuplicate) {
            const newItem = {
                name,
                _id:uuid.v4()
            }
            const category = await Category.findOne({_id:categoryId})
            if (category) {
                category.items.push(newItem)
                await category.save()
                return {
                    status: 200,
                    json: category
                }
            } else {
                return {
                    status: 400,
                    json: "Category does not exist"
                }
            }
        }else{
            return {
                status:400,
                json:"Item already exists in category"
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

/* ----------------------------- Check if item exists for deletion ---------------------------- */

const exists = async (categoryId,itemId) => {
    try {
        const duplicate = await Category.findOne({_id:categoryId})
        const items = duplicate.items
        const duplicateItem = items.find(item => item._id === itemId)
        return !!duplicateItem;
    } catch (err) {
        console.error(err)
    }
}

/* ----------------------------- Delete an item from a category ---------------------------- */

const deleteItem = async (categoryId,itemId) => {
    try {
        const doesExist = await exists(categoryId,itemId)
        if(doesExist){
            const deletion = await Category.findByIdAndUpdate(categoryId,{$pull:{items:{_id:itemId}}})
            return {
                status:200,
                json:"Item deleted successfully"
            }
        }else{
            return {
                status:400,
                json:"Item does not exist in category"
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




module.exports = {
    addItem,
    deleteItem
}

