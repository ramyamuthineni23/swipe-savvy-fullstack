import React, { useEffect, useRef } from 'react';

function GooglePlacesAutocomplete({ onPlaceSelected }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['establishment'], // Or 'geocode' for addresses
      fields: ['place_id', 'geometry', 'name', 'formatted_address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (onPlaceSelected) {
        onPlaceSelected(place);
      }
    });
  }, []);

  return (
    <input
      type="text"
      placeholder="Search places..."
      ref={inputRef}
      style={{ width: '100%', padding: '10px', fontSize: '16px' }}
    />
  );
}

export default GooglePlacesAutocomplete;
