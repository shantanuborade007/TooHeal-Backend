const db=require("./config/database");
const express=require("express")
const cookieParser=require("cookie-parser");
const user=require("./routes/auth")
require("dotenv").config();



const app=express();

const PORT=4000;

app.use(express.json());

app.use(cookieParser());

db.connect();

app.use("/api/v1",user)

app.listen(PORT,()=>{
    console.log(`App is listening at port ${PORT}`)
})