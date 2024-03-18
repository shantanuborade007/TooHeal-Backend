const express = require("express")
const router= express.Router()

const {updateHealerProfile,getHealerDetails,getUserDetailsByPhoneNumber}= require("../controller/UpdateHealerprofile")
router.put("/updatehealerprofile", updateHealerProfile)
router.get("/getallhealers",getHealerDetails)
router.get("/getUserDetails",getUserDetailsByPhoneNumber)


module.exports=router;
