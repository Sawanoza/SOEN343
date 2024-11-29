const express = require('express');
const Order = require('../models/order'); 

const router = express.Router();

// CREATE: Add a new order
router.post('/', async (req, res) => {
  try {
    const { trackingID, arrivalDate, orderStatus, pin } = req.body;

    if (!trackingID || !arrivalDate || !orderStatus || !pin ) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newOrder = await Order.create({
      trackingID,
      arrivalDate,
      orderStatus,
      pin
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order.' });
  }
});

// READ: Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
});



















// READ: Get a single order by tracking ID
router.get('/:trackingID', async (req, res) => {
  try {
    const { trackingID } = req.params;
    const order = await Order.findOne({ where: { trackingID } });

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch order.' });
  }
});

// UPDATE: Update an order's status or other details
router.put('/:trackingID', async (req, res) => {
  try {
    const { trackingID } = req.params;
    const { orderStatus, arrivalDate, totalCost } = req.body;

    const order = await Order.findOne({ where: { trackingID } });

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (arrivalDate) order.arrivalDate = arrivalDate;

    await order.save();

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update order.' });
  }
});

// DELETE: Delete an order
router.delete('/:trackingID', async (req, res) => {
  try {
    const { trackingID } = req.params;
    const order = await Order.findOne({ where: { trackingID } });

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    await order.destroy();

    res.status(204).send(); // No content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete order.' });
  }
});






module.exports = router;
