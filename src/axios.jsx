import axios from "axios";
import { toast } from "react-toastify";
import ApiURL from "./config/config";
import Services from "./ServicesRoutes";


const API = axios.create({
  baseURL: ApiURL,
  headers: {
    "Content-type": "application/json",
  },
});

// request interceptor for settting the two headers refresh & access tokens
API.interceptors.request.use(
  (config) => {
   
    const token = JSON.parse(localStorage.getItem("AdminAuth"));
    if (
      config.url!=="/user/login" && config.url!=="/user/signup"

    ) {
    
      config.headers["Authorization"] = "Bearer " +  token.access_token;
    }
  


 
    // Optional
    // config.headers["Content-Type"] = "application/json";
    // console.log(config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor, when the backend throws error 403 for token expire it call the refresh token API and updates the token
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    // console.log(error, " Original Request");
    if(error.response===undefined){
      toast.error("There is an error. Please try again");
    }
   else if (error.response.status === 500) {
      toast.error("There is an error. Please try again");
    }
    else if (error.response.status !== 403) {
    
      toast.error(error.response.data.message);
      
    }
   
   else if (error.response.status === 403) {
      return API.get(Services.login).then((res) => {
        if (res.status === 200) {
          originalRequest._retry = true;
          let items = {
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
          };
          localStorage.setItem("UserAuth", JSON.stringify(items));
          // Navigate("/admin-dashboard");
          API.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.access_token;
          originalRequest.headers["Authorization"] =
            "Bearer " + res.data.access_token;
          // call failed request due to token expire
          return axios(originalRequest);
        }
      });
    }
    Promise.reject(error);
  }
);

export default API;
