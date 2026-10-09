const Registration = require('../models/Registration');
const Event = require('../models/Event');

exports.registerForEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ success: false, message: 'Event ID is required.' });
    }

    const event = await Event.getById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    // 1. Prevent duplicate registration
    const existingReg = await Registration.findByUserAndEvent(userId, eventId);
    if (existingReg) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this event.'
      });
    }

    // 2. Prevent registration after deadline
    const now = new Date();
    const deadline = new Date(event.registration_deadline);
    if (deadline < now) {
      return res.status(400).json({
        success: false,
        message: 'Registration is closed. The registration deadline for this event has passed.'
      });
    }

    // 3. Prevent registration when full
    if (event.registered_count >= event.max_participants) {
      return res.status(400).json({
        success: false,
        message: 'Registration is full. No available seats remaining for this event.'
      });
    }

    // Create registration
    const registrationId = await Registration.create(userId, eventId);

    res.status(201).json({
      success: true,
      message: `Successfully registered for "${event.title}"!`,
      registrationId
    });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ success: false, message: 'Server error during registration process.' });
  }
};

exports.cancelRegistration = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;

    const existingReg = await Registration.findByUserAndEvent(userId, eventId);
    if (!existingReg) {
      return res.status(404).json({
        success: false,
        message: 'Active registration for this event was not found.'
      });
    }

    await Registration.cancel(userId, eventId);

    res.json({
      success: true,
      message: 'Your registration has been cancelled successfully.'
    });
  } catch (error) {
    console.error('Error cancelling registration:', error);
    res.status(500).json({ success: false, message: 'Server error cancelling registration.' });
  }
};

exports.getUserRegistrations = async (req, res) => {
  try {
    const userId = req.user.id;
    const registrations = await Registration.getUserRegistrations(userId);
    res.json({
      success: true,
      count: registrations.length,
      registrations
    });
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve registrations.' });
  }
};

// Admin Endpoints
exports.getAllParticipants = async (req, res) => {
  try {
    const { search, eventId } = req.query;
    const participants = await Registration.getAllParticipants({ search, eventId });
    res.json({
      success: true,
      count: participants.length,
      participants
    });
  } catch (error) {
    console.error('Error fetching participants:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve participants list.' });
  }
};

exports.getParticipantDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Registration.getParticipantDetails(id);
    if (!participant) {
      return res.status(404).json({ success: false, message: 'Participant record not found.' });
    }
    res.json({ success: true, participant });
  } catch (error) {
    console.error('Error fetching participant details:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve participant details.' });
  }
};

exports.removeParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Registration.getParticipantDetails(id);
    if (!participant) {
      return res.status(404).json({ success: false, message: 'Participant record not found.' });
    }

    await Registration.deleteById(id);

    res.json({
      success: true,
      message: `Participant registration for ${participant.user_name} (${participant.event_title}) has been removed.`
    });
  } catch (error) {
    console.error('Error removing participant:', error);
    res.status(500).json({ success: false, message: 'Server error removing participant.' });
  }
};
