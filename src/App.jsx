import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter ,Route,Routes } from 'react-router-dom'
import './App.css'
import TodoPage from './Pages/TodoPage/TodoPage'
import AdminProtectedRoutes from './Routes/AdminProtectedRoutes'
import Signup from './Signup/Signup'
export const AuthContext = createContext();
function App() {
  const [count, setCount] = useState(0)
  const [adminLogin, setAdminLogin] = useState(false);
  return (
    <>
     <AuthContext.Provider
        value={{adminLogin, setAdminLogin}}
      >
    <BrowserRouter>
    <Routes>

 <Route path='/' element={<AdminProtectedRoutes />} />
 <Route path='/signup' element={<Signup />} />

 

    </Routes>


    
    </BrowserRouter>
    </AuthContext.Provider>
     
    </>
  )
}

export default App
