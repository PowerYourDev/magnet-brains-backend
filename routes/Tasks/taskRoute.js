const express = require("express")
const {adminTaskSaving,adminGetAllTasks,adminDetailGetTask,deleteTask, updateTask} = require('../../controllers/Task/taskCtrl')

const authMiddleware=require('../../middleware/Auth/authMiddleware')

const taskRouter= express.Router()


taskRouter.post('/admin/create',authMiddleware,adminTaskSaving)
taskRouter.get('/admin/get-all-tasks',authMiddleware,adminGetAllTasks)
taskRouter.get('/admin/get-task/:id',authMiddleware,adminDetailGetTask)
taskRouter.delete("/admin/delet-task/:id",authMiddleware,deleteTask)
taskRouter.patch("/admin/update-task/:id",authMiddleware,updateTask)

module.exports=taskRouter