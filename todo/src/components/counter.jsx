


import React, { useState } from 'react'

const Counter = () => {
    const[count,setCount]=useState(0)

    const increment=()=>setCount(count+1)
    const decrement=()=>setCount(count-1);
    const reset=()=>setCount(0)
  return (
    <div>
      <h1>counter:{count}</h1>
      <button onClick={increment}> add</button>
      <button onClick={decrement}>dec</button>
      <button onClick={reset}>res</button>
    </div>
  )
}
const styles={
  container: {
    textAlign: 'center',
    marginTop: '100px',
    fontFamily: 'Arial',
  },
  count: {
    fontSize: '2rem',
    margin: '20px 0',
  },
  button: {
    padding: '10px 20px',
    margin: '0 10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};
export default Counter