import { useContext, useEffect, useState } from "react";
import TotalServices from "../../TotalServices";
import Button from "../../Components/Button/Button";
import { AuthContext } from "../../App";

const TodoPage = () => {
    const [loader,setLoader]=useState(true)
    const [todoList,setTodoList]=useState([])
    const {adminLogin,setAdminLogin}=useContext(AuthContext)
    const [todo,setTodo]=useState("")
    const handleLogout=() =>{
        localStorage.removeItem("AdminAuth")
        localStorage.removeItem("AdminIsLogin")
        setAdminLogin(!adminLogin)
    }
    const GetData = async () => {
    
     
        try {
          setLoader(true)
  
          const response = await TotalServices.listTodo();
          // console.log(response, "res");
    
          if (response.status === 200) {
            
            setTodoList(response.data.data)
              setLoader(false)
            
          }
        } catch (error) {
          console.log("error ", error);
          setLoader(false)
        }
      
      };
      const AddTodo = async () => {
    
     
        try {
          setLoader(true)
  
          const response = await TotalServices.addTodo({todo:todo});
          console.log(response, "res");
    
          if (response.status === 200) {
            setTodo("")
           GetData()

              setLoader(false)
            
          }
        } catch (error) {
          console.log("error ", error);
          setLoader(false)
        }
      
      };
      const UpdateTodo = async (val) => {
    
     
        try {
          setLoader(true)
  
          const response = await TotalServices.updateTodo({status:!val.status,id:val._id});
          console.log(response, "res");
    
          if (response.status === 200) {
            setTodo("")
           GetData()

              setLoader(false)
            
          }
        } catch (error) {
          console.log("error ", error);
          setLoader(false)
        }
      
      };
      const DeleteTodo = async (id) => {
    
     
        try {
          setLoader(true)
  
          const response = await TotalServices.deleteTodo({id:id});
          console.log(response, "res");
    
          if (response.status === 200) {
            setTodo("")
           GetData()

              setLoader(false)
            
          }
        } catch (error) {
          console.log("error ", error);
          setLoader(false)
        }
      
      };
      useEffect(()=>{
        GetData()
      },[])
    return ( 
        <div>
           
<div className="h-100 w-full flex items-center justify-center bg-teal-500-lightest font-sans">
	<div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" 
                onChange={e=>setTodo(e.target.value)}
                value={todo}
                />
                <button 
                onClick={AddTodo}
                className="flex-no-shrink p-2 border-2 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500-500">Add</button>
            </div>
        </div>
        <div>
           {todoList.map(val=>( <div className="flex mb-4 items-center">
            {console.log(val.status)}
                <p className={`w-full text-grey-darkest text-left ${val.status?"line-through":""}`}>{val.todo}</p>
                <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green-500" onClick={e=>UpdateTodo(val)}>Done</button>
                <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red-500" onClick={e=>DeleteTodo(val._id)}>Remove</button>
            </div>))}
          
        </div>
    </div>
</div>
<Button text={"Logout"} handleClick={handleLogout} />
        </div>
     );
}
 
export default TodoPage;