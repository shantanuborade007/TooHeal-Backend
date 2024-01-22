const mongoose = require("mongoose");
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// take the client form process.env

const OTPSchema = new mongoose.Schema({
	phoneNumber: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});



// Define a function to send emails
async function sendVerificationSMS(phoneNumber, otp) {
    console.log("phone Number ",phoneNumber);
    console.log("OTP",otp);
   try {
        
       const message = await client.messages.create({
           body: `Your OTP is ${otp}`,
           from: '+17244264147', // Your Twilio phone number take it from process.env
           to: phoneNumber
       });
       console.log("SMS sent successfully: ", message.sid);
   } catch (error) {
       console.log("Error occurred while sending SMS: ", error);
       throw error;
   }
}
 

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
    console.log("New document saved to database");
    console.log(this.phoneNumber);
 
    if (this.isNew) {
        await sendVerificationSMS(this.phoneNumber, this.otp);
    }
    next();
 });
 

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;