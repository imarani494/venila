

import { useState } from "react";

const Form=()=>{
    const[name,setName]=useState("")
    const[error,setError]=useState("")

    const handleSubmit=(e)=>{
        e.preventDefault();
   
if(name.trim()===" "){
    setName("Username is requires .");
} else{
    setError("");
    alert(`Submitted setName:${setName}`);

    setName("");
}
 }
    return(

        <div>
        
        <form onSubmit={handleSubmit}>

        <label>
        Username
       
        <input
        type="text"
        value={name}
        placeholder="enter your name"
        onChange={(e)=>setName(e.target.value)}
        />
         </label>
         <br/>

         {error &&  <p
            p style=  {{colre:"red"}}>{error}</p>}
        <button onClick="submit">submit</button>
        
        </form>
        </div>

    )

}
export default Form;