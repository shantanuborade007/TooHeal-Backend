const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


exports.PerformCall = async(req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "Please enter your phone number"
            });
        }
   
        // Make the call
        const call = await client.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml', // URL of the TwiML instructions
            to: phoneNumber,
            from: '+17244264147' // Your Twilio phone number
        });
        
        console.log(call);
   
        res.status(200).json({
            success: true,
            message: "OTP sent successfully and call initiated"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error occurred while sending OTP"
        });
    }
   };
