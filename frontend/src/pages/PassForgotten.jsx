import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert"; 
import axiosClient from "../config/axiosClient";


const PassForgotten = () => {
  
  const [email, setEmail] = useState("");
  const [alertmsg, setAlertmsg] = useState({});
  
  
  const handleSubmit = async (e) => {
     
    e.preventDefault()
    try {
     
      //check if email field is empty
      //TODO check an regular expression to control if the email is valid
      if(email === "" || email.length < 6 ){
        setAlertmsg({
          msg: "Debes ingresar un email válido",
          error: true
        })
        return
      }


      //hacer peticion y enviar use y password para validacion
         //send data to backend
 
         const {data} = await axiosClient.post(`/usuarios/password-olvidado`, {
          email 
        })
        console.log(data.msg)
      //send confirmation message
      setAlertmsg({
        msg:data.msg, 
        error:false
      })
      
      
    } catch (error) {
      
       //catch errors from backend
       setAlertmsg({
        msg: "Error al recuperar el password:  "+ error.response.data.msg , 
        error: true
      }) 
     } 
  };
  const {msg} =alertmsg
  
  return (
    <>
      <div className=" w-1/2 mx-auto justify-center items-center   p-5 ">
        <div className="rounded-md px-3 py-5 shadow-md ">
          <div className="flex flex-row justify-center   py-5">
            <p className="text-3xl  text-blue-500 uppercase ">
              Recupera tu   
              <span className="text-sky-850 text-3xl font-extrabold uppercase">
                {" "}
                Acceso
              </span>
              </p>
          </div>
          <div className="flex justify-center"> {msg && <Alert alert={alertmsg}/>} </div>
          <form
            onSubmit={handleSubmit}
            method="post"
            className=" bg-white       p-5 w-full"
            autoComplete="off"
          >
              
            <div className="  bg-white   ">
              <label
                className="text-xl uppercase text-gray-500 mb-2 block font-bold"
                htmlFor="email"
              >
                Email:{" "}
              </label>
              <input
                type="email"
                placeholder="Ingresa tu correo"
                name="email"
                autoComplete="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="text-xl  w-full mt-3 p-3 border rounded-xl bg-gray-50"
              />
            </div>
           
            <input
              type="submit"
              value="Enviar instrucciones"
              className="bg-sky-700 mt-5 p-2 text-white w-full rounded-md  
       hover:cursor-pointer hover:bg-cyan-950 transition-colors uppercase font-bold"
            />
          </form>
          <Link
            className="flex justify-center items-center   text-cyan-600 "
            to="/"
          >
            Ya tienes cuenta? Iniciar Sesión
          </Link>
          <Link
            className="flex justify-center items-center   text-cyan-600 "
            to="/"
          >
            Olvidaste tu password? Recupera contraseña
          </Link>
        </div>
      </div>
    </>
  );
}

export default PassForgotten
