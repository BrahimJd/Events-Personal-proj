import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisterForm() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password.length < 6) {
      alert("Password must be atleast 6 characters long");
      return;
    }
    if (user.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (user.firstName === "" || user.lastName === "" || user.email === "") {
      alert("Please fill all the fields");
      return;
    }
    if (!user.email.includes("@")) {
      alert("Invalid email address");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        user
      );
      if (response.status === 201) {
        alert("User registered successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { firstName, lastName, email, password } = user;

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1586893079425-9285c7fd5dc1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="h-full w-full object-cover"
          alt="register-image"
        />
      </div>
      <div className="w-full xl:w-3/4 lg:w-11/12 flex">
        <div className="w-full h-auto bg-white flex flex-col justify-center items-center">
          <span className="text-4xl font-semibold text-indigo-500">
            Welcome to Eventify🎉
          </span>
          <span className="text-gray-600">
            Create an account to get started
          </span>
          <form className="w-3/4 flex flex-col mt-8 gap-4">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full p-2 bg-indigo-500 text-white font-semibold rounded-md"
            >
              Register
            </button>
          </form>
          <span className="text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
