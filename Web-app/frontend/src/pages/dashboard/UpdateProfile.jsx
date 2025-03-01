import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Fetch the profile data from the backend
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const studentId = await AsyncStorage.getItem('userId');
        if (!studentId) {
          alert('User not found. Please log in again.');
          return;
        }
        setStudentId(studentId);

        const response = await axios.get('http://192.168.8.144:5001/get-user-data', {
          params: { studentId }
        });

        const { firstName, lastName, emailAddress, phone } = response.data.data;
  
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(emailAddress);
        setPhone(phone);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        alert('Failed to fetch profile data. Please try again later.');
      }
    };

    fetchProfileData();
  }, []);

  // Update first name
  const updateFirstName = async () => {
    try {
      const studentId = await AsyncStorage.getItem('userId');
      if (!studentId) {
        alert('User not found. Please log in again.');
        return;
      }

      const response = await axios.post('http://192.168.8.144:5001/firstname', {
        studentId,
        firstName,
      });

      if (response.data && response.data.firstName) {
        setFirstName(response.data.firstName);
        await AsyncStorage.setItem('firstName', response.data.firstName);
      }

      console.log('First name updated successfully:', response.data);
      setIsEditingFirstName(false);
    } catch (error) {
      console.error('Error updating first name:', error);
      alert('Failed to update first name. Please try again later.');
    }
  };

  // Update last name
  const updateLastName = async () => {
    try {
      const studentId = await AsyncStorage.getItem('userId');
      if (!studentId) {
        alert('User not found. Please log in again.');
        return;
      }

      const response = await axios.post('http://192.168.8.144:5001/lastname', {
        studentId,
        lastName,
      });

      if (response.data && response.data.lastName) {
        setLastName(response.data.lastName);
        await AsyncStorage.setItem('lastName', response.data.lastName);
      }

      console.log('Last name updated successfully:', response.data);
      setIsEditingLastName(false);
    } catch (error) {
      console.error('Error updating last name:', error);
      alert('Failed to update last name. Please try again later.');
    }
  };

  // Update phone number
  const updatePhone = async () => {
    try {
      const studentId = await AsyncStorage.getItem('userId');
      if (!studentId) {
        alert('User not found. Please log in again.');
        return;
      }

      const response = await axios.post('http://192.168.8.144:5001/phone', {
        studentId,
        phone,
      });

      if (response.data && response.data.phone) {
        setPhone(response.data.phone);
        await AsyncStorage.setItem('phone', response.data.phone);
      }

      console.log('Phone number updated successfully:', response.data);
      setIsEditingPhone(false);
    } catch (error) {
      console.error('Error updating phone number:', error);
      alert('Failed to update phone number. Please try again later.');
    }
  };

  const toggleEdit = (field) => {
    switch (field) {
      case 'firstName':
        setIsEditingFirstName(!isEditingFirstName);
        break;
      case 'lastName':
        setIsEditingLastName(!isEditingLastName);
        break;
      case 'phone':
        setIsEditingPhone(!isEditingPhone);
        break;
      case 'password':
        setIsEditingPassword(!isEditingPassword);
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-screen max-w-md mx-auto flex items-center justify-center">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <label className="block text-sm font-medium text-gray-700">Student ID</label>
          <div className="flex items-center">
            <span className="input input-bordered w-full">{studentId}</span>
          </div>

          <label className="block mt-4 text-sm font-medium text-gray-700">First Name</label>
          <div className="flex items-center">
            {isEditingFirstName ? (
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full"
              />
            ) : (
              <span className="input input-bordered w-full">{firstName}</span>
            )}
            <button onClick={() => toggleEdit('firstName')} className="ml-2">
              <i className={`fas ${isEditingFirstName ? 'fa-save' : 'fa-edit'}`}></i>
            </button>
          </div>

          <label className="block mt-4 text-sm font-medium text-gray-700">Last Name</label>
          <div className="flex items-center">
            {isEditingLastName ? (
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full"
              />
            ) : (
              <span className="input input-bordered w-full">{lastName}</span>
            )}
            <button onClick={() => toggleEdit('lastName')} className="ml-2">
              <i className={`fas ${isEditingLastName ? 'fa-save' : 'fa-edit'}`}></i>
            </button>
          </div>

          <label className="block mt-4 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            className="input input-bordered w-full"
            disabled
          />

          <label className="block mt-4 text-sm font-medium text-gray-700">Phone</label>
          <div className="flex items-center">
            {isEditingPhone ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input input-bordered w-full"
              />
            ) : (
              <span className="input input-bordered w-full">{phone}</span>
            )}
            <button onClick={() => toggleEdit('phone')} className="ml-2">
              <i className={`fas ${isEditingPhone ? 'fa-save' : 'fa-edit'}`}></i>
            </button>
          </div>

          <label className="block mt-4 text-sm font-medium text-gray-700">Password</label>
          <div className="flex items-center">
            {isEditingPassword ? (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
              />
            ) : (
              <span className="input input-bordered w-full">••••••••</span>
            )}
            <button onClick={() => toggleEdit('password')} className="ml-2">
              <i className={`fas ${isEditingPassword ? 'fa-save' : 'fa-edit'}`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;