const mongoose = require('mongoose')

const users = new mongoose.Schema({
    name:{
        type:String,
    },
    mobile:{
        type:Number,
    },
    requirement:{
        type:String,
    },
    budget:{
        type:Number
    }
})

const usersList = mongoose.model("users",users)

module.exports = usersList;