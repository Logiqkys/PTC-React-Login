import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages
  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters, include an uppercase letter, lowercase letter, number, and special character."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Login successful!");
        console.log("User details:", data.user);

        // Redirect based on role
        if (data.user.role === "viewer") {
          navigate("/viewer"); // Redirect to ViewerPage
        } else if (data.user.role === "editor") {
          navigate("/editor"); // Redirect to EditorPage
        }
      } else {
        setErrorMessage(
          data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred. Please try again later.");
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
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}
              <a href="#">Register a new account</a>
              <input type="submit" className="btn" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
