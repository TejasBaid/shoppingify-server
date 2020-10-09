const List = require('../models/List')



/* ----------------------------- Create a new list ---------------------------- */
const createList = async(userId) => {
    try {
        const list = new List({
            items:[],
            userId:userId
        })
        await list.save()
    } catch (err) {
        console.error(err)
    }
}

/* ----------------------------- Add an item to a list ---------------------------- */
const addItem = async(name,userId,itemId) => {
    try {
        const list = await List.findOne({userId: userId})
        list.items.push({
            _id: itemId,
            name: name,
            quantity:1,
        })
        await list.save()
        return {
            status: 200,
            json: list
        }
    } catch (err) {
        console.error(err)
        return{
            status:500,
            json:"Server Error"
        }
    }
}

module.exports = {
    createList,
    addItem,
}