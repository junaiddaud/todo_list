import Services from "./ServicesRoutes";
import http from "./axios";

//user
const login = (data) => {
  return http.post("/user/login", data);
};
const signup = (data) => {
  return http.post("/user/signup", data);
};
const Logout = () => {
  return http.put(Services.login);
};
//email verofication
const addTodo = (data) => {
  return http.post("/todo/add", data);
};
const updateTodo = (data) => {
  return http.post("/todo/update", data);
};
const deleteTodo = (data) => {
  return http.post("/todo/delete", data);
};
const listTodo = (data) => {
  return http.get("/todo", data);
};


const TotalServices = {
  

  addTodo,
  updateTodo,
  deleteTodo,
  listTodo,
  login,
  signup,
  Logout,


  
};

export default TotalServices;
