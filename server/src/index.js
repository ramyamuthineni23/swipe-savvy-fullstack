const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('./db');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cors());

app.use(express.json());

app.post('/api/users', async (req, res) => {
  const {
    fullName,
    email,
    mobileNumber,
    smsOptIn,
    password,
    website,
    isOwner,
    business_id,
    business_name,
    business_address,
    business_phone,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO businesses (business_id, name, address, phone)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (business_id) DO NOTHING`,
      [business_id, business_name, business_address, business_phone]
    );
    const userResult = await pool.query(
      `INSERT INTO users (full_name, email, mobile_number, sms_opt_in, password, website, is_owner, business_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [fullName, email, mobileNumber, smsOptIn, hashedPassword, website, isOwner, business_id]
    );
    res.status(201).json({ message: 'User created successfully', userId: userResult.rows[0].id });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

app.get('/api/place-details/:placeId', async (req, res) => {
  const { placeId } = req.params;
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,photos&key=${process.env.GOOGLE_API_KEY}`
    );
    const { result } = response.data;
    res.json({
      business_id: placeId,
      name: result.name || 'Unknown Business',
      address: result.formatted_address || 'No address available',
      phone: result.formatted_phone_number || null,
      imageUrl: result.photos && result.photos[0] ? result.photos[0].photo_reference : null,
    });
  } catch (error) {
    console.error('Error fetching place details:', error);
    res.status(500).json({ message: 'Error fetching place details', error: error.message });
  }
});

app.post('/api/upgrade-user', async (req, res) => {
  const { userId } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users SET premium_user = TRUE WHERE id = $1 RETURNING id`,
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User upgraded successfully' });
  } catch (error) {
    console.error('Error upgrading user:', error);
    res.status(500).json({ message: 'Error upgrading user', error: error.message });
  }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));