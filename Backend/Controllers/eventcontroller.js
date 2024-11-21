const Event = require("../Modules/Events");

const CreateEvent = async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      image: req.body.imageUrl, // This will come from uploadthing
    };

    const event = new Event(eventData);
    const savedEvent = await event.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: error.message });
  }
};

// Controller to get a single event by ID
const GetEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all events
const GetAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update an event by ID
const UpdateEvent = async (req, res) => {
  try {
    const { title, description, date, location, time, category, image } =
      req.body;
    const event = await Event.findByIdAndUpdate(
      req.params.eventId,
      { title, description, date, location, time, category, image },
      { new: true, runValidators: true } // Added runValidators to enforce schema validation
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete an event by ID
const DeleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  CreateEvent,
  GetEvent,
  GetAllEvents,
  UpdateEvent,
  DeleteEvent,
};
