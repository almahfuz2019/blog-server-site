const blogs = require('../Models/Blogs/Blog');
// create blogs 
function allBlogs(app) {
     // search data 
        
        
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
          const id=req.params.id;
          const updatedBlog=await blogs.updateOne({_id:id},{
               $set:{
                    title:req.body.title,
                    image:req.body.image,
                    authorName:req.body.authorName,
                    authorEmail:req.body.authorEmail,
                    status:req.body.status,
                    date:req.body.date,
                    keywords:req.body.keywords,
                    description:req.body.description,
                    category:req.body.category,
               }
          }); 
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