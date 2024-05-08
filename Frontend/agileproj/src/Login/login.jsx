import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css"; // Make sure to import your CSS file if you have any styles specific to this component

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      if (response.status !== 200) {
        alert("An error occurred. Please try again.");
        return;
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper">
      <form className="form-signin">
        <h2 className="form-signin-heading">Please login</h2>
        <input
          type="text"
          className="form-control"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={handleEmailChange}
          required=""
          autoFocus=""
        />
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required=""
        />
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              value="remember-me"
              id="rememberMe"
              name="rememberMe"
            />{" "}
            Remember me
          </label>
        </div>
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </button>
        <p className="register-link">
          Dont have an account? <Link to="/register">Register now</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
