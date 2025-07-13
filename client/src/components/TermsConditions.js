import React, { useState } from 'react';

function TermsConditions({ onAccept }) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAgreed) {
      setError('You must agree to the terms and conditions to continue.');
      return;
    }
    setError('');
    onAccept();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      {/* Main Content */}
      <div className="md:w-2/3">
        <div className="flex justify-between mb-4">
          <div className="w-1/4 bg-blue-600 h-2 rounded"></div>
          <div className="w-1/4 bg-blue-600 h-2 rounded"></div>
          <div className="w-1/4 bg-blue-600 h-2 rounded"></div>
          <div className="w-1/4 bg-gray-200 h-2 rounded"></div>
        </div>
        <p className="text-sm text-gray-600 mb-2">Step 3 of 4: Terms & Conditions</p>
        <h2 className="text-2xl font-bold mb-2">🎉 Just One More Step</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="mb-4">
            Please review and agree to our terms before activating your account.
          </p>
          {/* Collapsible Accordion for TOS */}
          <details className="mb-4">
            <summary className="cursor-pointer text-blue-600 font-medium">
              Preview Swipe Savvy Merchant Agreement
            </summary>
            <div className="mt-2 p-4 bg-gray-50 rounded">
              <p>
                This is a placeholder for the Swipe Savvy Merchant Agreement. It outlines the terms of your participation in the Swipe Savvy Rewards Network, including responsibilities, payment terms, and liability.{' '}
                <a
                  href="/merchant-agreement.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View full agreement
                </a>.
              </p>
            </div>
          </details>
          <details className="mb-4">
            <summary className="cursor-pointer text-blue-600 font-medium">
              Preview Privacy Policy
            </summary>
            <div className="mt-2 p-4 bg-gray-50 rounded">
              <p>
                This is a placeholder for the Swipe Savvy Privacy Policy. It details how we collect, use, and protect your personal and business information.{' '}
                <a
                  href="/privacy-policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View full policy
                </a>.
              </p>
            </div>
          </details>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => {
                setIsAgreed(e.target.checked);
                setError('');
              }}
              className="mr-2"
            />
            I have read and agree to the Swipe Savvy Merchant Agreement and Privacy Policy.
          </label>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          >
            Activate My Free Listing
          </button>
          <p className="text-sm text-gray-600 mt-4">
            We'll ship your Swipe Savvy window sticker and POS signage within 5–7 business days.
          </p>
        </div>
      </div>
      {/* Sidebar */}
      <div className="md:w-1/3">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Your Free Benefits</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Free business listing on the Swipe Savvy Rewards Network.</li>
            <li>Complimentary window sticker to promote your participation.</li>
            <li>POS signage to engage customers at checkout.</li>
            <li>Reward-enabled checkout to boost customer loyalty.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;