import Users from "../models/Users.js"
import generarId from "../helpers/generarId.js"
import generateJWT from "../helpers/generateJWT.js" 
import {emailRecoverPassword} from "../helpers/emails.js"

const createUsers = async(req,res)=>{
    
    //aboid duplicate users 
    const {email } = req.body
    const userRegistered = await Users.findOne({email: email}) 
    if(userRegistered){
        //if user is already registered 
        const error = new Error("Este usuario ya existe!") 
        //return error message
        return res.status(400).json({msg: error.message})  
    }      
   
    //hash the password

try {
    //Schema object 
    const user = new Users(req.body)
    //save id as a token
     // generate a complex unique id
     
    user.token =generarId()
    //save info in DB
    await user.save()
    //confirm message
    res.json({msg: "Usuario creado correctamente"}) 
} catch (error) {
    console.log(error)
}

}
const authenticate = async(req,res)=>{
const {email, password } = req.body
 
//check if user exists
const user = await   Users.findOne({email: email})
if(!user){
    const error = new Error('El usuario no existe');
    return res.status(404).json({msg: error.message})
}
//console.log(user) 
//check if user is confirmed
if(!user){
    const error = new Error('Tu cuenta no ha sido confirmada');
    return res.status(403).json({msg: error.message})
}
//verify if the password it's correct
if(await user.verifyPassword(password)){
 res.json({
    _id: user._id,
    nombre: user.name,
    email: user.email,
    //token generated from id
    token: generateJWT(user._id),

 })
}else{
    const error = new Error('El password es incorrecto');
    return res.status(403).json({msg: error.message})
}
}
const confirmUser = async(req, res)=>{
    // req.params = {token : URL value }
    const confirmUser = await Users.findOne({token: req.params.token});
     //if it doesn't exist
    if(!confirmUser){
        const error = new Error('Token no válido');
        return res.status(404).json({msg: error.message})
    }
     try {
        //set true account Status because the account has been confirmed
        confirmUser.accountStatus = true
        //eliminate token 
        confirmUser.token = ""
        //save changes in DB 
        await confirmUser.save()
        res.json({msg:"Usuario Confirmado Correctamente"})
     } catch (error) {
        console.log(error.message)
     }   
}
const passForgotten =async (req, res) =>{
    const {email}= req.body
    //check if user exists
    const user = await   Users.findOne({email: email})
    if(!user){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message})
    }
    //if user exists
    try {
        // generate a new token
        user.token =   generarId();
        await user.save()
        //send email with token
        emailRecoverPassword({
            name: user.name,
            email: user.email,   
            token: user.token
        })

        res.json({msg: "Hemos enviado un email con las instrucciones para que recuperes el acceso al sistema"})

    } catch (error) {
        console.log(error.message())
    }
}
const verifyToken = async (req, res) => {
    const {token}= req.params
    const validatedToken = await Users.findOne({token})
    if(!validatedToken){
        const error = new Error("Token no válido")
      return res.status(403).json({msg:  error.message})
    }else{
       res.json({msg: "Token válido"})

    }
    }

    const newPassword = async (req, res) => {
        const token = req.params.token
        const {password} = req.body

    const tokensUser = await Users.findOne({token})
    if(!tokensUser){
        const error = new Error("Token no válido")
      return res.status(403).json({msg:  error.message})
    }else{
 try {
    tokensUser.password = password
    tokensUser.token =""
    await tokensUser.save()
    res.json({msg: "Password Modificado Correctamente"})
 } catch (error) {
    console.log(error)
 }


    }
    }
    const perfil = async (req, res) => {
       const {user} = req
       res.json(user)
    }
export {
    createUsers,
    authenticate,
    confirmUser,
    passForgotten,
    verifyToken,
    newPassword,
    perfil
}