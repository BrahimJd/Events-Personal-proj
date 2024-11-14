import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";

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
      alert("Password must be at least 6 characters long");
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
      const response = await apiClient.post("/auth/register", user);
      if (response.status === 201) {
        alert("User registered successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { firstName, lastName, email, password } = user;

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background text-foreground">
      <div className="w-full lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1586893079425-9285c7fd5dc1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="h-full w-full object-cover brightness-90"
          alt="register-image"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background to-transparent z-10 lg:block hidden" />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-semibold text-purple-400 mb-2">
            Welcome to Eventify🎉
          </h1>
          <p className="text-gray-light mb-8">
            Create an account to get started
          </p>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              className="w-full p-3 bg-background border border-purple-400/20 rounded-lg focus:outline-none focus:border-purple-400 transition-all"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              className="w-full p-3 bg-background border border-purple-400/20 rounded-lg focus:outline-none focus:border-purple-400 transition-all"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full p-3 bg-background border border-purple-400/20 rounded-lg focus:outline-none focus:border-purple-400 transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full p-3 bg-background border border-purple-400/20 rounded-lg focus:outline-none focus:border-purple-400 transition-all"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              className="w-full p-3 bg-background border border-purple-400/20 rounded-lg focus:outline-none focus:border-purple-400 transition-all"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full p-3 bg-purple-500 text-foreground font-semibold rounded-lg hover:bg-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Register
            </button>
          </form>
          <p className="text-gray-light mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-400 hover:text-purple-500 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
