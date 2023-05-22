const blogs = require('../Models/Blogs/Blog');
// create blogs 
function allBlogs(app) {
     app.get('/blogs', async (req, res) => {
          const page = parseInt(req.query.page);
          const limit = parseInt(req.query.limit);
          const startIndex = (page - 1) * limit;
          try {
            const data = await blogs.find({status:"Available"}).skip(startIndex).limit(limit);
            res.json(data);
          } catch (err) {
            res.status(500).send(err); 
          }
        });
        //data count
     app.get('/blogscount', async (req, res) => {
          try {
            const count = await blogs.countDocuments();
            res.send({count});
          } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
          }
        });
        app.get("/user/search/:search", async (req, res) => {
          try {
            const data = await blogs.find({
              $or: [
                {
                    title: { $regex: req.params.search },
                },
                {
                    keywords: { $regex: req.params.search },
                },
                {
                    authorName: { $regex: req.params.search },
                },
                {
                    description: { $regex: req.params.search },
                },
              ],status: "Available",
            });
        
            res.status(200).json(data);
          } catch (error) {
            res.status(500).send(error.message);
          }
        });
     //    for deshboard blogs page 
     app.get("/blog/search/:search", async (req, res) => {
          try {
            const data = await blogs.find({
              $or: [
                {
                    title: { $regex: req.params.search },
                },
                {
                    keywords: { $regex: req.params.search },
                },
                {
                    authorName: { $regex: req.params.search },
                },
                {
                    description: { $regex: req.params.search },
                },
              ]
            });
        
            res.status(200).json(data);
          } catch (error) {
            res.status(500).send(error.message);
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
// waitingblog search 
 //    for deshboard blogs page 
 app.get("/waitingblog/search/:search", async (req, res) => {
     try {
       const data = await blogs.find({
         $or: [
           {
               title: { $regex: req.params.search },
           },
           {
               keywords: { $regex: req.params.search },
           },
           {
               authorName: { $regex: req.params.search },
           },
           {
               description: { $regex: req.params.search },
           },
         ],status: "waiting"
       });
   
       res.status(200).json(data);
     } catch (error) {
       res.status(500).send(error.message);
     }
   });
app.get("/readblogswithwaiting",async(req,res)=>{
     try {
          const category="waiting";
          const readBlogs=await blogs.find({status:category});
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
app.get('/waitingblogscount', async (req, res) => {
     try {
          const category="waiting";
       const count = await blogs.find({status:category}).countDocuments();
       res.send({count});
     } catch (err) {
       console.error(err);
       res.status(500).send('Server error');
     }
   });
  //   read blogs with category 
app.get("/readblogswithcategory/:category",async(req,res)=>{
     try {
          const category=req.params.category;
          const readBlogs=await blogs.find({category:category,status: "Available",});
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