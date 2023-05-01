const mongoose = require('mongoose');
const faqs = require('../Models/FAQ/FAQ');
// create blogs 
function allFaqs(app) {
app.post("/createfaq",async(req,res)=>{
     try {
       const CreateNewFaq=new faqs({
          title:req.body.title,
          details:req.body.details
       })
       const commentdata=await CreateNewFaq.save();
       res.status(201).send({commentdata})
     } catch (error) {
       res.status(500).send({message:error.message})
     }
  })
  //   read blogs 
app.get("/readfaqs",async(req,res)=>{
     try {
          const readFaqs=await faqs.find();
          if(readFaqs){
               res.status(200).send(readFaqs)
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
app.get("/readfaq/:id",async(req,res)=>{
     try {
          const id=req.params.id;
          const readFaqDetails=await faqs.findOne({_id:id});
          if(readFaqDetails){
               res.status(200).send(readFaqDetails)
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
app.delete("/deletefaq/:id",async(req,res)=>{
     try {
       const id=req.params.id;
       const faq=  await faqs.deleteOne({_id:id});
       if(faq){
          res.status(200).send(faq)
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
app.put("/updatefaq/:id",async(req,res)=>{
     try {
          const id=req.params.id;
          const updatedfaq=await faqs.updateOne({_id:id},{
               $set:{
                    name:req.body.name,
               }
          }); 
          if(updatedfaq){
          res.status(200).send(updatedfaq)
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
  module.exports = allFaqs;