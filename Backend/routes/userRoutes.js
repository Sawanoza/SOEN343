const express = require('express');
const { User } = require('../models/user.js');
const router = express.Router();

// ==========================================================================================================
// ACCOUNT CREATION
// ==========================================================================================================
router.post('/', async (req, res) => {
  const { email, password, phoneNumber, paymentNumber, type, companyName, clientName, adminName } = req.body;

  try {
    if (!email || !password || !phoneNumber || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newUser = await User.create({
      email,
      password,
      phoneNumber,
      type,  // Will differentiate between Company, Client, Admin
      companyName: type === 'Company' ? companyName : null,
      clientName: type === 'Client' ? clientName : null,
      adminName: type === 'Admin' ? adminName : null,
    });

    res.redirect('/login.html')
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create user' });
  }
});
// ==========================================================================================================



// ==========================================================================================================
// LOGIN
// ==========================================================================================================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Redirect to the appropriate interface based on user type
    if (user.type === 'Admin') {
      return res.redirect('/adminPage.html');
    } else if (user.type === 'Company') {
      return res.redirect('/companyPage.html');
    } else {
      return res.redirect('/userPage.html');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to log in' });
  }
});






module.exports = router;
