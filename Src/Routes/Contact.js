const contactinfo = require('../Models/ContactUs/Contact');
// create blogs 
function usermessage(app) {
app.post("/createusermessage",async(req,res)=>{
     try {
       const CreateNewContactInfo=new contactinfo({
          userName:req.body.userName,
          userEmail:req.body.userEmail,
          userComment:req.body.userComment,
       })
       const contactdata=await CreateNewContactInfo.save();
       res.status(201).send({contactdata})
     } catch (error) {
       res.status(500).send({message:error.message})
     }
  })
  //   read blogs 
app.get("/readmessage",async(req,res)=>{
     try {
          const readmessage=await contactinfo.find();
          if(readmessage){
               res.status(200).send(readmessage)
          }else{
               res.status(404).send({
                    message:"Message info is not found"
               })
          }
     } catch (error) {
          res.status(500).send({message:error.message})
     }
})
// find specific data 
app.get("/readcontactinfo/:id",async(req,res)=>{
     try {
          const id=req.params.id;
          const readContactDetails=await contactinfo.findOne({_id:id});
          if(readContactDetails){
               res.status(200).send(readContactDetails)
          }else{
               res.status(404).send({
                    message:"Message is not found"
               })
          }
     } catch (error) {
          res.status(500).send({message:error.message})  
     }
})
// delete data 
app.delete("/deletemessage/:id",async(req,res)=>{
     try {
       const id=req.params.id;
       const contact=  await contactinfo.deleteOne({_id:id});
       if(contact){
          res.status(200).send(contact)
     }else{
          res.status(404).send({
               message:"Contact info is not deleted"
          })
     }
     } catch (error) {
          res.status(500).send({message:error.message}) 
     }
})
// data update 
app.put("/updatecontactinfo/:id",async(req,res)=>{
     try {
          const id=req.params.id;
          const updatedMessage=await contactinfo.updateOne({_id:id},{
               $set:{
                    userName:req.body.userName,
                    userEmail:req.body.userEmail,
                    userComment:req.body.userComment,
               }
          }); 
          if(updatedMessage){
          res.status(200).send(updatedMessage)
     }else{
          res.status(404).send({
               message:"Contact info is not updated"
          })
     }
     } catch (error) {
          res.status(500).send({message:error.message})
     }
})
}
  module.exports = usermessage;