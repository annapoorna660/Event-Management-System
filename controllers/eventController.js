const Event = require('../models/Event');
const Registration = require('../models/Registration');

exports.getAllEvents = async (req, res) => {
  try {
    const { search, category, dateFilter, statusFilter } = req.query;
    const events = await Event.getAll({ search, category, dateFilter, statusFilter });
    res.json({ success: true, count: events.length, events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve events.' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.getById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    // If user is authenticated, check registration status for this user
    let isUserRegistered = false;
    if (req.user) {
      const reg = await Registration.findByUserAndEvent(req.user.id, id);
      isUserRegistered = !!reg;
    }

    res.json({
      success: true,
      event,
      isUserRegistered
    });
  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve event details.' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      venue,
      organizer,
      category,
      max_participants,
      registration_deadline,
      image
    } = req.body;

    // Form Validations
    if (!title || !description || !date || !time || !venue || !organizer || !category || !max_participants || !registration_deadline) {
      return res.status(400).json({ success: false, message: 'Please fill in all required event fields.' });
    }

    if (parseInt(max_participants, 10) <= 0) {
      return res.status(400).json({ success: false, message: 'Maximum participants must be greater than 0.' });
    }

    const eventId = await Event.create({
      title,
      description,
      date,
      time,
      venue,
      organizer,
      category,
      max_participants: parseInt(max_participants, 10),
      registration_deadline,
      image
    });

    const newEvent = await Event.getById(eventId);

    res.status(201).json({
      success: true,
      message: 'Event created successfully!',
      event: newEvent
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ success: false, message: 'Server error while creating event.' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Event.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    const {
      title,
      description,
      date,
      time,
      venue,
      organizer,
      category,
      max_participants,
      registration_deadline,
      image
    } = req.body;

    if (!title || !description || !date || !time || !venue || !organizer || !category || !max_participants || !registration_deadline) {
      return res.status(400).json({ success: false, message: 'Please fill in all required event fields.' });
    }

    if (parseInt(max_participants, 10) < existing.registered_count) {
      return res.status(400).json({
        success: false,
        message: `Maximum participants cannot be less than current registered count (${existing.registered_count}).`
      });
    }

    await Event.update(id, {
      title,
      description,
      date,
      time,
      venue,
      organizer,
      category,
      max_participants: parseInt(max_participants, 10),
      registration_deadline,
      image: image || existing.image
    });

    const updatedEvent = await Event.getById(id);

    res.json({
      success: true,
      message: 'Event updated successfully!',
      event: updatedEvent
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ success: false, message: 'Server error while updating event.' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Event.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    await Event.delete(id);

    res.json({
      success: true,
      message: `Event "${existing.title}" deleted successfully.`
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ success: false, message: 'Server error while deleting event.' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Event.getCategories();
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories.' });
  }
};
