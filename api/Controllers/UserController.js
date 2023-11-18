const UserSchema = require('../Model/UserSchema');
const bcrypt = require('bcryptjs');

const signup = async (req,resp) =>{
   UserSchema.findOne({username:req.body.email}).then(result=>{
      if(result==null){
         bcrypt.hash(req.body.password,10, function(err,hash){
            if(err){
               return resp.status(500).json({
                  message:'Something went wrong'
               })
            }
            const user = new UserSchema({
               username:req.body.username,
               fullname:req.body.fullname,
               password:hash
            });
            user.save().then(saveData=>{
               resp.status(201).json({
                  status:true,
                  message:'User created',
                  result:saveData
               }).
               catch(error=>{
                  resp.status(500).json(error)
               })
            })
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
         bcrypt.compare(req.body.password,result.password,function(err,hash){
            if(err){
               return resp.status(401).json({
                  message:'Auth failed'
               })
            }
            if(result){
               return resp.status(200).json({
                  token:'token data'
               })
            }else{
               return resp.status(401).json({
                  message:'Auth failed'
               })
            }
         })
      }
   }).catch(error=>{
      resp.status(500).json(error)
   })
}

module.exports = {signup,login}