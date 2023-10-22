const mongoose=require('mongoose')
const todoSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    todo:String,
   status:{type:Boolean, default:false}
})
module.exports=mongoose.model('TodoList',todoSchema)