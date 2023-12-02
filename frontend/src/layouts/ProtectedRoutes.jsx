 import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

 const ProtectedRoutes =()=>{
  //destructing from AuthProvider
    const {auth, loading} = useAuth()
    //console.log(auth)
    //console.log(loading)
if(loading)return "Cargando"
  return(
    <>
   {auth._id ? ( 
   //check if _id exists as user show protected pages
   <Outlet/>
   ):(
    //if its not logged return to index
    <Navigate to='/'/>
   ) }
  

    </>
  )
 }

 export default ProtectedRoutes