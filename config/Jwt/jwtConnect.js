const jwt =require('jsonwebtoken')



  const generateToken = (id) => {
    return jwt.sign({id},process.env.jwt_secret,{ expiresIn: "1d" });
  };

  module.exports=generateToken