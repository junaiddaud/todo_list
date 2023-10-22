const express= require("express")
const mongoose=require('mongoose')
const TodoList=require("../models/todo")
const checkAuth=require("../middleware/check-auth")
const router=express.Router()
router.post("/add",checkAuth,((req,res)=>{
    console.log(req.userData);
    const todo=new TodoList({
        _id:new mongoose.Types.ObjectId(),
        todo:req.body.todo,
       user:req.userData.id,
    
    })
    todo.save().then(result=>{
       res.status(200).json({message:"Todo Added"})
    })
    .catch(e=>{
        res.status(500).json({
            error:e
          })
    })
   
}))
router.post("/update",checkAuth,((req,res)=>{
console.log(req.body.status);
  
  TodoList.findOneAndUpdate({user:req.userData.id,_id:req.body.id},{status:req.body.status}).then(result=>{
       res.status(200).json({message:"Todo update",
    result:result})
    })
    .catch(e=>{
        res.status(500).json({
            error:e
          })
    })
   
}))
router.post("/delete",checkAuth,((req,res)=>{
  
      
      TodoList.findByIdAndDelete(req.body.id).then(result=>{
           res.status(200).json({message:"Todo deleted",
        result:result})
        })
        .catch(e=>{
            res.status(500).json({
                error:e
              })
        })
       
    }))
router.get("/",checkAuth,((req,res)=>{
   
  TodoList.find({user:req.userData.id}).sort({ _id: -1 }).exec().then(result=>{
    res.status(200).json({data:result})
  })
    .catch(e=>{
      res.status(500).json({
        error:e
      })
    })
   
}))
module.exports=router