import "./App.css";
import About from "./routes/about";
import Home from "./routes/home";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
import LoginForm from "./routes/loginForm";
import RegistrationForm from "./routes/registrationForm";
import { useState, useEffect } from "react";
import jsCookie from "js-cookie";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="header"></div>
        <main>
          <Routes>
            <Route path="/" element={<LoginForm />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/registrationForm"
              element={<RegistrationForm />}
            ></Route>
          </Routes>
        </main>

        <div className="footerNavigation">
          <a className="nav" href="/about">
            About
          </a>
          <a className="nav" href="/contact">
            Contact
          </a>
          <a className="nav" href="/projects.html">
            Follow us on social media
          </a>
        </div>
      </div>
    </Router>
  );
}
const RequireAuth = ({ children }) => {
  const [auth, setAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = jsCookie.get("login-token");
    let verified = verifyToken(token);
    console.log("verified");
    if (verified) {
      navigate("/home");
    }
  }, []);

  const verifyToken = async (token) => {
    const url = "/verifytoken";
    const query = token ? `?token=${token}` : "";
    const options = {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    };

    try {
      const response = await fetch(url + query, options);
      if (response.ok) {
        console.log("token ok");
        return true;
      } else {
        console.log("token not ok");
        return false;
      }
    } catch (error) {
      console.log("error: " + error);
      return error;
    }
  };

  return children;
};

export default App;
