const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type: String,
        required : true,
        unique : true
    },
    status : {
        type : Number,
        default : 1
    }
});

module.exports = mongoose.model("users", userSchema);