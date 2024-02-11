const mongoose = require("mongoose")

const Userprofile = new mongoose.Schema({
    image:{
        type:String,
    },
    wallet_balance:{
        type:Number
    },
    transactions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transaction"
    }]
})

module.exports = mongoose.model("Userprofile", Userprofile);