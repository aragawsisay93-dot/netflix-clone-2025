import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNetflix } from "../../context/NetflixContext";
import "./Auth.css";

export default function SignUp() {
  const { signup } = useNetflix();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) return setError("Enter a valid email address.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");

    signup(email, password);
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Sign Up</h1>
        <p className="muted">Create your account to start watching.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={submit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <button className="auth-btn">Create Account</button>
        </form>

        <p className="muted small">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
