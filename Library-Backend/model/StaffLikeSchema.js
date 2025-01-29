const mongoose = require('mongoose')

const StaffLikeSchema = new mongoose.Schema({
    staffid: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'staff', 
       
    },
    bookid: 
    { type: mongoose.Schema.Types.ObjectId, 
        ref: 'book', 
     },
     status:{
        type:Boolean,
        default:false
     }
   
});

module.exports = mongoose.model('StaffLike', StaffLikeSchema);