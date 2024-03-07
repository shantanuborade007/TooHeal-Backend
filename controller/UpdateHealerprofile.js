const User=require("../models/User");
const HealerProfile=require("../models/HealerProfile")
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

