import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
import { toast } from "react-toastify";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../utils/validation";

function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstNameError = validateName(user.firstName, "First name");
    if (firstNameError) {
      toast.error(firstNameError);
      return;
    }

    const lastNameError = validateName(user.lastName, "Last name");
    if (lastNameError) {
      toast.error(lastNameError);
      return;
    }

    const emailError = validateEmail(user.email);
    if (emailError) {
      toast.error(emailError);
      return;
    }

    const passwordError = validatePassword(user.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    if (user.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);
      await register(user);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full p-3 bg-background border border-purple-400/20 rounded-lg focus:outline-none focus:border-purple-400 transition-all disabled:opacity-50"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full p-3 bg-background border border-purple-400/20 rounded-lg focus:outline-none focus:border-purple-400 transition-all disabled:opacity-50"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full p-3 bg-background border border-purple-400/20 rounded-lg focus:outline-none focus:border-purple-400 transition-all disabled:opacity-50"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full p-3 bg-background border border-purple-400/20 rounded-lg focus:outline-none focus:border-purple-400 transition-all disabled:opacity-50"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              disabled={isSubmitting}
              className="w-full p-3 bg-background border border-purple-400/20 rounded-lg focus:outline-none focus:border-purple-400 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-3 bg-purple-500 text-foreground font-semibold rounded-lg hover:bg-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Registering..." : "Register"}
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
