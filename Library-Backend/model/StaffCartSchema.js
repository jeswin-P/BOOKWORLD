const mongoose = require("mongoose");

const StaffCartSchema = new mongoose.Schema({
  staffid: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "staff", 
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

module.exports = mongoose.model("StaffCart", StaffCartSchema);