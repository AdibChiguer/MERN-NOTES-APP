const jwt = require('jsonwebtoken');
const User = require('../models/user')

async function requireAuth(req , res , next) {
  try {
    // read token 
    const token = req.body.token;
    // decode the token
    const decoded = jwt.verify(token, 'adibchiguer');
    // find user using decoded sub
    const user = await User.findOne({ email : decoded.sub })
    const islogedIn = true;
    if(!user){
      // return res.sendStatus(401)
      islogedIn = false;
    }
    // attach user to req 
    req.user = user;
    req.islogedIn = islogedIn;
    // continue on
    next()
  } catch(err) {
    return res.sendStatus(401)
  }
}

module.exports = requireAuth;

