const express= require("express")
const mongoose=require('mongoose')
const User=require("../models/user")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")
require("dotenv").config()
const router=express.Router()

router.post("/signup",((req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then(result=>{
        if(result.length>=1){
            return res.status(409).json({
                message:"User already present"
            })
        }
        else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                if(err){
                    res.status(500).json({
                        error:err
                    })
                }
                else{
                    const user=new User({
                        _id:new mongoose.Types.ObjectId(),
                        name:req.body.name,
                        email:req.body.email,
                        password:hash
                    })
                    user.save().then(result=>{
                        res.status(200).json({
                            message:"User Created Successfully"
                        })
                    })
                }
                // Store hash in your password DB.
            });
        }
    })
  
   
 
}))
router.post("/login",((req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then(result=>{
        console.log(process.env.JWT_KEY);
        if(result.length<1){
            return res.status(409).json({
                message:"Auth failed"
            })
        }
        else{
            bcrypt.compare(req.body.password,result[0].password, function(err, check) {
                if(err){
                    res.status(500).json({
                        error:err
                    })
                }
                if(check){
                const token=   jwt.sign({
                    id:result[0]._id
                   },
                  process.env.JWT_KEY,{
                    expiresIn:"1d"
                   })
                        res.status(200).json({
                            message:"Login Successfull",
                            token:token
                        })
               
                }
                // Store hash in your password DB.
            });
        }
    })
  
   
 
}))
router.delete("/:userId",(rq,res)=>{
    User.remove({_id:req.params.id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:"User delete Successfully"
        })
    })
})
module.exports=router