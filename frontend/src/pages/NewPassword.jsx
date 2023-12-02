import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alertmsg, setAlertmsg] = useState({});
  const [validToken, setValidToken] = useState(false);
 

  const { token } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    const probeToken = async () => {
      try {
        await axiosClient(
          `/usuarios/password-olvidado/${token}`
        );

        //if token is valid then change the state
        setValidToken(true);
      } catch (error) {
      
        setAlertmsg({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    probeToken();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //check if exist an empty field
    if ([ password, repetirPassword].includes("")) {
      setAlertmsg({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }
    //check if both password are equals
    if (password !== repetirPassword) {
      setAlertmsg({
        msg: "Los password deben ser iguales",
        error: true,
      });
      return;
    }
    //check length of the password
    if (password.length < 6) {
      setAlertmsg({
        msg: "Tu contraseña debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    //send data to backend
    
    const { data } = await axiosClient.post(
      `/usuarios/password-olvidado/${token}`,
      {
        password
      }
    )
    
    //send confirmation message
    setAlertmsg({
      msg: data.msg,
      error: false,
    });
   setPassword('')
   setRepetirPassword('')
   setValidToken(false)
   setTimeout(()=>{
    navigate('/');
  setAlertmsg({})  
  

  },2000)
  };

  const { msg } = alertmsg;
 

  return (
    <>
      {" "}
      <div className=" w-1/2 mx-auto justify-center items-center   p-5 ">
        <div className="rounded-md px-3 py-5 shadow-md ">
          <div className="flex flex-row justify-center   py-5">
            <p className="text-3xl  text-blue-500 uppercase ">
              Cambia tu
              <span className="text-sky-850 text-3xl font-extrabold uppercase">
                {" "}
                Password
              </span>
            </p>
          </div>
          <div className="flex justify-center">
            {" "}
            {msg && <Alert alert={alertmsg} />}{" "}
          </div>

          {validToken && (
            <>
              <form
                onSubmit={handleSubmit}
                method="post"
                className=" bg-white       p-5 w-full"
                autoComplete="off"
              >
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
                  value="Cambiar Password"
                  className="bg-sky-700 mt-5 p-2 text-white w-full rounded-md  
      hover:cursor-pointer hover:bg-cyan-950 transition-colors uppercase font-bold"
                />
              </form>
          
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NewPassword;
