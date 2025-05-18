const mongoose = require('mongoose')
const bcrypt=require('bcrypt')

const userSchema= mongoose.Schema({
    userName:{
type:String,
required:true
    },
    email:{
        type:String,
        required:[true,"email is required field"],
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,"password is required field"],
    },
    role:{
        type:String,
        required:[true,"role is required field"],
        enum: {
            values: ["Admin","User"],
            message: `{VALUE} is incorrect status type`,
          },
    }
},{ timestamps: true })

userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
      next()
    }
 
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
    next() 
 })

 userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
  
    const isPasswordValid = await bcrypt.compare(
      passwordInputByUser,
      passwordHash
    );
    return isPasswordValid;
}

const User= mongoose.model("User",userSchema)

module.exports=User