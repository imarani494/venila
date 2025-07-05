import React, { useRef } from "react";

function Unform() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredText = inputRef.current.value;

    if (enteredText.trim() === "") {
      alert("Please enter a value.");
    } else {
      alert(`Submitted: ${enteredText}`);
      inputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Text:
        <input type="text" ref={inputRef} placeholder="Type here..." />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Unform;
