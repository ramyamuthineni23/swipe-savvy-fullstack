import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

function SuccessConfirmation({ onUpgrade, onContinueFree }) {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <div className="w-1/4 bg-blue-600 h-2 rounded"></div>
        <div className="w-1/4 bg-blue-600 h-2 rounded"></div>
        <div className="w-1/4 bg-blue-600 h-2 rounded"></div>
        <div className="w-1/4 bg-blue-600 h-2 rounded"></div>
      </div>
      <h2 className="text-3xl font-bold mb-4">Your Business Is Now Live on Swipe Savvy!</h2>
      <p className="mb-4">Make the most of it with a limited-time upgrade — first month free + 50% off for life.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold mb-2">Free Plan Active</h3>
          <p>Basic listing and benefits included.</p>
          <button
            onClick={onContinueFree}
            className="border border-blue-600 px-4 py-2 rounded mt-4"
          >
            No Thanks, I’ll Stay on the Free Plan
          </button>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h3 className="font-bold mb-2">Upgrade Offer</h3>
          <ul className="list-disc pl-4 mb-4">
            <li>Featured placement in our app</li>
            <li>Run 2x rewards promotions</li>
            <li>Sync across Google, Yelp, Facebook & more</li>
            <li>Access analytics and reports</li>
          </ul>
          <p className="font-bold mb-2">Try it FREE for 30 days — then just $34.50/mo (50% off forever)</p>
          <button
            onClick={onUpgrade}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Yes, Upgrade Me — Risk-Free
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessConfirmation;