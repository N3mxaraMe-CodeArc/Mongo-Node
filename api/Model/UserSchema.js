const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   username:{type:Number,required:true},
   fullname:{type:String,required:true},
   password:{type:String,required:true}
})

module.exports = mongoose.model('Customer',UserSchema);