const UserSchema = require('../Model/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, resp) => {
   try {
      const result = await UserSchema.findOne({ username: req.body.email });
      if (result == null) {
         bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
               return resp.status(500).json({
                  message: 'Something went wrong',
               });
            }
            const user = new UserSchema({
               username: req.body.username,
               fullname: req.body.fullname,
               password: hash,
            });
            try {
               const saveData = await user.save();
               resp.status(201).json({
                  status: true,
                  message: 'User created',
                  result: saveData,
               });
            } catch (error) {
               resp.status(500).json(error);
            }
         });
      } else {
         resp.status(409).json({
            status: false,
            message: 'User already exists',
         });
      }
   } catch (error) {
      resp.status(500).json(error);
   }
};

const login = async (req, resp) => {
   try {
      const selectedUser = await UserSchema.findOne({ username: req.body.username });
      if (selectedUser == null) {
         resp.status(404).json({
            status: false,
            message: 'User not found',
         });
      } else {
         bcrypt.compare(req.body.password, selectedUser.password, (err, result) => {
            if (err) {
               return resp.status(401).json({
                  message: 'Auth failed',
               });
            }
            if (result) {
               const expiresIn = 3600;
               const token = jwt.sign(
                  { username: selectedUser.username },
                  process.env.SECRET_KEY,
                  { expiresIn: expiresIn }
               );
               resp.setHeader('Authorization', `Bearer ${token}`);
               return resp.status(200).json({
                  token: token,
               });
            } else {
               return resp.status(401).json({
                  message: 'Auth failed',
               });
            }
         });
      }
   } catch (error) {
      resp.status(500).json(error);
   }
};

module.exports = { signup, login };
