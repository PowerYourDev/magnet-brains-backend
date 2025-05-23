
const express= require('express')
const dbConnect =require('./config/Db/DbConnect')
require('dotenv').config();
const cors =require('cors')
const cookieParser = require('cookie-parser');

const TasksRoutes=require('./routes/Tasks/taskRoute')
const AuthRoute = require("./routes/Auth/AuthRoute")


const App=express()


App.use(cors(
  {
    origin: 'https://magnet-brains-frontend.vercel.app',
    credentials: true,
  }
))



App.use(express.json());
App.use(cookieParser());


// App.use('/api/task',TasksRoutes)
App.use('/api/auth',AuthRoute)
App.use('/api/task',TasksRoutes)



dbConnect()
  .then(() => {
    console.log("Database connection established...");
    App.listen(5000, () => {
      console.log("Server is successfully listening on port 5000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
