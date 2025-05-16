const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    
    status:{
        type:String,
        required:true,
        enum: {
            values: ["pending","completed"],
            message: `{VALUE} is incorrect status type`,
          },
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    assignedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    
},

{ timestamps: true })

const Task=mongoose.model("Task",taskSchema)

module.exports=Task