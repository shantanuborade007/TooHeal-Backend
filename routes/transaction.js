const express=require("express")
const router=express.Router();
const {createTransactionAndAppendToUserProfile,getWalletBalance,getAllTransactionsByPhoneNo}=require("../controller/Transaction");

router.post("/transaction",createTransactionAndAppendToUserProfile);
router.get("/walletbalance",getWalletBalance)
router.get("/getAllTransactionsByPhoneNo",getAllTransactionsByPhoneNo)

module.exports=router;