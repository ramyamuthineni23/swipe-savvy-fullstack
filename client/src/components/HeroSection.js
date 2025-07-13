import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import TestimonialCarousel from './TestimonialCarousel';

function HeroSection({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Load Google Maps JavaScript API with Places library
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      version: 'weekly',
      libraries: ['places'],
    });

    const initializeAutocomplete = async () => {
      if (!inputRef.current) return;

      try {
        // Load the Google Maps API
        await loader.load();

        // Initialize Places Autocomplete (Legacy)
        autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
          types: ['establishment'], // Restrict to businesses
          fields: ['place_id', 'name', 'formatted_address', 'formatted_phone_number', 'photos'],
        });

        // Handle place selection
        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();
          if (place && place.place_id) {
            setSearchQuery(place.name);
            setError(null);
            const businessDetails = {
              business_id: place.place_id,
              name: place.name,
              address: place.formatted_address || '',
              phone: place.formatted_phone_number || '',
              imageUrl: place.photos && place.photos[0] ? place.photos[0].getUrl({ maxWidth: 400 }) : '',
            };
            onSearch(businessDetails);
          }
        });
      } catch (error) {
        console.error('Failed to initialize Places API:', error);
        setError('Failed to load autocomplete. Please try again.');
      }
    };

    initializeAutocomplete();

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onSearch]);

  const handleSearch = () => {
    if (!autocompleteRef.current || !autocompleteRef.current.getPlace()) {
      setError('Please select a business from the autocomplete suggestions.');
      return;
    }
  };

  return (
<div className="relative min-h-screen w-screen bg-cover bg-center px-4 sm:px-8 py-8 flex flex-col">

    <div
    className="absolute inset-0 bg-cover bg-center filter blur-sm"
    style={{ backgroundImage: "url('/happy-customers.jpg')" }}
  />
  {/* Card Overlay */}
  <div className="relative flex-grow flex items-center justify-center">
  <div className="bg-white bg-opacity-95 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg w-full max-w-2xl text-center relative">
    <img src="/logo.png" alt="Swipe Savvy Logo" className="h-12 absolute top-4 left-4" />
    <div className="mt-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">You've Been Selected for a Free Loyalty Listing</h1>
      <p className="text-lg sm:text-xl mb-6">Your business has been recognized for its outstanding reputation. Join the Swipe Savvy Rewards Network — completely free.</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your business name or phone number"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setError(null);
          }}
          className="flex-grow p-3 border rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
          </svg>
        </button>
      </div>
      <p className="text-sm mt-4">We’ll find your business and you can confirm the correct one in the next step.</p>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  </div>
</div>

  {/* Testimonial Carousel */}
  <div className="relative w-full max-w-md mx-auto mt-4">
    <div className="bg-white bg-opacity-90 p-2 sm:p-3 md:p-6 rounded-lg shadow-lg w-full">
      <TestimonialCarousel />
    </div>
  </div>

</div>
  );
}

export default HeroSection;