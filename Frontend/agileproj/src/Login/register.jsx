import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./register.css";

function RegisterForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        username: fullname,
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
        <h2 className="form-signin-heading">Create an Account</h2>
        <input
          type="text"
          className="form-control"
          name="fullname"
          placeholder="Full Name"
          value={fullname}
          onChange={handleFullnameChange}
          required=""
          autoFocus=""
        />
        <input
          type="text"
          className="form-control"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={handleEmailChange}
          required=""
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
        <input
          type="password"
          className="form-control"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required=""
        />
        <br />
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          onClick={handleSubmit}
        >
          Register
        </button>
        <p className="login-link">
          <Link to="/login">Back to login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
