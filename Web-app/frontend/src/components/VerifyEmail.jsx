import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const location = useLocation();
  const [message, setMessage] = useState('Verifying your email...');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');  // Extracting token from URL
      console.log('Token:', token); 

      if (!token) {
        setMessage('Invalid verification link.');
        setIsValid(false);
        return;
      }
      try {
        // Step 3: Set the payload for the POST request
        const payload = { token };
    
        // Step 4: Make the POST request with the payload
        const response = await axios.post('http://192.168.8.144:5001/verify-email', payload);
    
        // Step 5: Handle the response
        if (response.data.status === 'success') {
          setMessage('Email verified successfully!');
        } else {
          setMessage('Invalid verification link.');
          setIsValid(false);
        }
      } catch (error) {
        console.error('Error verifying email:', error.response.data);
        setMessage('Invalid verification linkd.');
        setIsValid(false);
      }
    };

    verifyEmail();
  }, [location.search]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="font-bold text-3xl mb-4">Email Verification</h3>
        <p className={isValid ? 'text-green-500' : 'text-red-500'}>{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;