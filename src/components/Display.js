import React from "react";

const Display = ({equation, display}) => {
  return <div id="calcDisplay" className="row-1-2 col-1-4">
    <span id="eq"> {equation} </span>
    <span id="dis"> {display} </span>
  </div>
}

export default Display