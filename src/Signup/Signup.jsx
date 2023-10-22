import { useEffect, useState ,useContext} from "react";
import { toast } from "react-toastify";
import { BiHide, BiShow } from "react-icons/bi";
import ButtonLoader from "../Components/Loader/ButtonLoader"
import Validations from "../Regex";
import Input from "../Components/Input/Input"
import Button from "../Components/Button/Button"
import { AuthContext } from "../App";
import TotalServices from "../TotalServices";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    

    const [email, setEmail] = useState("");
    const [forgotEmail, setForgotEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName]=useState("")
    const [loader,setLoader]=useState(false)
    const [ForgotPass,setForgotPass]=useState(false)
    const [SendLink,setSendLink]=useState(false)
     const [showPassword,setShowPassword]=useState(false)

  const navigate=useNavigate()
    const handleSignup= async () => {
    
      localStorage.setItem("AdminIsLogin", "true");
      if(Validations.isEmpty(email) || Validations.isEmpty(password) || Validations.isEmpty(name)){
        toast.error("Fields Can't be Empty")
      }
      else if(!Validations.isEmail(email) ){
        toast.error("Invalid Email")
      }
      else{
      try {
        setLoader(true)

        const response = await TotalServices.signup({
          email: email,
          password: password,
          name:name,
        });
        // console.log(response, "res");
  
        if (response.status === 200) {
          
          
          navigate("/")
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
       
      
            <div className="lg:w-1/3 w-full bg-white rounded-lg shadow ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center ">
               Signup
                    </h1>
                    <form className="space-y-4 md:space-y-6" 
                    onSubmit={e=>{
                        e.preventDefault()
                        handleSignup()
                    }}>
                       <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Your Nmae</label>
                         <Input placeholder={"Name" }name={"email"} handleChange={e=>setName(e.target.value)} value={name} />
                        </div>
                        <div></div>
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
                      <Button text={"Sign Up"}  />
}</div>
                     
                    </form>
                </div>
            </div>

        </div>
      </section>
     );
}
 
export default Signup;