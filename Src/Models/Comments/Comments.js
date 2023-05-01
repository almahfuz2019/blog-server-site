const mongoose = require('mongoose');
const commentsSchema=new mongoose.Schema({
     userName:{
          type: String,
          required: [true, "userName is required"],
        },
     userEmail:{
          type: String,
          required: [true, "userEmail is required"],
        },
     userComment:{
          type: String,
          required: [true, "userComment is required"],
        },
        postID:String
})
const comment=mongoose.model("comments",commentsSchema);
module.exports=comment;