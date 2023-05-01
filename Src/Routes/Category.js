const mongoose = require('mongoose');
const catagorys = require('../Models/category/category');
// create blogs 
function categorys(app) {
app.post("/createcategory",async(req,res)=>{
     try {
       const CreateNewCategory=new catagorys({
            name:req.body.name,
       })
       const categorydata=await CreateNewCategory.save();
       res.status(201).send({categorydata})
     } catch (error) {
       res.status(500).send({message:error.message})
     }
  })
  //   read blogs 
app.get("/readcategory",async(req,res)=>{
     try {
          const readCategory=await catagorys.find();
          if(readCategory){
               res.status(200).send(readCategory)
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
app.get("/readcategory/:id",async(req,res)=>{
     try {
          const id=req.params.id;
          const readCategoryDetails=await catagorys.findOne({_id:id});
          if(readCategoryDetails){
               res.status(200).send(readCategoryDetails)
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
app.delete("/deletecategory/:id",async(req,res)=>{
     try {
       const id=req.params.id;
       const category=  await catagorys.deleteOne({_id:id});
       if(category){
          res.status(200).send(category)
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
app.put("/updatecategory/:id",async(req,res)=>{
     try {
          const id=req.params.id;
          const updatedProduct=await catagorys.updateOne({_id:id},{
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
  module.exports = categorys;