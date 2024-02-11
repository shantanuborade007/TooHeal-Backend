const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
       trim: true,
   },
   phoneNumber: {
       type: String,
       required: true,
   },
   age: {
       type: Number,
       required: true,
   },
   gender: {
       type: String,
       enum: ['Male', 'Female'],
       required: true,
   },
   active:{
        type: Boolean,
        default:true,
   },
   role: {
    type: String,
    enum: ['healer', 'user'],
    default: 'user'
   },
   additionDetails:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'roleRef'
   },
   roleRef: {
       type: String,
       required: true,
       enum: ['HealerProfile', 'UserProfile'],
       default: function() {
           // Set the default based on the role
           return this.role === 'healer' ? 'HealerProfile' : 'UserProfile';
       }
   }
});

module.exports = mongoose.model("user", userSchema);