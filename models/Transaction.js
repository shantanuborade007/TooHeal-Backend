const mongoose = require("mongoose");

// this schema will change to a large extent

const transactionSchema = new mongoose.Schema({
    transactionId:{
        type:String,
        required:true
    },
    transactionType: {
        type: String,
        enum: ['Credit', 'Debit'],
        required: true,
    },
    transactionDate: {
        type: Date,
        default: Date.now,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model("Transaction", transactionSchema);
