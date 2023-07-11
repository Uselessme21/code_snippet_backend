const express = require('express');
const UserRouter = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME ;
// models
const UserModel = require('../models/User.model');


      

UserRouter.get("/", (req,res)=>{
//console.log('users')
res.send('users');

})

UserRouter.post('/register',(req,res, next)=>{
const {name,email,phone,password} = req.body;

const userExists= UserModel.findOne({email:email})
if(userExists){
  return  res.send('User is already present, Please login')
}

bcrypt.hash(password, 5, async(err, hash)=>{
   try {
    if(err){
        return res.send('password generation failed')
    }
    let payload = { name, email, phone, password: hash};
    let user = UserModel(payload);
    await user.save();
    res.send({ message: "user registered successfully" });
   } catch (error) {
   return res.send({ message: error.message})
   }
});


})

UserRouter.post('/login', async(req,res)=>{
    const {email,password} = req.body;
    try {
      const EmailExists=await UserModel.findOne({email})
    
      if(!EmailExists){
      return res.send("User not found")
      }
      const isMatch = await bcrypt.compare(password, EmailExists.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Wrong password' });
      }
     
      const accessToken = jwt.sign({ id: EmailExists._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION_TIME,
      });
      
    
      res.json({ accessToken});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
   
   
    
    })


module.exports = UserRouter