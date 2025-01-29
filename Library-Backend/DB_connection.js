var mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/library")

var db=mongoose.connection
db.on("error",console.error.bind(console,"connection error"))
db.once("open",()=>{
    console.log("connection successful")

    
    
})

module.exports=db