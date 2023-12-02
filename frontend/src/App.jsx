import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, MainHub } from "./index";
import {AuthProvider} from "./context/AuthProvider";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import AuthLayout from "./layouts/AuthLayout"
import UserRegistration from "./pages/UserRegistration";
import PassForgotten from "./pages/PassForgotten";
import NewPassword from "./pages/NewPassword";


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            {/* Area publica*/}
            <Route path="/"  element={<AuthLayout/>} >
              <Route index element={<Login />} />             
              <Route path="olvide-password" element={<PassForgotten/>}/>
              <Route path="olvide-password/:token" element={<NewPassword/>}/>
              <Route path="registrar-usuario" element={<UserRegistration/>}/>
            
            </Route>
            {/* Area privada*/}
            <Route path="/mainhub" element={<ProtectedRoutes/>}>
              <Route index element={<MainHub/>}/>
            
          

            </Route>
            {/* <Route path="/mainhub" element={<AuthMainHub />} >
              <Route  element={<MainHub />} />
            </Route> */}

          </Routes>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
