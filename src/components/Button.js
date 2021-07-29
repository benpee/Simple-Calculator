import React from "react";

const Button = ({click, id, class, value, display}) => {
  return <button 
     type="button" 
     className={class} 
     id={id} 
     value={value} 
     onClick={click}
   >
     {display}
   </button>
   
  </div>
}

export default Button