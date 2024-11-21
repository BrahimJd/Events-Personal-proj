import React, { useState } from "react";
import { useAuth } from "../api/AuthContext";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "../../utils/uploadthing";
import { toast } from "react-toastify";

function StartEvent() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { startUpload, isUploading } = useUploadThing("eventImage", {
    onUploadError: (error) => {
      console.error("Upload error:", error);
      toast.error("Failed to upload image" + error.message);
    },
    onUploadBegin: () => {
      console.log("Upload starting...");
    },
    onClientUploadComplete: (res) => {
      console.log("Upload completed:", res);
      if (res?.[0]?.url) {
        setEvent((prev) => ({
          ...prev,
          imageUrl: res[0].url,
        }));
        toast.success("Image uploaded successfully");
      }
    },
  });

  const onDrop = async (acceptedFiles) => {
    try {
      console.log("Uploading files:", acceptedFiles);
      const result = await startUpload(acceptedFiles);
      console.log("Upload result:", result);
    } catch (err) {
      console.error("Drop error:", err);
      toast.error("Failed to upload image: " + err.message);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    maxSize: 4 * 1024 * 1024,
    onDrop,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!isAuthenticated) {
        toast.error("You must be logged in to create an event.");
        navigate("/login");
        return;
      }

      // Validate required fields
      const required = [
        "title",
        "description",
        "date",
        "time",
        "location",
        "category",
      ];
      const missing = required.filter((field) => !event[field]);

      if (missing.length > 0) {
        toast.error(
          `Please fill in all required fields: ${missing.join(", ")}`
        );
      }

      const response = await apiClient.post("/events/event", {
        ...event,
        image: event.imageUrl, // Send image URL instead of file
      });

      if (response.status === 201) {
        toast.success("Event created successfully");
        navigate("/events");
      }
    } catch (error) {
      console.error("Event creation error:", error);
      if (error.response?.status === 403) {
        toast.error("You don't have permission to create events");
      } else {
        toast.error(error.response?.data?.message || "Failed to create event");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background text-foreground py-12">
      <div className="max-w-screen-xl px-4 md:px-8 w-full">
        <section className="flex flex-col lg:flex-row bg-primary rounded-lg shadow-lg overflow-hidden">
          <div className="lg:w-2/3 p-8 sm:p-10">
            <h1 className="text-3xl font-bold text-purple-400 mb-6 md:text-4xl">
              Start Your Event Journey
            </h1>
            <p className="text-gray-light mb-8 leading-relaxed">
              Fill in the details below to create your amazing event. Make it
              memorable!
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-light mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    placeholder="Enter event title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-light mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={event.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    placeholder="Enter location"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-light mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={event.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none h-32"
                  placeholder="Describe your event"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-light mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={event.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-light mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={event.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-light mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={event.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Music">Music</option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Art">Art</option>
                  <option value="Sports">Sports</option>
                  <option value="Science">Science</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-light mb-2">
                  Image (Optional)
                </label>
                <div
                  {...getRootProps()}
                  className="w-full px-4 py-2 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none cursor-pointer"
                >
                  <input {...getInputProps()} />
                  {isUploading ? (
                    <div className="flex items-center justify-center">
                      <p className="text-purple-400">Uploading...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-light text-sm">
                        Drag & drop an image here, or click to select
                      </p>
                      <p className="text-gray-light text-xs mt-2">
                        (Max size: 4MB - JPG, PNG, GIF)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {event.imageUrl && (
                <div>
                  <p className="text-sm font-semibold text-gray-light mb-2">
                    Image Preview:
                  </p>
                  <img
                    src={event.imageUrl}
                    alt="Event Preview"
                    className="h-48 w-full object-cover rounded-lg"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading || isUploading}
                className="w-full p-3 bg-purple-500 text-foreground font-semibold rounded-lg 
                         hover:bg-purple-600 transition-all duration-300 shadow-lg 
                         hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Event..." : "Create Event"}
              </button>
            </form>
          </div>

          <div className="lg:w-1/3 relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-l from-primary to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Event Creation"
              className="h-full w-full object-cover object-center brightness-90"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
export default StartEvent;
