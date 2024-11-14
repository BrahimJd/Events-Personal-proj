/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";

function LoginForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    if (user.email === "") {
      alert("Please fill all the fields");
      return;
    }
    if (!user.email.includes("@")) {
      alert("Invalid email address");
      return;
    }
    try {
      const response = await apiClient.post("/auth/login", user);
      if (response.status === 200) {
        const accessToken = response.data.accesstoken;
        const refreshToken = response.data.refreshToken;
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          console.log("Access token saved:", accessToken);
        } else {
          console.error("Access token not found in response");
        }
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
          console.log("Refresh token saved:", refreshToken);
        } else {
          console.error("Refresh token not found in response");
        }
      }
      alert("Login successful");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background text-foreground">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-semibold text-purple-400 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-light mb-8">Login to your account</p>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 bg-background border border-purple-400/20 rounded-lg focus:outline-none focus:border-purple-400 transition-all"
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 bg-background border border-purple-400/20 rounded-lg focus:outline-none focus:border-purple-400 transition-all"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full p-3 bg-purple-500 text-foreground font-semibold rounded-lg hover:bg-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Login
            </button>
          </form>
          <p className="text-gray-light mt-6 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-400 hover:text-purple-500 transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1574540361784-f90b16ac3aae?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="h-full w-full object-cover brightness-90"
          alt="login-image"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10 lg:block hidden" />
      </div>
    </div>
  );
}

export default LoginForm;
