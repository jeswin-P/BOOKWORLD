var mongoose = require("mongoose")

var Bookorder_schema = new mongoose.Schema({
    staffid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"staff"
    },
    bookid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"book"
    },
    bookstatus:{
        type:String,
        default:"pending",
        enum:["pending","unavailable"]
    }
})

module.exports = new mongoose.model("order",Bookorder_schema)