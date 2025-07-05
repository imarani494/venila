import React from "react";
import { useState } from "react";

const Control = () => {

    const[data,setData]=useState()
    
  return (
    <div>
      <h1>Control</h1>
      <input
      type="text"
      value={data}
      onChange={(e)=>setData(e.target.value)}
      />
    </div>
  );
};

export default Control;
