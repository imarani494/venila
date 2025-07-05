import React, { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Dynfrom() {
  const [emails, setEmails] = useState([""]);
  const [errors, setErrors] = useState([""]);

  const handleAddEmail = () => {
    setEmails([...emails, ""]);
    setErrors([...errors, ""]);
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);

    const updatedErrors = [...errors];
    updatedErrors[index] = emailRegex.test(value)
      ? ""
      : "Invalid email address";
    setErrors(updatedErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allValid = emails.every((email) => emailRegex.test(email));
    if (allValid) {
      alert(`Submitted Emails:\n${emails.join("\n")}`);
      setEmails([""]);
      setErrors([""]);
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <div>
      <h2>Email Form</h2>
      <form onSubmit={handleSubmit}>
        {emails.map((email, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="email"
              value={email}
              placeholder={`Email ${index + 1}`}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              required
            />
            {errors[index] && (
              <div style={{ color: "red", fontSize: "0.8em" }}>
                {errors[index]}
              </div>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddEmail}>
          Add Email
        </button>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>

      <h3>Entered Emails:</h3>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>{email || "(empty)"}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dynfrom;
