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

}
const updateCustomer = (req,resp) =>{

}
const deleteCustomer = (req,resp) =>{

}
const findAllCustomer = (req,resp) =>{

}