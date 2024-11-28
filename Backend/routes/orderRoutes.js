const express = require('express');
const Order = require('../models/order'); 
const nodemailer = require('nodemailer');

const router = express.Router();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-password',       // Replace with your email password
  },
});

// CREATE: Add a new order and send a confirmation email
router.post('/', async (req, res) => {
  try {
    const { trackingID, arrivalDate, orderStatus, email } = req.body;

    if (!trackingID || !arrivalDate || !orderStatus || !email) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newOrder = await Order.create({
      trackingID,
      arrivalDate,
      orderStatus,
      email,
      status: 'created', // Default status
    });

    // Send a confirmation email with a link
    const confirmationLink = `http://localhost:3000/confirm-order/${trackingID}`;
    await transporter.sendMail({
      to: email,
      subject: 'Order Confirmation',
      html: `
        <p>Your order has been created!</p>
        <p>Tracking ID: <strong>${trackingID}</strong></p>
        <p><a href="${confirmationLink}">Click here to confirm reception of order</a></p>
      `,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order.' });
  }
});

// CONFIRM: Confirm order reception
router.post('/confirm-order', async (req, res) => {
  try {
    const { trackingID, inputID } = req.body;

    if (!trackingID || !inputID) {
      return res.status(400).json({ error: 'Both tracking ID and input ID are required.' });
    }

    const order = await Order.findOne({ where: { trackingID } });

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    if (trackingID !== inputID) {
      return res.status(400).json({ error: 'Tracking ID does not match.' });
    }

    // Update the order status
    order.status = 'dropped-off';
    await order.save();

    // Send a follow-up email
    await transporter.sendMail({
      to: order.email,
      subject: 'Order Dropped Off',
      html: `
        <p>Your order has been successfully dropped off!</p>
        <p>Tracking ID: <strong>${trackingID}</strong></p>
      `,
    });

    // Send a response
    res.status(200).json({ message: 'Order confirmed and dropped off.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to confirm order.' });
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
    const { orderStatus, arrivalDate } = req.body;

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
