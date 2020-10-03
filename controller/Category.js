const Category = require('../models/Category')

const categoryDuplicateCheck = async (name,userId) => {
    try {
        const duplicate = await Category.findOne({name: name, userId: userId})
        if(duplicate){
            return true
        }
        return false

    } catch (err) {
        return false
    }
}

const createCategory = async (name,userId) => {
    try {
        const category = new Category({
            name,
            userId,
        })
        await category.save()
        return {
            status:200,
            json:category
        }
    } catch (err) {
        console.error(err)
        return {
            status:500,
            json:"Server Error"
        }
    }
}
const duplicationError = () => {
    return{
        status:400,
        json:"Category already exists"
    }
}

module.exports = {createCategory, categoryDuplicateCheck,duplicationError}