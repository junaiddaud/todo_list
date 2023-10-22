const express= require("express")
const mongoose=require('mongoose')
const Product=require("../models/product")
const router=express.Router()
router.post("/",((req,res)=>{
    const product=new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    })
    product.save().then(result=>{
        console.log(result);
    })
    .catch(e=>{
        console.log(e);
    })
    res.json({message:"test"})
}))
module.exports=router