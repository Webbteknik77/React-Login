import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.length < 7) {
      setErrorMessage(
        "The password is to short, it must contain at least seven caracters"
      );
      return;
    }

    if (username.length < 0) {
      setErrorMessage("You must fill in a Username");
      return;
    }
    if (email.length < 0) {
      setErrorMessage("You must fill in a valid email adress");
      return;
    }

    const registered = {
      fullName: fullName,
      username: username,
      email: email,
      password: password,
    };
    console.log(registered);
    axios
      .post("http://localhost:3001/app/signup", registered)
      .then((response) => console.log(response.data));
    window.location = "/";
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2> Create a new acount </h2>
        <h3 className="titleRegister"> Register here </h3>
        <input
          id="fullName"
          className="registerInput"
          placeholder="FullName"
          type="text"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        ></input>
        <input
          id="username"
          className="registerInput"
          placeholder="Username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></input>
        <input
          id="email"
          className="registerInput"
          placeholder="E-mail"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <input
          id="password"
          className="registerInput"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <button value="submit" className="registerButton">
          Register
        </button>
        <Link className="loginLink" to="/">
          back to loginpage
        </Link>
        <br />
        <h3 className="error">{errorMessage}</h3>
      </form>
    </div>
  );
}
export default RegistrationForm;
