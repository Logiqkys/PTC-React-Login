import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("viewer"); // Role state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate();

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const parent = e.target.parentNode as HTMLElement;
    const grandparent = parent?.parentNode as HTMLElement;
    grandparent?.classList.add("focus");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const parent = e.target.parentNode as HTMLElement;
    const grandparent = parent?.parentNode as HTMLElement;
    if (e.target.value === "") {
      grandparent?.classList.remove("focus");
    }
  };

  const validatePassword = (password: string): boolean => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters, include an uppercase letter, lowercase letter, number, and special character."
      );
      return;
    }

    // Redirect based on selected role
    if (role === "viewer") {
      navigate("/viewer");
    } else if (role === "editor") {
      navigate("/editor");
    }
  };

  return (
    <div>
      <img
        className="wave"
        src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/wave.png"
        alt="wave"
      />
      <div className="container">
        <div className="img">
          <img
            src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/bg.svg"
            alt="background"
          />
        </div>
        <div className="login-content">
          <form onSubmit={handleSubmit} className="login-box">
            <div className="animated-border">
              <img
                src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"
                alt="avatar"
              />
              <h2 className="title">Login</h2>
              <div className="input-div one">
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <h5>Username</h5>
                  <input
                    type="text"
                    className="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    pattern="^[a-zA-Z][a-zA-Z0-9_]{4,20}$"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                  <h5>Password</h5>
                  <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>
              <div className="role-selector">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="viewer"
                    checked={role === "viewer"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Viewer
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="editor"
                    checked={role === "editor"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Editor
                </label>
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <input type="submit" className="btn" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
