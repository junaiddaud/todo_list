import React, { useState, useEffect, useContext } from "react";


import AdminLogin from "../AdminLogin/AdminLogin"
import { AuthContext } from "../App";
import TodoPage from "../Pages/TodoPage/TodoPage";

const AdminProtectedRoutes = () => {
  const {adminLogin}=useContext(AuthContext)
  const [AdminIsLogin, setAdminIsLogin] = useState(
    localStorage.getItem("AdminIsLogin")
  );

  useEffect(() => {

    setAdminIsLogin(localStorage.getItem("AdminIsLogin"))
  }, [adminLogin]);
  return AdminIsLogin === "true" ? <TodoPage />: <AdminLogin />;
};

export default AdminProtectedRoutes;
