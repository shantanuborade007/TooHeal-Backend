const User = require("../models/User")
const Transaction=require("../models/Transaction")
const Userprofile=require("../models/UserProfile")

exports.createTransactionAndAppendToUserProfile = async(req,res)=>{

    //this controller will change to a large extent

    try{
        const { phoneNo,
            transactionId,
            transactionType,
            amount,
            description}=req.body

       
        const user = await User.findOne({phoneNumber: phoneNo});
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const userId = user._id;
        console.log("user id :- ",userId);
        const userprofile = await Userprofile.findById(user.additionDetails);
        
        // var userid=userDetails._id;
        // console.log(userDetails);
        const transactionData={transactionId,
            transactionType,
            userId,
            amount,
            description}

        const transaction = await Transaction.create({transactionId,
            transactionType,
            userId,
            amount,
            description})
        console.log("Transaction Created Succesfully !")

        if (!userprofile.transactions) {
            userprofile.transactions = [];
        }
        userprofile.transactions.push(transaction._id);
        await userprofile.save();
        console.log("Transaction appended to UserProfile successfully!");
        
        if(transactionType==="Credit"){
            userprofile.wallet_balance+=amount;
            console.log("current Account ballance of the user is : - ",userprofile.wallet_balance);
        }
        await userprofile.save();


        return res.status(201).json({
            success: true,
            message: "Transaction Successfull !"
        });

    }catch(e){
        console.error(e);
        return res.status(500).json({
            success:false,
            message:"Error Occoured in Tranaction"
        })

    }

}

exports.getWalletBalance= async(req,res)=>{
    try{
        const {phoneNo}=req.body;

        const user=await User.findOne({phoneNumber:phoneNo});
        if(!user){
            return  res.status(404).json({
                success: false,
                message:"User Not found !"
            })
        }
        const userprofile = await Userprofile.findById(user.additionDetails);
        const balance=userprofile.wallet_balance;
        return res.status(200).json({
            success:true,
            balance: balance,
            message:"Success !"
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}


exports.getAllTransactionsByPhoneNo = async (req, res) => {
    try {
        const { phoneNo } = req.body;

        // Find the user by phone number
        const user = await User.findOne({ phoneNumber: phoneNo });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        // Fetch all transactions associated with the user
        const transactions = await Transaction.find({ userId: user._id });

        return res.status(200).json({
            success: true,
            transactions: transactions,
            message: "Transactions fetched successfully!"
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
