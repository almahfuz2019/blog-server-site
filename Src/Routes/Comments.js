const comments = require('../Models/Comments/Comments');
// create blogs 
function userComments(app) {
app.post("/createusercomment",async(req,res)=>{
     try {
       const CreateNewComment=new comments({
          userName:req.body.userName,
          userEmail:req.body.userEmail,
          userComment:req.body.userComment,
          postID:req.body.postID
       })
       const commentdata=await CreateNewComment.save();
       res.status(201).send({categorydata: commentdata})
     } catch (error) {
       res.status(500).send({message:error.message})
     }
  })
  //   read blogs 
app.get("/readcomments",async(req,res)=>{
     try {
          const readComments=await comments.find();
          if(readComments){
               res.status(200).send(readComments)
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
app.get("/readcomment/:id",async(req,res)=>{
     try {
          const id=req.params.id;
          const readCommentDetails=await comments.findOne({_id:id});
          if(readCommentDetails){
               res.status(200).send(readCommentDetails)
          }else{
               res.status(404).send({
                    message:"Blog is not found"
               })
          }
     } catch (error) {
          res.status(500).send({message:error.message})  
     }
})
  //   read user spcifiq blog comment
app.get("/readblogcomment/:id",async(req,res)=>{
     try {
          const id=req.params.id;
          const readCommentDetails=await comments.find({postID:id}).sort({_id:-1}).select({userEmail:0});
          if(readCommentDetails){
               res.status(200).send(readCommentDetails)
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
app.delete("/deletecomment/:id",async(req,res)=>{
     try {
       const id=req.params.id;
       const comment=  await comments.deleteOne({_id:id});
       if(comment){
          res.status(200).send(comment)
     }else{
          res.status(404).send({
               message:"Category is not deleted"
          })
     }
     } catch (error) {
          res.status(500).send({message:error.message}) 
     }
})
// data update 
app.put("/updatecomment/:id",async(req,res)=>{
     try {
          const id=req.params.id;
          const updatedProduct=await comments.updateOne({_id:id},{
               $set:{
                    name:req.body.name,
               }
          }); 
          if(updatedProduct){
          res.status(200).send(updatedProduct)
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
  module.exports = userComments;