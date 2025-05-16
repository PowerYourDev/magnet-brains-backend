const express = require("express")
const {adminTaskSaving} = require('../../controllers/Task/taskCtrl')

const taskRouter= express.Router()

taskRouter.post('/admin/create',adminTaskSaving)

module.exports=taskRouter