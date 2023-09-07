const Mongoose = require("mongoose")
const UserSchema = new Mongoose.Schema({
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
  

const User = Mongoose.model("user", UserSchema)
module.exports = User