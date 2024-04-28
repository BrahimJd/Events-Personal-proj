const Event = require("../Modules/Events");

// Controller to create an event
const CreateEvent = async (req, res) => {
  try {
    const { title, description, date, location, capacity } = req.body;
    const event = new Event({
      title,
      description,
      date,
      location,
      capacity,
    });
    const result = await event.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get a single event by ID
const GetEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
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
    const { title, description, date, location, capacity } = req.body;
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date, location, capacity },
      { new: true }
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
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { CreateEvent, GetEvent, GetAllEvents, UpdateEvent, DeleteEvent };
