const express=require("express")
const router=express.Router();
const {sendOtp,verifyOtp,signup}=require("../controller/Auth")


router.post("/signup",signup)
router.post("/sendotp",sendOtp);
router.post("/verifyotp",verifyOtp);


module.exports=router;