const mongoose = require('mongoose');
 const postSchema = new mongoose.Schema({
       title: {
         type: String,
         required: [true, "Post title is required"],
       },
       image: {
         type: String,
         required: [true, "Post image is required"],
       },
       authorName: {
         type: String,
         required: [true, "Post author name is required"],
       },
       description: {
         type: String,
         required: [true, "Post description is required"],
       },
       date: {
         type: String
       },
       authorEmail: {
         type: String,
         required: [true, "Post authorEmail is required"],
       },
       status: {
         type: String
       },
       category: {
         type: String
       },
       keywords: {
         type:String,
         required: [true, "post keywords is required"],
       },
     }
   );
    const blogs=mongoose.model("Blogs",postSchema);
    module.exports = blogs;