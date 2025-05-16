
const generateToken= require('../../config/Jwt/jwtConnect')


const User = require('../../models/User/User')
const { singupValidate } = require('../../Utils/singUpvalidate')



const authSingUpCtrl=async(req,res,next)=>{
    try{
      singupValidate(req)
        const {userName,email,password}=req.body
        const emailExists = await User.findOne({email})
        if(emailExists){
          return res.status(409).json({ message: "Email already exists." })
        }
      
        
         const savedUser= await User.create({userName,email,password})

      
         const tokenGenerated = generateToken(savedUser._id)
         savedUser.token=tokenGenerated
         res.cookie("token",tokenGenerated,{
          secure: true,       
          sameSite: 'None',    
          expires: new Date(Date.now() + 900000) })
         res.json({
           message:"singup successfull",
           data:savedUser
         });
         
    }catch(e){
     res.status(404).send("something went wrong"+e)
    }
  
  
  }

//-------------------------------------
//login
//-------------------------------------

 const authLoginCtrl= async(req,res)=>{
    const {email,password}=req.body
    try{
       const userExist= await User.findOne({email:email})
       console.log(userExist)
       if(!userExist){
        throw new Error("email and password is incorrect")
       }
       const comparePassword= await userExist.validatePassword(password) 
       
     
      
       if (comparePassword) {
        const tokenGenerated= generateToken(userExist._id)
  
        res.cookie("token",tokenGenerated,{
          secure: true,       
          sameSite: 'None',    
          expires: new Date(Date.now() + 900000) })

       
        res.json({
          message:"login successfull",
          data:userExist
        });
      } else {
        throw new Error("Invalid credentials");
      }
    }catch(e){
      console.log(e,"juhgf")
       res.status(400).json(
       { message:e.message,
        // stack:e.stack
       }
       )
    }
  }  

  module.exports={
    authSingUpCtrl,
    authLoginCtrl
  }