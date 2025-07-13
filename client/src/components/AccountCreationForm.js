import React, { useState } from 'react';

function AccountCreationForm({ onSubmit, business }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    smsOptIn: false,
    password: '',
    website: '',
    isOwner: false,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (!/^\+?\d{10,15}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Invalid mobile number';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.isOwner) {
      newErrors.isOwner = 'You must confirm you are the owner or authorized representative';
    }
    if (!business?.business_id) {
      newErrors.business_id = 'Business ID is missing';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        fullName: formData.fullName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        smsOptIn: formData.smsOptIn,
        password: formData.password,
        website: formData.website || null,
        isOwner: formData.isOwner,
        business_id: business.business_id,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBack = () => {
    onSubmit({ back: true });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <div className="w-1/4 bg-blue-600 h-2 rounded"></div>
        <div className="w-1/4 bg-blue-600 h-2 rounded"></div>
        <div className="w-1/4 bg-gray-200 h-2 rounded"></div>
        <div className="w-1/4 bg-gray-200 h-2 rounded"></div>
      </div>
      <p className="text-sm text-gray-600 mb-2">Step 2 of 4</p>
      <h2 className="text-2xl font-bold mb-2">Create Your Swipe Savvy Account</h2>
      {business && (
        <p className="mb-4">Business: {business.name}, {business.address}</p>
      )}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
            {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
            <label className="flex items-center mt-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="smsOptIn"
                checked={formData.smsOptIn}
                onChange={handleChange}
                className="mr-2"
              />
              Opt in to receive SMS
            </label>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Website or Social Link (Optional)
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="isOwner"
                checked={formData.isOwner}
                onChange={handleChange}
                className="mr-2"
              />
              I am the owner or authorized representative of this business.
            </label>
            {errors.isOwner && <p className="text-red-500 text-sm mt-1">{errors.isOwner}</p>}
            {errors.business_id && <p className="text-red-500 text-sm mt-1">{errors.business_id}</p>}
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="border border-blue-600 px-4 py-2 rounded flex items-center"
          >
            ⬅️ Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          >
            ➡️ Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountCreationForm;