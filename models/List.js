const mongoose = require('mongoose')

const ListSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    items:Array
})

module.exports = List = mongoose.model('List',ListSchema)