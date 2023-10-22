const express=require('express')
const morgan=require('morgan')
const mongoose=require('mongoose')
require("dotenv").config()
mongoose.connect("mongodb+srv://jd300:"+process.env.MONGOOSE_PWD+"@cluster0.cugxnfa.mongodb.net/todolist?retryWrites=true&w=majority")
const body_parser=require('body-parser')
const placeRoutes=require('./routes/places_route')
const userRoutes=require('./routes/user_routes')
const todoRoutes=require('./routes/todo_routes')
const app =express()
app.use(morgan("dev"))
app.use(body_parser.urlencoded({extended:false}))
app.use(body_parser.json())
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    if(req.method==='OPTIONS'){
        res.header("Access-Control-Allowed-Methods","PUT, POST, GET, DELETE, PATCH ")
        return res.status(200).json({})

    }
    next()
})
app.use("/tests",placeRoutes)
app.use("/user",userRoutes)
app.use("/todo",todoRoutes)

app.use((req,res,next)=>{
const error=new Error("not found")
error.status=404;
next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})

app.listen(5001)