var mongoose=require("mongoose")

var Student_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    regno:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:Object
    },
    isactive:{
        type:Boolean,
        required:true,
    }
    
})

module.exports = new mongoose.model("student",Student_schema)