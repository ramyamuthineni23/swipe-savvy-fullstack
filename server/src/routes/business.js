const express = require('express');
const router = express.Router();
const { searchBusiness } = require('../googlePlaces');
const Business = require('../models/Business');

router.post('/', async (req, res) => {
  const { query } = req.body;
  const result = await searchBusiness(query);

  console.log('Google API result:', result);

  if (!result) {
    return res.status(404).json({ error: 'No business found' });
  }

  try {
    const [business] = await Business.findOrCreate({
      where: { googlePlaceId: result.place_id },
      defaults: {
        name: result.name,
        address: result.formatted_address,
        phone: result.formatted_phone_number,
        imageUrl: result.photos?.[0]?.photo_reference,
      },
    });
    res.json(business);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process business' });
  }
});

module.exports = router;