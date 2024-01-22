const express=require("express")
const router=express.Router();

const {PerformCall}=require("../controller/Communication");

router.post("/call",PerformCall);

module.exports=router;