import React, { useState, useEffect, useContext } from "react";
import UserLogin from "../Components/UserDashboard/UserLogin/UserLogin";
import { AuthContext } from "../App";
import Dashboard from "../Components/AdminDashboard/Dashboard/Dashboard";



const AProtectedRoute = () => {
  const {userLogin}=useContext(AuthContext)
  const [UserIsLogin, setUserIsLogin] = useState(
    localStorage.getItem("UserIsLogin")
  );

  useEffect(() => {
    setUserIsLogin(localStorage.getItem("UserIsLogin"));
  }, [userLogin]);
  return UserIsLogin === "true" ? <Dashboard />: <UserLogin />;
};

export default AProtectedRoute;
