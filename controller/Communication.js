const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const VoiceResponse = twilio.twiml.VoiceResponse;

// exports.PerformCall = async(req, res) => {
//     try {
//         const { phoneNumber } = req.body;
//         if (!phoneNumber) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please enter your phone number"
//             });
//         }
   
//         // Make the call
//         const call = await client.calls.create({
//             url: 'http://demo.twilio.com/docs/voice.xml', // URL of the TwiML instructions
//             to: phoneNumber,
//             from: '+17244264147' // Your Twilio phone number
//         });
        
//         console.log(call);
   
//         res.status(200).json({
//             success: true,
//             message: "OTP sent successfully and call initiated"
//         });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: "Error occurred while sending OTP"
//         });
//     }
//    };



// exports.PerformCall = async(req, res) => {
//     try {
//         const { callerPhoneNumber, receiverPhoneNumber } = req.body;
//         if (!callerPhoneNumber || !receiverPhoneNumber) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please enter both phone numbers"
//             });
//         }
   
//         // Create a TwiML response
//         const response = new VoiceResponse();
//         response.dial(receiverPhoneNumber);
//         response.say('Goodbye');

//         // Convert the TwiML response to a string
//         const twiml = response.toString();

//         // Make the call
//         const call = await client.calls.create({
//             twiml: twiml,
//             to: receiverPhoneNumber,
//             from: callerPhoneNumber
//         });
        
//         console.log(call);
   
//         res.status(200).json({
//             success: true,
//             message: "Call initiated"
//         });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: "Error occurred while initiating call"
//         });
//     }
// };

// const express = require('express');
// const twilio = require('twilio');

// const app = express();

// exports.PerformCall=async(req,res)=> {
//   const phoneNumber = req.body;

//   const twiml = new twilio.twiml.VoiceResponse();
//   const dial = twiml.dial();
//   dial.number(phoneNumber);

//   res.type('text/xml');
//   res.send(twiml.toString());
// };


// exports.PerformCall = async(req, res) => {
//     try {
//         const { callerPhoneNumber, receiverPhoneNumber } = req.body;
//         if (!callerPhoneNumber || !receiverPhoneNumber) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please enter both phone numbers"
//             });
//         }
   
//         // Create a TwiML response
//         const response = new VoiceResponse();
//         const dial = response.dial();
//         dial.conference({
//             startConferenceOnEnter: true,
//             endConferenceOnExit: false
//         }, 'My Conference Room');

//         // Convert the TwiML response to a string
//         const twiml = response.toString();

//         // Make the call
//         const call = await client.calls.create({
//             twiml: twiml,
//             to: receiverPhoneNumber,
//             from: callerPhoneNumber
//         });
        
//         console.log(call);
   
//         res.status(200).json({
//             success: true,
//             message: "Call initiated"
//         });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: "Error occurred while initiating call"
//         });
//     }
// };

// exports.PerformCall = async(req, res) => {
//     try {
//         const { callerPhoneNumber, receiverPhoneNumber } = req.body;
//         if (!callerPhoneNumber || !receiverPhoneNumber) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please enter both phone numbers"
//             });
//         }
   
//         // Create a conference participant
//         const participant = await client.conferences('ACc118c83a640363b7f71dc07e418d42fb')
//             .participants
//             .create({
//                 label: 'customer',
//                 earlyMedia: true,
//                 beep: 'onEnter',
//                 statusCallback: 'https://myapp.com/events',
//                 statusCallbackEvent: ['ringing'],
//                 record: true,
//                 from: callerPhoneNumber,
//                 to: receiverPhoneNumber
//             });

//         console.log(participant.callSid);
   
//         res.status(200).json({
//             success: true,
//             message: "Participant added to conference"
//         });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: "Error occurred while adding participant to conference"
//         });
//     }
// };

// exports.PerformCall = async(req, res) => {
//     try {
//         const { callerPhoneNumber, receiverPhoneNumber } = req.body;
//         if (!callerPhoneNumber || !receiverPhoneNumber) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please enter both phone numbers"
//             });
//         }
   
//         // Create a TwiML response for the caller
//         const responseCaller = new VoiceResponse();
//         const dialCaller = responseCaller.dial();
//         dialCaller.conference({
//             startConferenceOnEnter: true,
//             endConferenceOnExit: false
//         }, 'My Conference Room');

//         // Convert the TwiML response to a string
//         const twimlCaller = responseCaller.toString();

//         // Make the call to the caller
//         const callCaller = await client.calls.create({
//             twiml: twimlCaller,
//             to: callerPhoneNumber,
//             from: process.env.TWILIO_PHONE_NUMBER
//         });

//         // Create a TwiML response for the receiver
//         const responseReceiver = new VoiceResponse();
//         const dialReceiver = responseReceiver.dial();
//         dialReceiver.conference({
//             startConferenceOnEnter: true,
//             endConferenceOnExit: false
//         }, 'My Conference Room');

//         // Convert the TwiML response to a string
//         const twimlReceiver = responseReceiver.toString();

//         // Make the call to the receiver
//         const callReceiver = await client.calls.create({
//             twiml: twimlReceiver,
//             to: receiverPhoneNumber,
//             from: process.env.TWILIO_PHONE_NUMBER
//         });

//         console.log(callCaller, callReceiver);
   
//         res.status(200).json({
//             success: true,
//             message: "Call initiated"
//         });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: "Error occurred while initiating call"
//         });
//     }
// };


exports.PerformCall = async(req, res) => {
    try {
        const { callerPhoneNumber, receiverPhoneNumber } = req.body;
        if (!callerPhoneNumber || !receiverPhoneNumber) {
            return res.status(400).json({
                success: false,
                message: "Please enter both phone numbers"
            });
        }
   
        // Create a new conference
        const conference = await client.conferences.create({
            friendlyName: 'My conference'
        });

        // Add caller to the conference
        const participantCaller = await client.conferences(conference.sid)
            .participants
            .create({
                from: callerPhoneNumber,
                to: receiverPhoneNumber
            });

        console.log(`Caller added to conference ${conference.sid}`);

        // Add receiver to the conference
        const participantReceiver = await client.conferences(conference.sid)
            .participants
            .create({
                from: receiverPhoneNumber,
                to: callerPhoneNumber
            });

        console.log(`Receiver added to conference ${conference.sid}`);
   
        res.status(200).json({
            success: true,
            message: "Participants added to conference",
            conferenceSid: conference.sid
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error occurred while adding participant to conference"
        });
    }
}

