const User= require("../models/User")
const UserProfile = require("../models/UserProfile")
const Transaction = require("../models/Transaction");

exports.callingPostProcessing = async(req,res)=>{

    const {phoneNumber,duration,rate}=req.body;

    if(!phoneNumber || !duration){
        return res.status(400).json({msg:"Missing fields"})
    }

    const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

    console.log(user);

    if(!user){
        return res.status(401).json({msg:"User Not Found"});
    }
   
    const userprofile = await UserProfile.findById(user.additionDetails);

    const totalCallCost = duration * rate;

    if(userprofile.wallet_balance < totalCallCost){
        return res.status(400).json({msg:"Insufficient balance in wallet"});
    }

    const transactionId=user._id+Date.now();
    const newTransaction = new Transaction({
        transactionId: transactionId.toString(),
        transactionType: 'Debit',
        userId: user._id,
        amount: totalCallCost,
        description: 'Call cost deduction'
    });
    await newTransaction.save();

    userprofile.transactions.push(newTransaction._id);

    userprofile.wallet_balance -= totalCallCost;
    await userprofile.save();



    res.status(200).json({
        msg: "Call cost deducted successfully",
        remainingBalance: userprofile.wallet_balance
    });

}