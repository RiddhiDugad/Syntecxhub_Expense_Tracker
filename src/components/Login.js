import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      localStorage.setItem(
        "user",
        JSON.stringify({ username, password })
      );
      alert("Signup successful");
      setIsSignup(false);
      setUsername("");
      setPassword("");
    } else {
      const stored = JSON.parse(localStorage.getItem("user"));

      if (
        stored &&
        stored.username === username &&
        stored.password === password
      ) {
        onLogin({ username });
      } else {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? "Already have account? Login"
            : "New user? Sign up"}
        </p>
      </form>
    </div>
  );
}

export default Login;