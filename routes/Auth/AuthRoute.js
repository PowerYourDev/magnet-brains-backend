const express= require('express')

const {
    authSingUpCtrl,
    authLoginCtrl,
    getAllUsers
    

}=require("../../controllers/Auth/authCtrl")

const authRouter=express.Router()

authRouter.post("/singup",authSingUpCtrl)
authRouter.post('/singin',authLoginCtrl)
authRouter.get('/get-all-users',getAllUsers)









module.exports=authRouter