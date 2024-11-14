import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background text-foreground">
      <div className="flex flex-col justify-center lg:w-1/2 p-8">
        <h1 className="text-4xl font-semibold text-purple-400 mb-4 tracking-tight">
          Celebrate, Connect and Create Your Events with Eventify
        </h1>
        <p className="text-gray-light mb-8 leading-relaxed">
          Discover Eventify, the premier platform for celebrating, connecting,
          and creating memorable events. Our comprehensive suite of tools
          simplifies event planning, allowing you to focus on what truly matters
          – enjoying your event. From seamless coordination to beautiful design
          options, Eventify transforms your vision into reality with just a few
          clicks.
        </p>
        <Link to="/create-event">
          <button className="w-full p-3 bg-purple-500 text-foreground font-semibold rounded-lg hover:bg-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
            Get Started
          </button>
        </Link>
      </div>
      <div className="lg:w-1/2 h-full relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1614054111655-10c58a264433?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Eventify"
          className="object-cover w-full h-full brightness-90"
        />
      </div>
    </div>
  );
}

export default Homepage;
