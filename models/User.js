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
   dob: {
       type: Date,
       required: true,
   },
   gender: {
       type: String,
       enum: ['Male', 'Female'],
       required: true,
   }
});

module.exports = mongoose.model("user", userSchema);