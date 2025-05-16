const Validate=require('validator')

const singupValidate =(req)=>{
    const {userName,email,password}=req.body

    if(!userName ){
      throw new Error("userName is required")
    }
    if(!email ){
        throw new Error("email is required")
      }
      if(!password ){
        throw new Error("password is required")
      }
    if(!Validate.isEmail(email)){
        throw new Error("email is not valid ") 
    }
    
   

}

const checkingAllowedFields=(req)=>{
    const checkingAllowedFields=['firstName',"lastName","email","age","gender","photoUrl","skills","about"]
    
   const allowedFields= Object.keys(req).every((key)=>{
      return  checkingAllowedFields.includes(key)
    })

    if(!allowedFields){
        throw new Error("updating profile is not allowed")
    }
}


module.exports={
    singupValidate,
    checkingAllowedFields
}