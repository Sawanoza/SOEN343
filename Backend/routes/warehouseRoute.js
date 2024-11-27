const express = require('express');
const Warehouse = require('../models/warehouse'); // Assuming the Warehouse model is in models/Warehouse.js

const router = express.Router();

// CREATE: Add a new warehouse
router.post('/', async (req, res) => {
  try {
    const { location, capacity, status } = req.body;

    if (!location || !capacity || !status) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newWarehouse = await Warehouse.create({
      location,
      capacity,
      status,
    });

    res.status(201).json(newWarehouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create warehouse.' });
  }
});

// READ: Get all warehouses
router.get('/', async (req, res) => {
  try {
    const warehouses = await Warehouse.findAll();
    res.json(warehouses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch warehouses.' });
  }
});

// READ: Get a single warehouse by ID
router.get('/:warehouseId', async (req, res) => {
  try {
    const { warehouseId } = req.params;
    const warehouse = await Warehouse.findOne({ where: { warehouseId } });

    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found.' });
    }

    res.json(warehouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch warehouse.' });
  }
});

// UPDATE: Update a warehouse's details
router.put('/:warehouseId', async (req, res) => {
  try {
    const { warehouseId } = req.params;
    const { location, capacity, status } = req.body;

    const warehouse = await Warehouse.findOne({ where: { warehouseId } });

    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found.' });
    }

    if (location) warehouse.location = location;
    if (capacity) warehouse.capacity = capacity;
    if (status) warehouse.status = status;

    await warehouse.save();

    res.json(warehouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update warehouse.' });
  }
});

// DELETE: Delete a warehouse
router.delete('/:warehouseId', async (req, res) => {
  try {
    const { warehouseId } = req.params;
    const warehouse = await Warehouse.findOne({ where: { warehouseId } });

    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found.' });
    }

    await warehouse.destroy();

    res.status(204).send(); // No content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete warehouse.' });
  }
});

module.exports = router;
