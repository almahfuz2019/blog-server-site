const mongoose = require('mongoose');
 const AuthorsSchema = new mongoose.Schema({
       name: {
         type: String,
         required: [true, "Name is required"],
       },
       image: {
         type: String,
         required: [true, "Image is required"],
       },
       category: {
         type: String,
         required: [true, "Category name is required"],
       },
       facebook: {
         type: String,
         required: [true, "Facebook is required"],
       },
       phone: {
         type: String,
         required: [true, "Phone is required"],
       },
       email: {
         type: String,
         required: [true, "Email is required"],
       },
       github: {
         type: String,
         required: [true, "Github is required"],
       },
     }
   );
    const authors=mongoose.model("authors",AuthorsSchema);
    module.exports = authors;