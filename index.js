const db=require("./config/database");
const express=require("express")
const cookieParser=require("cookie-parser");
const fileUpload = require('express-fileupload');
const cloudinary=require('./config/cloudinary');
const user=require("./routes/auth")
const communication=require('./routes/communication')
const transaction=require("./routes/transaction")
const user2=require("./routes/auth2")
const healer  = require("./routes/UpdateProfile")
const cors = require('cors');


require("dotenv").config();



const app=express();

const PORT = process.env.PORT || 4000;
app.use(cors());

app.use(express.json());
app.use(cookieParser());

const fileupload=require("express-fileupload");
app.use(fileupload(
    {
        useTempFiles : true,
       tempFileDir : '/tmp/',
       
    }
));


db.connect();
cloudinary.cloudinaryConnect();

app.use("/api/v1",user)
app.use("/api/v1",communication);
app.use("/api/v2",user2);
app.use("/api/v1",transaction)
app.use("/api/v1",healer);







// Simple GET request to check server status
app.get("/status", (req, res) => {
    res.status(200).send("Server is running and accessible.");
});


app.listen(PORT,()=>{
    console.log(`App is listening at port ${PORT}`)
})