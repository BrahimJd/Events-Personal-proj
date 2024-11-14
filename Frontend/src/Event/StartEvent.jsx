import React, { useState } from "react";
import axios from "axios";

function StartEvent() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    image: null, // Changed to hold file object
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEvent({ ...event, [name]: files[0] }); // Update image with file object
    } else {
      setEvent({ ...event, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      event.title === "" ||
      event.description === "" ||
      event.date === "" ||
      event.time === "" ||
      event.location === "" ||
      event.category === ""
    ) {
      alert("Please fill all the fields except the image.");
      return;
    }

    // Image validation
    if (event.image && !event.image.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", event.title);
    formData.append("description", event.description);
    formData.append("date", event.date);
    formData.append("time", event.time);
    formData.append("location", event.location);
    formData.append("category", event.category);
    if (event.image) {
      formData.append("image", event.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/events/event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        alert("Event created successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Error creating event: " + error.response?.data?.error);
    }
  };

  const { title, description, date, time, location, category, image } = event;

  return (
    <div className="min-h-screen flex justify-center items-center bg-background text-foreground py-12">
      <div className="max-w-screen-xl px-4 md:px-8 w-full">
        <section className="flex flex-col lg:flex-row bg-primary rounded-lg shadow-lg overflow-hidden">
          {/* Left Side - Form */}
          <div className="lg:w-2/3 p-8 sm:p-10">
            <h1 className="text-3xl font-bold text-purple-400 mb-6 md:text-4xl">
              Start Your Event Journey
            </h1>
            <p className="text-gray-light mb-8 leading-relaxed">
              Fill in the details below to create your amazing event. Make it
              memorable!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-light mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-light mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    placeholder="Enter location"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-light mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none h-32"
                  placeholder="Describe your event"
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
                    value={date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-light mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-light mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                >
                  <option value="">Select category</option>
                  <option value="Music">Music</option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Health">Health</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-light mb-2">
                  Image (Optional)
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />
              </div>

              {image && (
                <div>
                  <p className="text-sm font-semibold text-gray-light mb-2">
                    Image Preview:
                  </p>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Event Preview"
                    className="h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full p-3 bg-purple-500 text-foreground font-semibold rounded-lg hover:bg-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Create Event
              </button>
            </form>
          </div>

          {/* Right Side - Image */}
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
