const mongoose = require('mongoose')


const CategorySchema = new mongoose.Schema({
    name:String,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    items:{
        type: Array,
        default:[]
    }

})

module.exports = Category = mongoose.model('Category',CategorySchema)