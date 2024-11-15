// routes/userRoutes.js
const express = require('express');
const { User } = require('../models/user.js');  // Import User model

const router = express.Router();

// Route to create a new user (could be Company, Client, or Admin)
router.post('/', async (req, res) => {
  const { email, phoneNumber, paymentNumber, type, companyName, govClearance, clientName, adminName } = req.body;

  try {
    // Create a new user with the appropriate attributes based on the type
    const newUser = await User.create({
      email,
      phoneNumber,
      paymentNumber,
      type,  // This will differentiate between Company, Client, Admin
      companyName: type === 'Company' ? companyName : null,
      govClearance: type === 'Company' ? govClearance : null,
      clientName: type === 'Client' ? clientName : null,
      adminName: type === 'Admin' ? adminName : null,
    });

    res.status(201).json(newUser);  // Return the created user
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create user' });
  }
});

// Route to get all users with their child details (Company, Client, Admin)
router.get('/', async (req, res) => {
  try {
    // Fetch all users and include relevant fields based on user type
    const usersWithDetails = await User.findAll();
    res.json(usersWithDetails);  // Return users with their fields
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch users' });
  }
});

module.exports = router;
