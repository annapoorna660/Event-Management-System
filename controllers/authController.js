const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../config/jwt');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Form validations
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const assignedRole = role === 'admin' ? 'admin' : 'user';

    const userId = await User.create({
      name,
      email,
      password: hashedPassword,
      role: assignedRole
    });

    const newUser = { id: userId, name, email, role: assignedRole };
    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: newUser
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    const token = generateToken(userPayload);

    res.json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: userPayload
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching profile.' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required.' });
    }

    // Check email uniqueness if changed
    if (email !== req.user.email) {
      const existing = await User.findByEmail(email);
      if (existing) {
        return res.status(400).json({ success: false, message: 'Email address is already in use.' });
      }
    }

    await User.update(req.user.id, { name, email });
    const updatedUser = { ...req.user, name, email };
    const token = generateToken(updatedUser);

    res.json({
      success: true,
      message: 'Profile updated successfully!',
      user: updatedUser,
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating profile.' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
    }

    const user = await User.findByEmail(req.user.email);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.updatePassword(req.user.id, hashed);

    res.json({ success: true, message: 'Password updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating password.' });
  }
};
