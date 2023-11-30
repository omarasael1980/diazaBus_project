import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./config/db.js";
import usersRoutes from "./routes/usersRoutes.js";

const app = express();
//process JSON info
app.use(express.json())
//stablish ENV variables
dotenv.config();
//connect to database
connectDB();
//CORS  implementation
 const whiteList = [
    process.env.FRONTEND_URL, process.env.FRONTEND_URL2
 ]
 const corsOptions={
    //identity the  petition origin 
    origin: function(origin, callback) {

        if(whiteList.includes(origin)){
            //have permission to access
            callback(null, true)
        }else{
            //have not permission to access
            callback(new Error("Error de CORS"))
        }
    }
 }
 app.use(cors(corsOptions))
//routing
app.use('/api/usuarios', usersRoutes)
  
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

