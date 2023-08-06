import { useEffect, useState, useRef } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { handleSignUp } from "../utils/";
import { useInputFocus } from "../hooks";

const SignUp = () => {
  const { username } = useStoreState((state) => state.auth);
  const { authRegister, setUsername } = useStoreActions((actions) => actions.auth);
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate();
  
  const { focusedInput } = useInputFocus();
  const inputFieldRef = useRef(null);
  const passwordFieldRef = useRef(null);
  const confirmFieldRef = useRef(null);

  useEffect(() => {
    setUsername(username.replace(/[^a-z0-9]/g, ""));
}, [setUsername, username ]);

  useEffect(() => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  },[setUsername, setPassword, setConfirmPassword]);

  return (
    <main className="login-container">
      <form
        className="login-form"
        onSubmit={(event) => handleSignUp(event, username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, authRegister, toast, navigate)}
      >
        <h2>Sign Up</h2>
        <div className="input-container">
          <input
          style={{backgroundColor:"#fff"}}
            type="text"
            id="usernameInput"
            className={`input-field ${username ? 'input-filled' : ''}`}
            ref={inputFieldRef}
            placeholder=""
            required
            autoComplete="off"
            value={username.toLowerCase()}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="usernameInput"
          className={`input-label ${focusedInput === "usernameInput" || username ? "input-focused" : ""}`}
          >
            Enter your username
          </label>
        </div>
        <div className="input-container">
          <input
          style={{backgroundColor:"#fff"}}
            type="password"
            id="passwordInput"
            className={`input-field ${password ? 'input-filled' : ''}`}
            ref={passwordFieldRef}
            placeholder=""
            required
            autoComplete="off"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor="passwordInput"
          className={`input-label ${focusedInput === "passwordInput" || password ? "input-focused" : ""}`}

           >
            Enter your password
          </label>
        </div>
              <div className="input-container">
          <input
          style={{backgroundColor:"#fff"}}
            type="password"
            id="confirmInput"
            className={`input-field ${password ? 'input-filled' : ''}`}
            ref={confirmFieldRef}
            placeholder=""
            required
            autoComplete="off"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <label htmlFor="confirmInput"
          className={`input-label ${focusedInput === "confirmInput" || confirmPassword ? "input-focused" : ""}`}

           >
            Confirm password
          </label>
        </div>
        <button type="submit">Sign up</button>
        <section className="no-account">
          <p>
            Have an account?
            <Link className="signup-link" to={"/login"}>
              Log in.
            </Link>
          </p>
        </section>
      </form>
    </main>
  );
};

export default SignUp;