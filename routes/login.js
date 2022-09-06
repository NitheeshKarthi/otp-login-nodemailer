const express=require("express")
const router = express()
const db=require("../connection")
const otpGenerator = require('otp-generator')
require('dotenv').config();
const nodemailer = require('nodemailer');

//generation of otp when submitting email
router.post("/login",(req,res)=>{
    const otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const login=req.body
    let insert=`insert into login(email,otp)
    values('${login.email}','${otp}')`
    db.query(insert,(err,result)=>{
        if(!err){
            console.log("success")
            let transport = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                 }           
            });
            const mailOptions = {
                from: 'nitheeshkarthi2000@gmail.com', // Sender address
                to: `${login.email}`, // List of recipients
                subject: 'Login OTP', // Subject line
                text: `Hi there! ${otp} is your login otp.`, // Plain text body
              };
            transport.sendMail(mailOptions, function(err, info) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(info);
                }
                });           
            res.send().status(200)
        }else{
            console.log("data insertion failed",err)
            res.status(400)
        }
    })
})


module.exports=router