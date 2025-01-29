var mongoose = require("mongoose")

var studentorder_schema = new mongoose.Schema({
    studentid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"student"
    },
    bookid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"book"
    },
    bookstatus:{
        type:String,

        default:"unavailable",

        enum:["pending","unavailable"]
    }
})

module.exports = new mongoose.model("orderr",studentorder_schema)