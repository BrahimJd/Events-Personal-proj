import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
      alert("Password must be atleast 6 characters long");
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
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        user
      );
      if (response.status === 200) {
        alert("User logged in successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      <div className="w-full xl:w-3/4 lg:w-11/12 flex">
        <div className="w-full h-auto bg-white flex flex-col justify-center items-center">
          <span className="text-4xl font-semibold text-indigo-500">
            Welcome back
          </span>
          <span className="text-gray-600">Login to your account</span>
          <form className="w-3/4 flex flex-col mt-8 gap-4">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full p-2 bg-indigo-500 text-white font-semibold rounded-md"
            >
              Login
            </button>
          </form>
          <span className="text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-500">
              Register
            </Link>
          </span>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1574540361784-f90b16ac3aae?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="h-full w-full object-cover"
          alt="login-image"
        />
      </div>
    </div>
  );
}

export default LoginForm;
