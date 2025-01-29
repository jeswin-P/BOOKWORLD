var mongoose=require("mongoose")

var Book_schema = new mongoose.Schema({
    booktitle:{
        type:String,
        require:true
    },
    authorname:{
        type:String,
        require:true
    },
    genre:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    },
    image:{
        type:Object
    },
   
    bookstatus:{
        type:String,
        default:"pending",
        enum:["pending","unavailable"]
    }
    
})

module.exports = new mongoose.model("book",Book_schema)