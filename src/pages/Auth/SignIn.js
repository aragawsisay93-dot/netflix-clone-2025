import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNetflix } from "../../context/NetflixContext";
import "./Auth.css";

export default function SignIn() {
  const { login } = useNetflix();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setError("");

    const result = login(email, password);
    if (!result.ok) return setError(result.message);

    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Sign In</h1>
        <p className="muted">Welcome back.</p>

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
          <button className="auth-btn">Sign In</button>
        </form>

        <p className="muted small">
          New to Netflix? <Link to="/signup">Sign up now</Link>
        </p>
      </div>
    </div>
  );
}
