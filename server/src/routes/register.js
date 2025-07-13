const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { fullName, email, phone, password, website, businessId } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      website,
      businessId,
    });
    res.json({ success: true, userId: user.id });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

module.exports = router;