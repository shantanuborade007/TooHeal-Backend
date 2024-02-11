const express=require("express")
const router=express.Router();

const {callingPostProcessing}=require("../controller/Communication");

router.put("/callpostprocessing",callingPostProcessing);

module.exports=router;