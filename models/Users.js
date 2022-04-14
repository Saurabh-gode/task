const { default: mongoose } = require("mongoose");

const usersSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required:true,
        max:10
    },
    lastname : {
        type:String,
        required:true,
        max:10
    },
    email: {
        type:String,
        required:true,
        max:20,
        unique:true
    },
    password : {
        type:String,
        required:true,
        max:1020
    },
    emp_id : {
        type:String,
        required:true,
        max:20,
        unique:true
    },
    og_name : {
        type:String,
        required:true,
        max:20
    },  
})

module.exports = mongoose.model('Users' , usersSchema)