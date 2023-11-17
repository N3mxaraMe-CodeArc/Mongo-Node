const express = require('express');
const CustomerController = require('../Controllers/CustomerController');
const router = express.Router();

router.post('/save-customer',CustomerController.saveCustomer);
router.put('/update-customer',CustomerController.updateCustomer);
router.delete('/delete-customer',CustomerController.deleteCustomer);
router.get('/get-customer',CustomerController.findCustomer);
router.get('/get-all-customer',CustomerController.findAllCustomer);

module.exports = router;