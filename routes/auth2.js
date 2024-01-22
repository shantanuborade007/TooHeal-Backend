const express=require("express")
const router=express.Router();

const {sendOtp,verifyOtp}=require("../controller/Auth2")


router.post("/sendotp",sendOtp);
router.post("/verifyotp",verifyOtp);


module.exports=router;