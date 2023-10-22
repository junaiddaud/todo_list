import { useEffect, useState ,useContext} from "react";
import { toast } from "react-toastify";
import { BiHide, BiShow } from "react-icons/bi";
import ButtonLoader from "../Components/Loader/ButtonLoader"
import Validations from "../Regex";
import Input from "../Components/Input/Input"
import Button from "../Components/Button/Button"
import { AuthContext } from "../App";
import TotalServices from "../TotalServices";
import { Link } from "react-router-dom";

const AdminLogin = () => {
    

    const [email, setEmail] = useState("");
    const [forgotEmail, setForgotEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader,setLoader]=useState(false)
    const [ForgotPass,setForgotPass]=useState(false)
    const [SendLink,setSendLink]=useState(false)
     const [showPassword,setShowPassword]=useState(false)
  const {setAdminLogin,adminLogin}=useContext(AuthContext)
  
    const handleLogin = async () => {
    
      localStorage.setItem("AdminIsLogin", "true");
      if(Validations.isEmpty(email) || Validations.isEmpty(password)){
        toast.error("Fields Can't be Empty")
      }
      else if(!Validations.isEmail(email) ){
        toast.error("Invalid Email")
      }
      else{
      try {
        setLoader(true)

        const response = await TotalServices.login({
          email: email,
          password: password,
        });
        // console.log(response, "res");
  
        if (response.status === 200) {
          
            let items = {
              access_token: response.data.token,
              
            };
            localStorage.setItem("AdminAuth", JSON.stringify(items));
            localStorage.setItem("AdminIsLogin", "true");
           setAdminLogin(!adminLogin)
            setLoader(false)
          
        }
      } catch (error) {
        console.log("error ", error);
        setLoader(false)
      }
    }
    };
   
    const handleChange = (e) =>{
setEmail(e.target.value)
    }
    return ( 
        <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center md:px-6 py-8 mx-auto md:h-screen lg:py-0">
         {ForgotPass?
         SendLink?
         <div className="lg:w-1/3 w-full bg-white rounded-lg shadow ">
         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
               Email Sent Successfully.
             </h1>
           
              <p className="  leading-tight tracking-tight text-gray-900 md:text-2xl ">Check your email</p>
                 
                 <button  className="w-full text-white bg-[#18a47c]  space-y-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                
              
                onClick={e=>{setForgotPass(false);setLoader(false);setSendLink(false)}}
                                >
                                  Go to Login</button>

         </div>
     </div>
     :
         <div className="lg:w-1/3 w-full bg-white rounded-lg shadow ">
         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Forgot Your Password
             </h1>
             <form className="space-y-4 md:space-y-6" 
             onSubmit={e=>{
                 e.preventDefault()
                 handleForgotPass()
             }}>
                 <div>
                     <label className="block mb-2 text-sm font-medium text-gray-900 ">Enter Your email to get a new Password</label>
                     <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#18a47c] focus:ring-2 block w-full p-2.5 outline-none" placeholder="name@company.com" required={true}
                     onChange={e=>setForgotEmail(e.target.value)}
                     value={forgotEmail} />
                     
                 </div>
             
              
                 
                 {loader ?
              <ButtonLoader />
                :
                 <button type="submit" className="w-full text-white bg-[#18a47c]  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                
                 disabled={loader}

                 >
                    Get Link</button>
}
<button  className="w-full text-white bg-[#18a47c]  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                
              
onClick={e=>setForgotPass(false)}
                >
                  Go to Login</button>
            
             </form>
         </div>
     </div>
        :
            <div className="lg:w-1/3 w-full bg-white rounded-lg shadow ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center ">
                      Admin Login
                    </h1>
                    <form className="space-y-4 md:space-y-6" 
                    onSubmit={e=>{
                        e.preventDefault()
                        handleLogin()
                    }}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                         <Input placeholder={"Email" }name={"email"} handleChange={handleChange} value={email} />
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <div className="items-center justify-between  border border-blue-700 border-t-2  border-l-2 rounded-full  sm:text-md  my-2 relative" >

                        
                            <input type={showPassword?"text":"password"} name="password" id="password" placeholder="••••••••" className="w-full outline-none border-none p-3 rounded-full  " 
                            required={true}
                            onChange={e=>setPassword(e.target.value)}
                            value={password}  />
                            <span className="absolute top-3  right-3" role="button" onClick={e=>setShowPassword(!showPassword)}>
                          {  showPassword?  <BiHide size={20}/> :  <BiShow size={20} />}
                            </span>
                            </div>
                        </div>
     <div className="flex justify-center">
                        {loader ?
                     <ButtonLoader />
                       :
                      <Button text={"Sign In"}  />
}


</div>
<p>Doesn't have account <Link to={"/signup"} className="text-blue-500" >Login</Link></p>
                    </form>
                </div>
            </div>
}
        </div>
      </section>
     );
}
 
export default AdminLogin;