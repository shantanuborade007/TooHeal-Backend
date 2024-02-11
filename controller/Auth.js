
const User=require("../models/User")
require("dotenv").config();
const OTP=require("../models/OTP");
const HealerProfile = require("../models/HealerProfile")
const Userprofile = require("../models/UserProfile")


exports.signup = async (req, res) => {
    try {
        const { name, phoneNumber, age, gender, role } = req.body;
 
        // Check if user already exists
        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        if(role==="healer"){
            console.log("the user is HEALER....")
            const profileDetails = await HealerProfile.create({
                image:null,
                description:null,
                rate:null,
                ratingAndReview:null
            });

            const user = new User({ name, phoneNumber, age, gender,additionDetails: profileDetails._id });
            await user.save();

            res.status(200).json({
                success: true,
                data: user
            });
        }
        else{
            console.log("the user is USER....")
            const profileDetails = await Userprofile.create({
                image: null,
                wallet_balance: null,
                transaction: null,
            });
           
            
            console.log(profileDetails._id);
            // Create new user
            const user = new User({ name, phoneNumber, age, gender,additionDetails: profileDetails._id });
            await user.save();
     
            res.status(200).json({
                success: true,
                data: user
            });
        }
        

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
 };

exports.sendOtp = async(req, res) => {
  try {
      const { phoneNumber } = req.body;
      if (!phoneNumber) {
          return res.status(400).json({
              success: false,
              message: "Please enter your phone number"
          });
      }

      const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random OTP
      const otpRecord = new OTP({ phoneNumber, otp});
      await otpRecord.save();

      res.status(200).json({
          success: true,
          message: "OTP sent successfully"
      });
  } catch (err) {
      console.log(err);
      return res.status(500).json({
          success: false,
          message: "Error occurred while sending OTP"
      });
  }
};

exports.verifyOtp = async(req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        if (!phoneNumber || !otp) {
            return res.status(400).json({
                success: false,
                message: "Please enter your phone number and OTP"
            });
        }
 
        // Find the OTP record in the database
        const otpRecord = await OTP.findOne({ phoneNumber, otp });
 
        // If no OTP record found or OTP does not match, return an error
        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }
 
        // Delete the OTP record
        await OTP.deleteOne({ _id: otpRecord._id });
 
        // Check if the user already exists
        const user = await User.findOne({ phoneNumber });
        if (user) {
            // If the user exists, send a welcome message
            return res.status(200).json({
                success: true,
                message: "Welcome back! (will be redirected to Home Screen)"
            });
        } else {
            // If the user does not exist, prompt to enter details
                return res.status(302).json({
                    success: true,
                    message: "Please go to /signup to enter your details"
                });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error occurred while verifying OTP"
        });
    }
 };