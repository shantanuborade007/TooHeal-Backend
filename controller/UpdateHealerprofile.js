const User=require("../models/User");
const HealerProfile=require("../models/HealerProfile")
const Userprofile=require("../models/UserProfile")
const cloudinary = require('cloudinary').v2;



function isSupported(type,supportedType) {
    return supportedType.includes(type)
  }



  async function uploadTocloudinary(file,folder,quality){

    const options={folder};
    console.log('log2')
    if(quality){
        options.quality=quality;
    }
    options.resource_type = "auto";
    console.log('log3')  
    return await cloudinary.uploader.upload(file.tempFilePath,options);
  }

exports.updateHealerProfile = async(req,res)=>{


    try{
        const {phoneNo,description,domain,rate}=req.body;
        const file = req.files.imageFile; // Corrected line



        const Profile = await User.findOne({phoneNumber: phoneNo}); // find the user by his number
        if(!Profile){
            res.status(404).json({
                success:false,
                message:"User Not found"
            })
        }
        const id = Profile.additionDetails;

        const healerprofile=await HealerProfile.findById(id);// get the profile of this user from database
        if(!healerprofile){
            res.status(404).json({
                success:false,
                message:"HealerProfile Not found"
            })
        }
        const supportedType=["png","jpeg","jpg"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:"File format is not supported"
            })
        }

        const response = await uploadTocloudinary(file, "Tooheal"); 

        healerprofile.image = response.secure_url;
        healerprofile.description = description;
        healerprofile.domain = domain;
        healerprofile.rate = rate;
        await healerprofile.save();

        res.status(201).json({
            success: true,
            data: healerprofile,
          });



    }catch(e){

        console.log(e)
        res.status(500).json({
            success:false,
            message:'server error'
        })
    }


}



exports.getHealerDetails = async (req, res) => {
    try {
        const healerDetails = await User.aggregate([
            { $match: { role: 'healer' } }, // Filter users with role 'healer'
            {
                $lookup: {
                    from: 'healerprofiles', // The name of the HealerProfile collection
                    localField: 'additionDetails', // Field in the User collection
                    foreignField: '_id', // Field in the HealerProfile collection
                    as: 'healerProfile' // Output array field
                }
            },
            { $unwind: '$healerProfile' }, // Deconstruct healerProfile array field from the input documents
            {
                $project: { // Select fields to include in the output documents
                    phoneNumber: 1,
                    name: 1,
                    image: '$healerProfile.image',
                    description: '$healerProfile.description',
                    domain: '$healerProfile.domain',
                    rate: '$healerProfile.rate',
                    callid:'$healerProfile.callid',
                    _id: 0 // Exclude the _id field
                }
            }
        ]);

        res.json({
            success: true,
            data: healerDetails
        });
    } catch (error) {
        console.error('Error fetching healer details:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};



exports.getUserDetailsByPhoneNumber = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        console.log("Searching for user with phoneNumber:", phoneNumber);

        // First, find the user by phoneNumber
        const user = await User.findOne({ phoneNumber: phoneNumber }).lean();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // If the user has additionDetails, fetch the corresponding userProfile
        if (user.additionDetails) {
            const userProfile = await Userprofile.findById(user.additionDetails).lean();
            if (userProfile) {
                // Combine user and userProfile information
                const userDetails = {
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    age: user.age, // Assuming these fields exist in your User model
                    gender: user.gender,
                    active: user.active,
                    role: user.role,
                    image: userProfile.image,
                    wallet_balance: userProfile.wallet_balance,
                    // transactions: userProfile.transactions,
                };

                return res.json({
                    success: true,
                    data: userDetails
                });
            }
        }

        // If no userProfile found, just return the user info without userProfile details
        return res.json({
            success: true,
            data: user
        });

    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

