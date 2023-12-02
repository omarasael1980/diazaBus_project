import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";

const UserRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alertmsg, setAlertmsg] = useState({});

  
  const navigate = useNavigate();
 
  const handleSubmit = async(e) => {
    try {
            e.preventDefault()
             //check if exist an empty field
      if([name, email, password, repetirPassword].includes('')){
          setAlertmsg({
          msg: "Todos los campos son obligatorios",
          error: true
        })

        return
        
      }
      //check if both password are equals
      if(password !== repetirPassword){
        setAlertmsg({
          msg: "Los password deben ser iguales",
          error: true
        })
        return
      }
      //check length of the password
      if(password.length < 6 ){
        setAlertmsg({
          msg: "Tu contraseña debe tener al menos 6 caracteres",
          error: true
        })
        return
      }

      //send data to backend
      
      const {data} = await axiosClient.post(`/usuarios`, {
        name, password, email 
      })
     //send confirmation message
      setAlertmsg({
        msg:data.msg, 
        error:false
      })
      cleanFields()
    
  
    } catch (error) {
      //si el logiuin es incorrecto mostrar alerta
      setAlertmsg({
        msg: "Error al crear usuario: \n"+error.response.data.msg,
        error: true
      })
    }
    setTimeout(()=>{
      setAlertmsg({})
    },3000)
  };
  const {msg} =alertmsg
  const cleanFields=()=>{
    setName('')
    setEmail('')
    setPassword('')
    setRepetirPassword('')

  }
  return (
    <>
      <div className=" w-1/2 mx-auto justify-center items-center   p-5 ">
        <div className="rounded-md px-3 py-5 shadow-md ">
          <div className="flex flex-row justify-center   py-5">
            <p className="text-3xl font-bold text-sky-700">
              Registrar
              <span className="text-cyan-950 text-3xl font-extrabold">
                {" "}
                Usuario
              </span>
            </p>
          </div>
          <div className="flex justify-center"> {msg && <Alert alert={alertmsg}/>} </div>
         
          <form
            onSubmit={handleSubmit}
            className=" bg-white p-5 w-full"
            autoComplete="off"
            method="post"
          >
              <div className="  bg-white   ">
              <label
                className="text-xl uppercase text-gray-500 mb-2 block font-bold"
                htmlFor="name"
              >
                Nombre:{" "}
              </label>
              <input
                type="text"
                placeholder="Ingresa tu correo"
                name="name"
                autoComplete="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="text-xl  w-full mt-3 p-3 border rounded-xl bg-gray-50"
              />
            </div>
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
            <div className="  bg-white   ">
              <label
                className="text-xl uppercase text-gray-500 mt-2 mb-2 block font-bold"
                htmlFor="password"
              >
                Password:{" "}
              </label>
              <input
                type="password"
                placeholder="Password  "
                name="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="text-xl  w-full   p-3 border rounded-xl bg-gray-50"
              />
            </div>
            <div className="  bg-white   ">
              <label
                className="text-xl uppercase text-gray-500 mt-2 mb-2 block font-bold"
                htmlFor="password2"
              >
                Repetir Password:{" "}
              </label>
              <input
                type="password"
                placeholder="Repetir Password  "
                name="password2"
                id="password2"
                autoComplete="reppassword"
                onChange={(e) => setRepetirPassword(e.target.value)}
                value={repetirPassword}
                className="text-xl  w-full   p-3 border rounded-xl bg-gray-50"
              />
            </div>
            <input
              type="submit"
              value="Crear Cuenta"
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
};

export default UserRegistration;
