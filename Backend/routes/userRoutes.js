const express = require('express');
const Account = require('../models/account');

const router = express.Router();

//============================================================================================
// CREATE NEW ACCOUNT (client only)
//============================================================================================
router.post('/accounts', async (req, res) => {
  const { email, password, phoneNumber} = req.body;

  try {
    const newAccount = await Account.create({
      email,
      password,
      phoneNumber
    });

    res.status(201).json(newAccount); //return created account
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create account.' });
  }
});
//============================================================================================



//============================================================================================
// RETURN ALL ACCOUNTS
//============================================================================================
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.findAll({
      attributes: ['id', 'email', 'password', 'phoneNumber'],
    });

    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch accounts' });
  }
});
//============================================================================================



//============================================================================================
// GET ACCOUNT BY ID
//============================================================================================
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const account = await Account.findByPk(id, {
      attributes: ['id', 'email', 'password', 'phoneNumber'],
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch account' });
  }
});
//============================================================================================



//============================================================================================
// DELETE ACCOUNT BY ID (admin only)
//============================================================================================
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    //prevent deletion of admin account
    if (id === '1') {
      return res.status(403).json({ error: 'Admin account cannot be deleted' });
    }

    const rowsDeleted = await Account.destroy({ where: { id } });

    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete account' });
  }
});
//============================================================================================



module.exports = router;