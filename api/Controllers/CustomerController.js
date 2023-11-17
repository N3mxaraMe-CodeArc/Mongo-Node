const Customer = require('../Model/CustomerScheama');

/*
POST -> save
PUT -> update
GET -> fetch
DELETE -> remove
*/

const saveCustomer = (req,resp) =>{
   const temCustomer = new Customer({
      nic:req.body.nic,
      name:req.body.name,
      address:req.body.address,
      salary:req.body.salary
   })
   temCustomer.save()
   .then(result,()=>{
      resp.status(201).json({
         status:true,
         message:'Customer created',
         result:result
      })
   }).catch(error,()=>{
      resp.status(500).json(error)
   })
}
const findCustomer = (req,resp) =>{
   Customer.findOne({nic:req.headers.nic})
   .then(result,()=>{
      if(result==null){
         resp.status(404).json({status:false, message:'Customer not found'})
      }else{
         resp.status(200).json({status:true, data:result})
      }
   }).catch(error,()=>{
      resp.status(500).json(error)
   })
}
const updateCustomer = (req,resp) =>{
   Customer.updateOne({nic:req.headers.nic},{
      $set:{
         name:req.body.name,
         address:req.body.address,
         salary:req.body.salary
         }
   })
   .then(result,()=>{
      if(result.nModified>0){
         resp.status(201).json({status:true, message:'Customer was Updated'})
      }else{
         resp.status(200).json({status:false, message:'try again'})
      }
   }).catch(error,()=>{
      resp.status(500).json(error)
   })

}
const deleteCustomer = (req,resp) =>{
   Customer.deleteOne({nic:req.headers.nic})
   .then(result,()=>{
      if(result.deleteCount>0){
         resp.status(204).json({status:true, message:'Customer was Deleted'})
      }else{
         resp.status(400).json({status:false, message:'try again'})
      }
   }).catch(error,()=>{
      resp.status(500).json(error)
   })
}
const findAllCustomer = (req,resp) =>{
   Customer.find()
   .then(result,()=>{
      resp.status(200).json({status:true, data:result})
   }).catch(error,()=>{
      resp.status(500).json(error)
   })
}

module.exports = {
   saveCustomer,
   findCustomer,
   updateCustomer,
   deleteCustomer,
   findAllCustomer
}