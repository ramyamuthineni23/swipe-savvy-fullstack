const { places } = require('@googleapis/places');

async function searchBusiness(query) {
  try {
    const response = await places.places.search({
      auth: process.env.GOOGLE_API_KEY,
      query,
    });
    return response.data.results?.[0];
  } catch (error) {
    console.error('Google Places API error:', error);
    return null;
  }
}

module.exports = { searchBusiness };