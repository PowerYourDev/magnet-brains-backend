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
            values: ["admin","user"],
            message: `{VALUE} is incorrect status type`,
          },
    }
})