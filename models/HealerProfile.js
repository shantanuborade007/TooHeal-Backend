const mongoose = require("mongoose")

const HealerProfile = new mongoose.Schema({
    image:{
        type:String
    },
    description:{
        type:String
    },
    rate:{
        type:Number
    },
    ratingAndReview:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    }]

});

module.exports=mongoose.model("HealerProfile",HealerProfile);