const mongoose = require("mongoose")



var ReviewSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["student", "staff"],
        required: true,
    },
    studentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student", 
        // required: function () {
        //     return this.role === "student";
        // },
    },
    staffid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "staff", 
        // required: function () {
        //     return this.role === "staff";
        // },
    },
    postid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book", 
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
});

module.exports = mongoose.model("Review", ReviewSchema);