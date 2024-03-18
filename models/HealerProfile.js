const mongoose = require("mongoose")

const HealerProfile = new mongoose.Schema({
    image:{
        type:String
    },
    description:{
        type:String
    },
    domain:{
        type:String
    },
    rate:{
        type:Number
    },
    ratingAndReview:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    }],
    callid:{
        type:Number
    }

});

module.exports=mongoose.model("HealerProfile",HealerProfile);
