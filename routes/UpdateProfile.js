const express = require("express")
const router= express.Router()

const {updateHealerProfile,getHealerDetails}= require("../controller/UpdateHealerprofile")
router.put("/updatehealerprofile", updateHealerProfile)
router.get("/getallhealers",getHealerDetails)


module.exports=router;
