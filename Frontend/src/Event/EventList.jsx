import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to refresh the token using refreshToken
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      alert("You need to be logged in to refresh the token.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/refresh-token", // Your backend endpoint for refreshing the token
        { refreshToken }
      );
      const { token, refreshToken: newRefreshToken } = response.data;

      // Store the new tokens
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", newRefreshToken);

      console.log("Tokens refreshed.");
      return token; // Return the refreshed token
    } catch (error) {
      console.error("Error refreshing token:", error);
      alert("Failed to refresh token. Please log in again.");
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      let token = localStorage.getItem("token");

      // Check if token exists and is still valid
      if (!token) {
        token = await refreshAccessToken(); // Refresh token if not available
      }

      if (!token) {
        alert("You need to be logged in to view events.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/events/get-events",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the token here
            },
          }
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [navigate]);

  const handleDelete = async (eventId) => {
    let token = localStorage.getItem("token");

    // Check if token exists and is still valid
    if (!token) {
      token = await refreshAccessToken(); // Refresh token if not available
    }

    if (!token) {
      alert("You need to be logged in to delete the event.");
      navigate("/login");
      return;
    }

    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:3000/events/delete/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token here
          },
        });
        setEvents(events.filter((event) => event._id !== eventId));
        alert("Event deleted successfully.");
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete the event.");
      }
    }
  };

  const handleViewDetails = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex justify-center items-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-bold text-purple-400 mb-4 text-center">
          Discover Amazing Events
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-primary rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => handleViewDetails(event._id)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image || "/api/placeholder/400/320"}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-purple-400 mb-2">
                  {event.title}
                </h2>
                <p className="text-gray-light mb-4">{event.description}</p>

                <button
                  className="text-red-500 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(event._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;
