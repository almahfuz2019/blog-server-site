const blogs = require('../Models/Blogs/Blog');
// function verifyJWT(req,res,next){
//   const authHeader=req.headers.authorization;
// if(!authHeader){
//      return res.status(401).send({message:"UnAuthorized access"})
// }
// const token=authHeader.split(' ')[1];
// jwt.verify(token,'2ed56fb58b8672c3eb25d6d76fb638ef2e9d0037dcd18471d992b33302c5aee63070b1f7205e55b78102c28da8342cfdda2a5edcfe6385050933c9f3a8be3e85',function(error, decoded) {
//      if(error){
//        return res.status(403).send({message:'Forbidden access'})
//      }
//      req.decoded =decoded;
//      next();
// })
// }
// create blogs 
function allBlogs(app) {
     app.get('/data', async (req, res) => {
          const page = parseInt(req.query.page); // Get the page number from the request, default to 1
          const limit = parseInt(req.query.limit); // Get the page size from the request, default to 10
          const startIndex = (page - 1) * limit; // Calculate the start index of the page
          try {
            // Use the limit() and skip() methods to get the paginated data from the collection
            const data = await blogs.find({status:"Available"}).skip(startIndex).limit(limit);
            res.json(data); // Return the paginated data as a JSON response
          } catch (err) {
            res.status(500).send(err); // Handle any errors that occur during the data retrieval
          }
        });
app.post("/createblog",async(req,res)=>{
     try {
       const CreateNewBlog=new blogs({
            title:req.body.title,
            image:req.body.image,
            authorName:req.body.authorName,
            authorEmail:req.body.authorEmail,
            status:req.body.status,
            date:req.body.date,
            keywords:req.body.keywords,
            description:req.body.description,
            category:req.body.category,
       })
       const blogdata=await CreateNewBlog.save();
       res.status(201).send({blogdata})
     } catch (error) {
       res.status(500).send({message:error.message})
     }
  })
  //   read blogs 
app.get("/readblogs",async(req,res)=>{
     try {
          const readBlogs=await blogs.find();
          if(readBlogs){
               res.status(200).send(readBlogs)
          }else{
               res.status(404).send({
                    message:"Blogs is not found"
               })
          }
     } catch (error) {
          res.status(500).send({message:error.message})
     }
})
  //   read blogs with category 
app.get("/readblogswithcategory/:category",async(req,res)=>{
     try {
          const category=req.params.category;
          const readBlogs=await blogs.find({category:category});
          if(readBlogs){
               res.status(200).send(readBlogs)
          }else{
               res.status(404).send({
                    message:"Blogs is not found"
               })
          }
     } catch (error) {
          res.status(500).send({message:error.message})
     }
})
  //   read blogs with category 
  app.get("/readblogswithemail/:authorEmail",async(req,res)=>{
     try {
          const findauthordata=req.params.authorEmail;
          const readBlogs=await blogs.find({authorEmail:findauthordata});
          if(readBlogs){
               res.status(200).send(readBlogs)
          }else{
               res.status(404).send({
                    message:"Blogs is not found"
               })
          }
     } catch (error) {
          res.status(500).send({message:error.message})
     }
})
// app.get("/readblogswithemail/:authorEmail",verifyJWT,async(req,res)=>{
//      try {
//           const findauthordata=req.params.authorEmail;
//           const authorization=req.headers.authorization;
//           const decodedEemail=req.decoded.email;
//           if(findauthordata === decodedEemail){

//                const readBlogs=await blogs.find({authorEmail:findauthordata});
//                if(readBlogs){
//                   return  res.status(200).send(readBlogs)
//                }else{
//                    return res.status(404).send({
//                          message:"Blogs is not found"
//                     })
//                }
//           }else{
//                     return res.status(403).send({message:"Forbidden access"})
//           }
//      } catch (error) {
//           res.status(500).send({message:error.message})
//      }
// })
// find specific data 
app.get("/readblog/:id",async(req,res)=>{
     try {
          const id=req.params.id;
          const readBlogDetails=await blogs.findOne({_id:id});
          if(readBlogDetails){
               res.status(200).send(readBlogDetails)
          }else{
               res.status(404).send({
                    message:"Blog is not found"
               })
          }
     } catch (error) {
          res.status(500).send({message:error.message})  
     }
})
// delete data 
app.delete("/deleteblog/:id",async(req,res)=>{
     try {
          const id=req.params.id;
       const blog=  await blogs.deleteOne({_id:id});
       if(blog){
          res.status(200).send(blog)
     }else{
          res.status(404).send({
               message:"Blog is not deleted"
          })
     }
     } catch (error) {
          res.status(500).send({message:error.message}) 
     }
})
// data update 
app.put("/updateblog/:id",async(req,res)=>{
     try {
          const {title, image, authorName, authorEmail, status, date, keywords, description } = req.body;
          const updateObj = {}

          if (title) updateObj.title = title;
          if (image) updateObj.image = image;
          if (authorName) updateObj.authorName = authorName;
          if (authorEmail) updateObj.authorEmail = authorEmail;
          if (status) updateObj.status = status;
          if (date) updateObj.date = date;
          if (keywords) updateObj.keywords = keywords;
          if (description) updateObj.description = description;

          const id=req.params.id;
          const updatedBlog=await blogs.updateOne({_id:id}, updateObj, {new: true}); 
          if(updatedBlog){
          res.status(200).send(updatedBlog)
     }else{
          res.status(404).send({
               message:"Category is not updated"
          })
     }
     } catch (error) {
          res.status(500).send({message:error.message})
     }
})
}


  module.exports = allBlogs;