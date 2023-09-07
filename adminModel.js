const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    
    gender:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    nationality:{
        type:String,
        require:true
    },
    
    skills:["react","ASP.net","MVC"],
     
     appliedfor: {
        type: String,
        require:true
     },
     resume: {
        type: String,
        require:true
     },
     message:{
        type:String,
        require:true
     },
     status:{
        type:String,
        require:true
     },
     token:{
        type:String,
     },
    },
    {
    timestamps: true
    }
    );

const adminModel = mongoose.model("users",adminSchema);
module.exports = adminModel;