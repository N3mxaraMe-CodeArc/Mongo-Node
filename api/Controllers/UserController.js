const UserSchema = require('../Model/UserSchema');

const signup = async (req,resp) =>{
   UserSchema.findOne({username:req.body.email}).then(result=>{
      if(result==null){
         const temUser = new UserSchema({
            username:req.body.email,
            fullname:req.body.fullname,
            password:req.body.password
         })
         temUser.save().then(result=>{
            resp.status(201).json({
               status:true,
               message:'User created',
               result:result
            })
         }).catch(error=>{
            resp.status(500).json(error)
         })
      }else{
         resp.status(409).json({
            status:false,
            message:'User already exist'
         })
      }
   }).catch(error=>{
      resp.status(500).json(error)
   })
}

const login = async (req,resp) =>{
   UserSchema.findOne(req.params.username).then(result=>{
      if(result==null){
         resp.status(404).json({
            status:false,
            message:'User not found'
         })
      }else{
         if(result.password==req.params.password){
            resp.status(200).json({
               status:true,
               message:'User found',
               result:result
            })
         }else{
            resp.status(401).json({
               status:false,
               message:'Invalid password'
            })
         }
      }
   }).catch(error=>{
      resp.status(500).json(error)
   })
}

module.exports = {signup,login}