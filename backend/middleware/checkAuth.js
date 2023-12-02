import jwt from "jsonwebtoken"
import Users from "../models/Users.js"
const checkAuth = async(req, res, next)=>{
    let token 
    if(req.headers.authorization &&
         req.headers.authorization.startsWith('Bearer')){ 
    
     try {
        // it receives "Bearer numbersToken" so we split to get the numbers
        token = req.headers.authorization.split(' ')[1]
        //console.log('check',token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
        //console.log(decoded)
        req.user = await Users.findById(decoded.id).select(
           '-password -accountStatus -createdAt -updatedAt -token -__v') 
       
          //  console.log(req.user) 
            return next() 
         
     } catch (error) {
        return res.status(404).json({msg: 'Hubo un error'})
     }  
    }
    if (!token) {
      
        const error = new Error("Token de inicio de sesión no válido");
        return res.status(401).json({ msg: error.message });
      }
    next()
} 
export default checkAuth