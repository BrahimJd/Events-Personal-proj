const Event = require("../Modules/Events");
const { eventValidationSchema } = require("../Helpers/validation");

const CreateEvent = async (req, res) => {
  try {
    // Validate input
    const validatedData = await eventValidationSchema.validateAsync(req.body);
    
    const eventData = {
      ...validatedData,
      image: req.body.imageUrl,
      createdBy: req.user.id, // Add user who created the event
    };

    const event = new Event(eventData);
    const savedEvent = await event.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error creating event:", error.message);
    if (error.isJoi === true) {
      return res.status(400).json({ error: error.details[0].message });
    }
    res.status(500).json({ error: "Failed to create event" });
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
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user owns the event
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own events" });
    }

    const { title, description, date, location, time, category, image } =
      req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      { title, description, date, location, time, category, image },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete an event by ID
const DeleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user owns the event
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own events" });
    }

    await Event.findByIdAndDelete(req.params.eventId);
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
