const  Input = ({placeholder,name,handleChange,value,type,disabled,handleFocus,handleBlur,classes}) => {
   
    return ( 
   
  
        <input className={` w-full outline-none p-3 border border-color-secondary rounded-xl  sm:text-md  my-2 disabled:text-gray-500 ${classes?classes:"bg-secondary"} ` } 
        placeholder={placeholder } 
        type={type}
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        />
     );
}
 
export default  Input;