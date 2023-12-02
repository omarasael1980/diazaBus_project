import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from "../config/axiosClient";
import LOGO_DIAZA from "../assets/LOGO_DIAZA.png"
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth";
export default function Login() {


    //states
     
    const [password, setPassword] = useState("")
    const [email, setEmail]= useState("")
    const [alertmsg, setAlertMsg] = useState("")
    //destructuring ContextAPI
    const {setAuth}=useAuth()
 
const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault()
        //check if any fields are empty
        if([email, password].includes('')){
            setAlertMsg({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return
        }

        try {
            //send info to backend to check password and user validation
            const {data} = await axiosClient.post('/usuarios/login',{
                email, password
            } )
            //save token in local storage
            localStorage.setItem('token',data.token)
            //save data from login in context api
            setAuth(data)
                      //clean Alert and fields 
            setAlertMsg({})
            setEmail("")
            setPassword("")
            //if email and password are valid
           navigate("/mainhub");
        } catch (error) {
            //si el logiuin es incorrecto mostrar alerta
            setAlertMsg({
                msg: "Error de login: " + error.response.data.msg,
                error: true
            })
            
        }
    }

  const {msg} =alertmsg
   
    return (
        <>

            <div className=" w-1/2 mx-auto justify-center items-center   p-5 ">
                <div
                    className="rounded-md px-3 py-5 shadow-md ">
                    {/* Logo */}
                    <figure
                        className="flex justify-center items-center  shadow-sm">
                        <img
                            src={LOGO_DIAZA}
                            alt="Logo de Diaza"
                            height={200}
                            width={200}
                        />
                    </figure>

                    {/* Input */}
                    <div className="flex flex-row justify-center   py-5">
                        <p className="text-3xl font-bold text-sky-700">Inicia  
                        <span className="text-cyan-950 text-3xl font-extrabold">      Sesión</span></p>
                    </div>
                 <div>{msg && <Alert alert={alertmsg}/>}</div>   
    <form 
      onSubmit={handleSubmit}
      className=" bg-white       p-5 w-full"
      autoComplete="off">
      <div className="  bg-white   " >
        <label  className="text-xl uppercase text-gray-300 block font-bold" htmlFor="email">Email:  </label>
        <input 
          type="email"
          placeholder="Ingresa tu correo"
          name="email"
          autoComplete="email"
          id="email"
          onChange={e=>setEmail(e.target.value)}
          value={email}
          className="text-xl  w-full mt-3 p-3 border rounded-xl bg-gray-50"
        />
      </div>
      <div className="  bg-white   " >
        <label  className="text-xl uppercase text-gray-300 block font-bold" htmlFor="email">Password:  </label>
        <input 
          type="password"
          placeholder="Password  "
          name="password"
          id="password"
          autoComplete="new-password"
          onChange={e=>setPassword(e.target.value)}
          value={password}
          className="text-xl  w-full   p-3 border rounded-xl bg-gray-50"
        />
      </div>
      <input type="submit" value="Iniciar Sesión" 
       className="bg-sky-700 mt-5 p-2 text-white w-full rounded-md  
       hover:cursor-pointer hover:bg-cyan-950 transition-colors uppercase font-bold" />
                
             </form>    
             <Link 
                className="flex justify-center items-center   text-cyan-600 "
                       
                     to="olvide-password"
                    >Olvidé mi password!
            </Link>  
            <Link 
                className="flex justify-center items-center   text-cyan-600 "
                       
                     to="registrar-usuario"
                    >Crea una cuenta nueva!
            </Link> 
                </div>
               
            </div>
             
        </>
    )
}
