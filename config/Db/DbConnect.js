
const mongoose = require('mongoose')

const mongoseConnect= async()=>{
   await mongoose.connect(process.env.DB_URL)

}


module.exports=mongoseConnect