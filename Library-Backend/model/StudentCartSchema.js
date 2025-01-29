const mongoose = require("mongoose");

const StudentCartSchema = new mongoose.Schema({
  studentid: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "student", 
    required: true,
  },
  bookid: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "book", 
    required: true,
  },
  status: {
    type: Boolean,
    default: false, 
  },
});

module.exports = mongoose.model("StudentCart", StudentCartSchema);
