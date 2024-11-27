const express = require('express');
const Transporter = require('../models/transporter'); // Assuming your Transporter model is in models/Transporter.js

const router = express.Router();

// CREATE: Add a new transporter
router.post('/', async (req, res) => {
  try {
    const { name, vehicleType, phoneNumber, actions } = req.body;

    if (!name || !vehicleType || !phoneNumber) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newTransporter = await Transporter.create({
      name,
      vehicleType,
      phoneNumber,
      actions,
    });

    res.status(201).json(newTransporter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create transporter.' });
  }
});

// READ: Get all transporters
router.get('/', async (req, res) => {
  try {
    const transporters = await Transporter.findAll();
    res.json(transporters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch transporters.' });
  }
});

// READ: Get a single transporter by ID
router.get('/:transporterId', async (req, res) => {
  try {
    const { transporterId } = req.params;
    const transporter = await Transporter.findOne({ where: { transporterId } });

    if (!transporter) {
      return res.status(404).json({ error: 'Transporter not found.' });
    }

    res.json(transporter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch transporter.' });
  }
});

// UPDATE: Update a transporter's details
router.put('/:transporterId', async (req, res) => {
  try {
    const { transporterId } = req.params;
    const { name, vehicleType, phoneNumber, actions } = req.body;

    const transporter = await Transporter.findOne({ where: { transporterId } });

    if (!transporter) {
      return res.status(404).json({ error: 'Transporter not found.' });
    }

    if (name) transporter.name = name;
    if (vehicleType) transporter.vehicleType = vehicleType;
    if (phoneNumber) transporter.phoneNumber = phoneNumber;
    if (actions) transporter.actions = actions;

    await transporter.save();

    res.json(transporter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update transporter.' });
  }
});

// DELETE: Delete a transporter
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const transporter = await Transporter.findOne({ where: { id } });

    if (!transporter) {
      return res.status(404).json({ error: 'Transporter not found.' });
    }

    await transporter.destroy();

    res.status(204).send(); // No content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete transporter.' });
  }
});

module.exports = router;
