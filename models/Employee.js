const { default: mongoose } = require("mongoose");

const employeeSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Employee' , employeeSchema)