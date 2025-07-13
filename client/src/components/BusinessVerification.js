import React from 'react';

function BusinessVerification({ business, onConfirm, onTryAgain }) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <div className="w-1/4 bg-blue-600 h-2 rounded"></div>
        <div className="w-1/4 bg-gray-200 h-2 rounded"></div>
        <div className="w-1/4 bg-gray-200 h-2 rounded"></div>
        <div className="w-1/4 bg-gray-200 h-2 rounded"></div>
      </div>
      <p className="text-sm text-gray-600 mb-2">Step 1 of 4</p>
      <h2 className="text-2xl font-bold mb-2">Is This Your Business?</h2>
      <p className="mb-4">We found the following match for your entry. Please confirm before proceeding.</p>
      <div className="bg-white p-6 rounded-lg shadow">
        {business.imageUrl && (
          <img src={business.imageUrl} alt={business.name} className="w-24 h-24 mb-4 object-cover rounded" />
        )}
        <p className="font-bold">{business.name}</p>
        <p>{business.address}</p>
        <p>{business.phone || 'No phone number available'}</p>
        <div className="flex gap-4 mt-4">
          <button onClick={onConfirm} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
            ➡️ Yes, This Is Me
          </button>
          <button onClick={onTryAgain} className="border border-blue-600 px-4 py-2 rounded flex items-center">
            ↩️ No, Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusinessVerification;