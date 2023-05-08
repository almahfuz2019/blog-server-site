const mongoose = require('mongoose');
const contactSchema=new mongoose.Schema({
     userEmail:{
          type: String,
          required: [true, "Email is required"],
        },
     userComment:{
          type: String,
          required: [true, "Message is required"],
        }
})
const comment=mongoose.model("contact",contactSchema);
module.exports=comment;