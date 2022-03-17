import React, { useState } from "react";
import {Redirect, Link, useNavigate} from "react-router-dom";
import "../App.css";




function RegisterForm() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    if (username.length < 0) {
      event.preventDefault();
      setErrorMessage("The e-mail is to short");
    }



  };

  return (
    <div className="form-container">
      
      <form className="form" onSubmit={handleSubmit}>
      <h2> Create a new acount </h2>
      <h3 className="titleRegister"> Register here </h3>
        <input className="registerInput"
          id="username"
          placeholder="Create Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input className="registerInput"
          id="firstname"
          placeholder="Firstname"
          type="text"
          onChange={(e) => setFirstname(e.target.value)}
        ></input>
        
         <input className="registerInput"
          id="lastname"
          placeholder="Lastname"
          type="text"
          onChange={(e) => setLastname(e.target.value)}
        ></input>

         <input className="registerInput"
          id="email"
          placeholder="E-mail"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <input className="registerInput"
          id="password"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <input
          id="password"
          className="last-input"
          placeholder="Confirm password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button className="registerButton" >Register</button>
       
        <Link className="loginLink" to="/">back to loginpage</Link>
    
      </form>

      

      <h3>{errorMessage}</h3>
    </div>

  );
  
}

export default RegisterForm;

