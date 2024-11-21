import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-background border-b border-primary">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          className="flex title-font font-medium items-center text-foreground mb-4 md:mb-0"
          to="/"
        >
          <span className="ml-3 text-xl font-bold font-serif uppercase tracking-wider hover:text-purple-400 active:text-purple-500 transition duration-100 cursor-pointer select-none">
            Eventify
          </span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link
            to="/events"
            className="mr-5 text-gray-light hover:text-purple-400 transition duration-200"
          >
            Events
          </Link>
          <Link
            to="/news"
            className="mr-5 text-gray-light hover:text-purple-400 transition duration-200"
          >
            News
          </Link>
          <Link
            to="/create-event"
            className="mr-5 text-gray-light hover:text-purple-400 transition duration-200"
          >
            Create Event
          </Link>
        </nav>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="inline-flex items-center bg-purple-500 border-0 py-2 px-4 focus:outline-none hover:bg-purple-600 rounded-lg text-foreground mt-4 md:mt-0 ml-5 transition duration-200 shadow-lg hover:shadow-purple-500/25"
          >
            Log Out
          </button>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center bg-purple-500 border-0 py-2 px-4 focus:outline-none hover:bg-purple-600 rounded-lg text-foreground mt-4 md:mt-0 ml-5 transition duration-200 shadow-lg hover:shadow-purple-500/25"
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  );
};

export default NavBar;
