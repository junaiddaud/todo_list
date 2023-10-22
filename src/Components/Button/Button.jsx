import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { GrAddCircle } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import './style.css'

const Button = ({ text, handleClick, classes, disabled, icon, color, hovertext, canHover }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      className={`rounded-full border border-color-primary flex justify-center items-center py-1 text-color-primary mx-2 px-2 focus:outline-none  ${classes ? classes : ""}  ${canHover? "animated-button":""} `}
      style={color && { backgroundColor: color }
    }
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={disabled}
   
    >
      {icon === "add" ? <GrAddCircle /> : icon === "cancel" ? <MdOutlineCancel /> : icon === "dot" ? <GoDotFill /> : ""}
      {canHover && hover ? (
        <span className={`mx-1 transition-all duration-300 w-16 opacity-100`}>
          {hovertext}
        </span>
      ) : (
        <span className="mx-1 ">
          {text}
        </span>
      )}
    </button>
  );
};

export default Button;
