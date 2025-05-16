const Task = require("../../models/Task/task")
const { taskValidation, checkingAllowedFields } = require("../../Utils/singUpvalidate")

//-------------------------------------
//admin creating task
//-------------------------------------
const adminTaskSaving=async(req,res)=>{
    try{
        taskValidation(req)
        const user= req.user
        const {title,description,dueDate,status,assignedTo}=req.body
        const savingTask=await Task.create({title,description,dueDate,status,assignedTo,assignedBy:user._id})

        res.status(201).json({
            message:"task created successully",
            data:savingTask
        })



    }catch(error){
        res.status(400).json(
            { message:error.message}
        )

    }

}


//-------------------------------------
//admin get-all-task
//-------------------------------------

const adminGetAllTasks=async(req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    limit = limit > 50 ? 50 : limit;
const skip = (page-1)*limit
const totalTasks = await Task.countDocuments();
        const tasks=await Task.find({}).skip(skip).limit(limit)

        res.status(200).json(
            {
                message:"successfully fetched all tasks",
                data:tasks,
                totalTasks
            }
        )

    }catch(error){
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

//-------------------------------------
//admin get-detail-task
//-------------------------------------

const adminDetailGetTask=async(req,res)=>{
    try {
      const {id}=req.params
      const task = await Task.findById(id);
      console.log(task)
      if(!task){
        return res.status(404).json({messsage:"task not found"})
      }

      res.status(200).json(
        {
            message:"successfully fetched task",
            data:task,
            
        }
    )
        
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        }); 
    }
}


//-------------------------------------
//admin delet-task
//-------------------------------------

const deleteTask=async(req,res)=>{
    try {

        const {id}=req.params

        const deletcurrentTask=await Task.findByIdAndDelete(id)
        if(!deletcurrentTask){
        return  res.status(404).json({message:"task not found"})
        }

        res.status(200).json({message:"task deleted succesfully",
            data:deletcurrentTask
        })

        
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        }); 
        
    }
}


const updateTask=async(req,res)=>{
    try {
        
        checkingAllowedFields(req.body)
        const {id}=req.params
        const updateData = req.body; 
        const updatedTask=await Task.findByIdAndUpdate(id,updateData,{ new: true })
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
          }
      
          res.status(200).json({
            message: "Task updated successfully",
            data: updatedTask
          });
       
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });   
    }
}


module.exports={
    adminTaskSaving,
    adminGetAllTasks,
    adminDetailGetTask,
    deleteTask,
    updateTask
}