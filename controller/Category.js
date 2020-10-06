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
const getCategories = async (userId) => {
    try {
        const categories = await Category.find({userId:userId})
        return {
            status:200,
            json:categories
        }
    } catch (err) {
        return {
            status:500,
            json:"Server Error"
        }
    }
}

const deleteCategory = async (categoryId) => {
    try {
        const deletedCategory = await Category.deleteOne({_id:categoryId})
        if(deletedCategory.deletedCount === 1){
            return {
                status:200,
                json:"Category deleted"
            }
        }else{
            return {
                status:400,
                json:"Category does not exist"
            }
        }
    } catch (err) {
        return {
            status:500,
            json:"Server Error"
        }
    }
}



module.exports = {
    createCategory,
    categoryDuplicateCheck,
    duplicationError,
    getCategories,
    deleteCategory
}