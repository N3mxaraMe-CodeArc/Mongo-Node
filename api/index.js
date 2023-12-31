const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const CustomerRoute = require('./routes/CustomerRoute')
const UserRoute = require('./routes/UserRoute')


mongoose.connect('mongodb://localhost:27017/customer_crud')
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });

app.use(`./api/v1/customers`, CustomerRoute);
app.use(`./api/v1/users`, UserRoute);