const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const port = process.env.SERVER_PORT || 3000; 

const app = express();

mongoose.connect('mongodb://localhost:27017/customer_crud')
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });

app.use('/', (req, resp, next) => {
  resp.send('<H1> Hello World </H1>');
});
