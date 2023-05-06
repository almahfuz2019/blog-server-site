const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
     email:{
          type: String,
          email: [true, "Email is required"],
        },
        role:{
          type:String
        }
})
const users=mongoose.model("users",userSchema);
module.exports=users;