const jwt=require ("jsonwebtoken");
const Authenticate=(req,res,next)=>{
  try {
    const {authorization}=req.headers;
    if(!authorization) throw new Error("Token not found");
    jwt.verify(
      authorization,"2ed56fb58b8672c3eb25d6d76fb638ef2e9d0037dcd18471d992b33302c5aee63070b1f7205e55b78102c28da8342cfdda2a5edcfe6385050933c9f3a8be3e85"
    )
    next()
  } catch (error) {
    res.status(401).json({message:"Unauthorized Request"})
  }
}
module.exports=Authenticate;

