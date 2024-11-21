import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
import apiClient from "../api/apiClient";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, refreshAccessToken } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get("/events/get-events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated]);

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await apiClient.delete(`/events/delete/${eventId}`);
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
