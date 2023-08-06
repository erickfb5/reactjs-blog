import { useEffect, useState, useRef } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link, useNavigate } from "react-router-dom";

import { handleLogin } from "../utils/";
import { useInputFocus } from "../hooks";

const Login = () => {
  const { username } = useStoreState((state) => state.auth);
  const { authLogin, setUsername } = useStoreActions((actions) => actions.auth);
  const [password, setPassword] = useState("")
  const [trustDevice, setTrustDevice] = useState(false);
  const navigate = useNavigate();
  
  const { focusedInput } = useInputFocus();
  const inputFieldRef = useRef(null);
  const passwordFieldRef = useRef(null);

  useEffect(() => {
    setUsername(username.replace(/[^a-z0-9]/g, ""));
}, [setUsername, username]);


  useEffect(() => {
    setUsername("");
    setPassword("");
  },[setUsername, setPassword]);
  
  return (
    <main className="login-container">
      <form
        className="login-form"
        onSubmit={(event) => handleLogin(event, username, password, setPassword, authLogin, trustDevice, navigate)}>
        <h2>Login</h2>
        <div className="input-container">
          <input
            style={{ backgroundColor: "#fff" }}
            type="text"
            id="usernameInput"
            className={`input-field ${username ? "input-filled" : ""}`}
            ref={inputFieldRef}
            placeholder=""
            required
            autoComplete="off"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label
            htmlFor="usernameInput"
            className={`input-label ${focusedInput === "usernameInput" || username ? "input-focused" : ""}`}
          >
            Enter your username
          </label>
        </div>
        <div className="input-container">
          <input
            style={{ backgroundColor: "#fff" }}
            type="password"
            id="passwordInput"
            className={`input-field ${password ? "input-filled" : ""}`}
            ref={passwordFieldRef}
            required
            placeholder=""
            autoComplete="off"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label
            htmlFor="passwordInput"
            className={`input-label ${focusedInput === "passwordInput" || password ? "input-focused" : ""}`}
          >
            Enter your password
          </label>
        </div>
        <button type="submit">Log in</button>
        <section className="no-account">
          <p>
          &nbsp;No account?
            <Link className="signup-link" to={"/signup"}>Sign up here.</Link>
          </p>
        </section>
        <div className="trustDevice">
          <input
            type="checkbox"
            id="trustDevice"
            checked={trustDevice}
            onChange={(event) => setTrustDevice(event.target.checked)}
          />
          
          <label htmlFor="trustDevice">Keep me logged in</label>
        </div>
      </form>
    </main>
  );
};

export default Login;