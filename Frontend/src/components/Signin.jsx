import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const setAuth = ({ username, token}) => {
    localStorage.setItem("token",token)
    console.log(username );
    console.log(token);
};
const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      const data = await response.json();
      const { name, token } = data;

      // Update authentication context with user information
      setAuth({ username: name, token: token });

      // Clear form fields
      setUsername("");
      setPassword("");

      // Navigate user to the home page
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="App">
      <h2>Sign In</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
