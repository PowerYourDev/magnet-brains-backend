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

const taskValidation=(req)=>{
  const {title,description,dueDate,status,assignedTo}=req.body

  if(!title ){
    throw new Error("title is required")
  }
  if(!description ){
      throw new Error("description is required")
    }
    if(!dueDate ){
      throw new Error("dueDate is required")
    }
  if(!status){
      throw new Error("status is  required ") 
  }
  if(!assignedTo){
    throw new Error("assignedTo is  required ") 
}

}

const checkingAllowedFields=(req)=>{
    const checkingAllowedFields=['title',"description","dueDate","status","assignedTo"]
    
   const allowedFields= Object.keys(req).every((key)=>{
      return  checkingAllowedFields.includes(key)
    })

    if(!allowedFields){
        throw new Error("updating task is not allowed")
    }
}


module.exports={
    singupValidate,
    checkingAllowedFields,
    taskValidation
}