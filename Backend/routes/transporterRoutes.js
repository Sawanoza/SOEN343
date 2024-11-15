// routes/transportRoutes.js
const express = require('express');
const Transporter = require('../models/transporter.js');  // Import Transport model

const router = express.Router();

// Route to get all transports
router.get('/', async (req, res) => {
  try {
    const transports = await Transporter.findAll();  // Get all transporters
    res.json(transports);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch transports' });
  }
});

// Route to get a specific transport by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const transport = await Transport.findByPk(id);  // Find transporter by primary key (id)
    if (!transport) {
      return res.status(404).json({ error: 'Transporter not found' });
    }
    res.json(transport);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch transporter' });
  }
});

// Route to create a new transport
router.post('/', async (req, res) => {
  const { lat, long, batteryLevel, type, status, altitude } = req.body;
  try {
    const newTransporter = await Transporter.create({
      lat,
      long,
      batteryLevel,
      type,
      status,
      altitude
    });
    res.status(201).json(newTransporter);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create transporter' });
  }
});

module.exports = router;
