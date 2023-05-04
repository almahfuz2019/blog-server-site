const express = require('express');
const mongoose = require('mongoose');
let cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port = 5000;
async function database() {
     try {
          await mongoose.connect('mongodb://127.0.0.1:27017/Blogwebsite');
          console.log("Connected");
     } catch (error) {
          console.log("not connected");
          console.log(error);
     }
}
// blogs crud operation start  
const allBlogs = require('./Src/Routes/Blogs');
allBlogs(app); 
// categorys crud operation start  
const categorys = require('./Src/Routes/Category');
categorys(app);
// user comments crud operation start  
const userComments = require('./Src/Routes/Comments');
userComments(app);
// user Contact crud operation start  
const usermessage = require('./Src/Routes/Contact');
usermessage(app);
// user Contact crud operation start  
const allAuthors = require('./Src/Routes/Authors');
allAuthors(app);
// user update operation start  
const allUsers = require('./Src/Routes/allUsers');
allUsers(app);
// Faq crud operation start  
const allFaqs = require('./Src/Routes/FAQ');
allFaqs(app);
// app listen 
app.listen(port, async() => {
  console.log(`Example app listening on port ${port}`);
  await database();
})