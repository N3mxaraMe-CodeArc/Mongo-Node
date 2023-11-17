const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/customer_crud')
.then(() =>{
   app.listen(3000,()=>{
      console.log('Server is running on port 3000');
   });
});