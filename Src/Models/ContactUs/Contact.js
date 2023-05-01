const mongoose = require('mongoose');
const contactSchema=new mongoose.Schema({
     userName:{
          type: String,
          required: [true, "Name is required"],
        },
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