const express= require('express')

const {
    authSingUpCtrl,
    authLoginCtrl

}=require("../../controllers/Auth/authCtrl")

const authRouter=express.Router()

authRouter.post("/singup",authSingUpCtrl)
authRouter.post('/signin',authLoginCtrl)






module.exports=authRouter