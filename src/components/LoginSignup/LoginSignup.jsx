import React, { useEffect } from "react";
import "./LoginSignup.css";
import { useState } from "react";
import { useAuth } from "../../context/BlankAuthContext";
import { useNavigate } from "react-router-dom";

//import user_icon from '../Assets'
const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("blankscope@gmail.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Username" />
          </div>
        )}

        <div className="input">
          <span>Email:</span>
          <i className="fas fa-envolope"></i>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="input">
          <span>Password:</span>
          <i className="fas fa-lock"></i>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="input">
          <span>Serial no:</span>
          <input
            type="password"
            id="password"
            placeholder="Serial No:"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Lost Password <span>Click Here</span>
        </div>
      )}
      <div className="submit-container">
        {/*<div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          {" "}
          Sign Up{" "}
        </div>*/}
        <button
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          {" "}
          Login{" "}
        </button>
      </div>
    </form>
  );
};

export default LoginSignup;
