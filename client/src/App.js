import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import BusinessVerification from './components/BusinessVerification';
import AccountCreationForm from './components/AccountCreationForm';
import TermsConditions from './components/TermsConditions';
import SuccessConfirmation from './components/SuccessConfirmation';
import TestimonialCarousel from './components/TestimonialCarousel';
import axios from 'axios';

function App() {
  const [step, setStep] = useState(1);
  const [business, setBusiness] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleSearch = (businessDetails) => {
    console.log('Received businessDetails:', businessDetails);
    if (businessDetails && businessDetails.business_id) {
      setBusiness(businessDetails);
      setStep(2); // Advance to BusinessVerification
    } else {
      console.error('Invalid business details:', businessDetails);
      alert('Invalid business details: Missing business_id. Please select a valid business from the autocomplete suggestions.');
    }
  };

  const handleConfirmBusiness = () => setStep(3);
  const handleTryAgain = () => setStep(1);

  const handleAccountSubmit = (data) => {
    if (data.back) {
      setStep(2); // Go back to BusinessVerification
      return;
    }
    setUserData(data); // Store user data
    setStep(4); // Advance to TermsConditions
  };

  const handleAcceptTerms = async (data) => {
    if (data?.back) {
      setStep(3); // Go back to AccountCreationForm
      return;
    }
    try {
      console.log('Sending to /api/users:', {
        fullName: userData?.fullName,
        email: userData?.email,
        mobileNumber: userData?.mobileNumber,
        smsOptIn: userData?.smsOptIn,
        password: userData?.password,
        website: userData?.website || null,
        isOwner: userData?.isOwner,
        business_id: business?.business_id,
        business_name: business?.name,
        business_address: business?.address,
        business_phone: business?.phone || null,
      });
      const response = await axios.post('http://localhost:5001/api/users', {
        fullName: userData?.fullName,
        email: userData?.email,
        mobileNumber: userData?.mobileNumber,
        smsOptIn: userData?.smsOptIn,
        password: userData?.password,
        website: userData?.website || null,
        isOwner: userData?.isOwner,
        business_id: business?.business_id,
        business_name: business?.name,
        business_address: business?.address,
        business_phone: business?.phone || null,
      });
      setUserData((prev) => ({
        ...prev,
        userId: response.data.userId,
        business_id: business?.business_id,
      }));
      setStep(5); // Advance to SuccessConfirmation
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Failed to create account: ' + (error.response?.data?.message || 'Please try again.'));
    }
  };

  const handleUpgrade = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/upgrade-user', {
        userId: userData?.userId,
      });
      alert('Upgrade successful! Congratulations on becoming a premium user!');
      // alert('Action successful!');
      window.location.href = '/index.html'; // Redirect to the homepage or dashboard
      // window.location.href = response.data.sessionUrl; // Redirect to Stripe checkout
    } catch (error) {
      console.error('Upgrade failed:', error);
      alert('Failed to initiate upgrade: ' + (error.response?.data?.message || 'Please try again.'));
    }
  };

  const handleContinueFree = () => {
    window.location.href = '/'; // Redirect to dashboard or homepage
  };

  return (
    <div>
      {step === 1 && <HeroSection onSearch={handleSearch} />}
      {step === 2 && (
        <BusinessVerification
          business={business}
          onConfirm={handleConfirmBusiness}
          onTryAgain={handleTryAgain}
        />
      )}
      {step === 3 && (
        <AccountCreationForm
          onSubmit={handleAccountSubmit}
          business={business}
        />
      )}
      {step === 4 && <TermsConditions onAccept={handleAcceptTerms} />}
      {step === 5 && (
        <SuccessConfirmation
          onUpgrade={handleUpgrade}
          onContinueFree={handleContinueFree}
        />
      )}
      {/* <TestimonialCarousel /> */}
    </div>
  );
}

export default App;