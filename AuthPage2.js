import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./auth.css";

const LOGIN_URL = "http://localhost:3010/api/auth/login";
const SIGNUP_URL = "http://localhost:3010/api/auth/signup";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login"); // login or signup

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Signup fields
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupError, setSignupError] = useState("");

  const [toWeatherPage, setToWeatherPage] = useState(false);

  /* ---------------------- LOGIN HANDLER ---------------------- */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Fill in all fields");
      return;
    }

    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) return setLoginError(data.message);

      setToWeatherPage(true);
    } catch (err) {
      setLoginError(err.message);
    }
  };

  /* ---------------------- SIGNUP HANDLER ---------------------- */
  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");

    if (
      !signupEmail ||
      !signupPassword ||
      !signupFirstName ||
      !signupLastName
    ) {
      setSignupError("Fill in all fields");
      return;
    }

    try {
      const res = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fname: signupFirstName,
          lname: signupLastName,
          email: signupEmail,
          password: signupPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) return setSignupError(data.message);

      setToWeatherPage(true);
    } catch (err) {
      setSignupError(err.message);
    }
  };

  /* ---------------------- REDIRECT ---------------------- */
  if (toWeatherPage) {
    return <Navigate to="/weather" />;
  }

  /* ---------------------- UI ---------------------- */

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <span style={{ color: "white", fontSize: "26px", fontWeight: 600 }}>
            W
          </span>
        </div>

        <h2 className="auth-title">Welcome!</h2>
        <p className="auth-subtitle">Please log in or create an account</p>

        {/* Tabs */}
        <div className="auth-tabs">
          <div
            className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </div>
          <div
            className={`auth-tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </div>
        </div>

        {/* ------------------- LOGIN FORM ------------------- */}
        {activeTab === "login" && (
          <form className="auth-form" onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              className="auth-input"
              onChange={(e) => setLoginEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              className="auth-input"
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            <button className="auth-btn" type="submit">
              Login
            </button>

            {loginError && <p className="auth-error">{loginError}</p>}
          </form>
        )}

        {/* ------------------- SIGNUP FORM ------------------- */}
        {activeTab === "signup" && (
          <form className="auth-form" onSubmit={handleSignup}>
            <label>First Name</label>
            <input
              type="text"
              className="auth-input"
              onChange={(e) => setSignupFirstName(e.target.value)}
            />

            <label>Last Name</label>
            <input
              type="text"
              className="auth-input"
              onChange={(e) => setSignupLastName(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              className="auth-input"
              onChange={(e) => setSignupEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              className="auth-input"
              onChange={(e) => setSignupPassword(e.target.value)}
            />

            <button className="auth-btn" type="submit">
              Create Account
            </button>

            {signupError && <p className="auth-error">{signupError}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
