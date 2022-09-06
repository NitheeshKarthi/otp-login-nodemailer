const express=require("express")
const routerr = express()
const db=require("../connection")
//verification of otp
routerr.post("/loginverify",(req,res)=>{
    const verify=req.body
    let readotp=`select * from login where email='${verify.email}' and otp='${verify.otp}'`
    db.query(readotp,async(err,result)=>{
        if(!err){
            let read=await(db.query(readotp))
            res.send().status(200)
            if(read.rowCount==0){
                console.log("invalid otp")
            }else
            {
                console.log("otp verified")
            }
        }else{
            console.log("otp verification failed",err)
            res.send().status(400)
        }
    })
 })
 module.exports=routerr