var mongoose=require("mongoose")

var Staff_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    idno:{
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

module.exports = new mongoose.model("staff",Staff_schema)