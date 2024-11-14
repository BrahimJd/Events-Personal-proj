import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiClient.get(`/events/get-event/${eventId}`);
        setEvent(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError(
          error.response?.data?.message || "Failed to load event details."
        );
        toast.error(
          error.response?.data?.message || "Failed to load event details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to update events");
      navigate("/login");
      return;
    }

    try {
      await apiClient.put(`/events/update/${eventId}`, formData);
      setEvent(formData);
      setIsEditing(false);
      toast.success("Event updated successfully");
    } catch (error) {
      console.error("Error updating event:", error);
      if (error.response?.status === 403) {
        toast.error("You don't have permission to update this event");
      } else {
        toast.error(error.response?.data?.message || "Failed to update event");
      }
    }
  };

  const handleDelete = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to delete events");
      navigate("/login");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      await apiClient.delete(`/events/delete/${eventId}`);
      toast.success("Event deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error);
      if (error.response?.status === 403) {
        toast.error("You don't have permission to delete this event");
      } else {
        toast.error(error.response?.data?.message || "Failed to delete event");
      }
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-error font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="max-w-screen-lg mx-auto bg-primary rounded-lg shadow-lg p-8 space-y-6">
        <div className="relative h-64 mb-6">
          <img
            src={event.image || "/api/placeholder/800/600"}
            alt={event.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {isAuthenticated && (
          <div className="flex justify-between mb-4">
            <button
              className="bg-secondary hover:bg-gray-dark text-foreground px-4 py-2 rounded"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel Edit" : "Edit Event"}
            </button>
            <button
              className="bg-error hover:bg-red-600 text-foreground px-6 py-2 rounded"
              onClick={handleDelete}
            >
              Delete Event
            </button>
          </div>
        )}

        {isEditing ? (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-light rounded bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-light rounded bg-background text-foreground"
                rows="4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-light rounded bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-light rounded bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-light rounded bg-background text-foreground"
              />
            </div>

            <button
              type="button"
              className="bg-accent hover:bg-purple-600 text-foreground px-6 py-2 rounded"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-purple-400 mb-4">
              {event.title}
            </h2>
            <p className="text-gray-light mb-2">{event.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <strong>Category:</strong> {event.category}
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div>
                <strong>Time:</strong> {event.time}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
