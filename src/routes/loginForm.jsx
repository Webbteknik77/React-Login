import React, { useState } from "react";
import {Redirect, Link, useNavigate} from "react-router-dom";
import "../App.css";
import jsCookie from "js-cookie";

/* import { useEffect } from 'react'; */

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  

  const handleSubmit = (event) => {
    if (username.length < 0) {
      event.preventDefault();
      setErrorMessage("The e-mail is to short");
    }

    const authenticate = async (username, password) => {
      const url = "/login";
      const options = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'username': username, 'password': password }),
      };
        
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          console.log("ok: ");
          const token = await response.text();
          jsCookie.set('login-token', token);

          navigate('/home');
        }
        else {
          setErrorMessage("Wrong username or password");
        }

        // const json = await response.json();

        // console.log("json: " + json);
        // return json;
      } catch (error) {
        console.log('error: ' + error);
        return error;
      }
    };

    authenticate(username, password);

    event.preventDefault();

  };

  return (
    <div className="form-container">
      
      <form className="form" onSubmit={handleSubmit}>
      <h2 className="title">Login </h2>
        <input
          id="username"
          placeholder="E-mail or username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          id="password"
          className="second-input"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button >Login</button>

        <p className="link">
            <a href="">Forgot Password? </a> Or
            
            <Link to="/registrationForm"> Sign up</Link>
          </p>
          <br />
          <h3 className="error">{errorMessage}</h3>
      </form>

      
    </div>
  );
}

export default LoginForm;