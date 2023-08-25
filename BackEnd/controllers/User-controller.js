const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signup(req , res) {
  try {
    // get the email and the password
    const { username , email , password } = req.body;
    // hash password
    const hashedPassword = await bcrypt.hashSync(password, 8);
    // create user
    const user =  await User.create({
      username,
      email,
      password : hashedPassword,
    }) 
    // res 
    res.status(201).json({message : 'user created successfully'})
  } catch (err) {
    if (err.code === 11000) {
      if (err.keyPattern.username) {
        return res.status(400).json({ errMessage: 'Username is already in use' });
      } else if (err.keyPattern.email) {
        return res.status(400).json({ errMessage: 'Email is already in use' });
      }
    }
    res.status(400).json({ errMessage : err });
  }
}

async function login(req , res) {
  try {
    // get the email and password
    const {email , password} = req.body;
    // check if there is any email in db match the req email 
    const user = await User.findOne({email})
    if(!user){
      return res.status(401).json({errMessage : 'email not found'})
    }
    // compare the req password with the hashed one
    const result = await bcrypt.compareSync(password, user.password);
    if(!result){
      return res.status(401).json({errMessage : 'password not match'})
    }
    // create the jwt token
    const token = jwt.sign({'sub' : user.email} , 'adibchiguer')
    res.status(200).json({message : 'login successfully' , token })
  } catch(err) {
    return res.status(400).json({ err });
  }
}

function logout(req , res) {
  try {
    res.clearCookie('Authorization')
    res.status(200);
  } catch(err){
    return res.status(400).json({ err })
  }
}

function checkAuth(req , res) {
  try {
    res.status(200).json({islogedIn : req.islogedIn , user : req.user});
  } catch(err) {
    return res.status(400).json({err})
    // protect the routes , get the user username
  }
}

module.exports = {
  signup, 
  login,
  logout,
  checkAuth,
}
