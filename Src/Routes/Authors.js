const authors = require('../Models/Authors/Authors');
// create blogs 
function allAuthors(app) {
app.post("/createauthors",async(req,res)=>{
     try {
       const CreateNewAuthor=new authors({
          name:req.body.name,
            image:req.body.image,
            category:req.body.category,
            facebook:req.body.facebook,
            phone:req.body.phone,
            email:req.body.email,
            github:req.body.github,
       })
       const authordata=await CreateNewAuthor.save();
       res.status(201).send({blogdata: authordata})
     } catch (error) {
       res.status(500).send({message:error.message})
     }
  })
  //   read blogs 
app.get("/readauthor",async(req,res)=>{
     try {
          const readAuthors=await authors.find();
          if(readAuthors){
               res.status(200).send(readAuthors)
          }else{
               res.status(404).send({
                    message:"Author is not found"
               })
          }
     } catch (error) {
          res.status(500).send({message:error.message})
     }
})
// find specific data 
app.get("/readauthor/:id",async(req,res)=>{
     try {
          const id=req.params.id;
          const readAuthorDetails=await authors.findOne({_id:id});
          if(readAuthorDetails){
               res.status(200).send(readAuthorDetails)
          }else{
               res.status(404).send({
                    message:"Author is not found"
               })
          }
     } catch (error) {
          res.status(500).send({message:error.message})  
     }
})
// delete data 
app.delete("/deleteAuthor/:id",async(req,res)=>{
     try {
          const id=req.params.id;
       const author=  await authors.deleteOne({_id:id});
       if(author){
          res.status(200).send(author)
     }else{
          res.status(404).send({
               message:"Author is not deleted"
          })
     }
     } catch (error) {
          res.status(500).send({message:error.message}) 
     }
})
}
  module.exports = allAuthors;