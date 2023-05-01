const mongoose = require('mongoose');
const faqsSchema=new mongoose.Schema({
     title:{
          type: String,
          required: [true, "Title is required"],
        },
     details:{
          type: String,
          required: [true, "Details is required"],
        }
})
const faq=mongoose.model("faqs",faqsSchema);
module.exports=faq;