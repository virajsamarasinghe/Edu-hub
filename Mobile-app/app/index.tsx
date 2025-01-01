import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function StartPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkLoginStatus = async () => {
    try {
      // Check for student login
      const studentLogin = await AsyncStorage.getItem('isLoggedIN');
      if (studentLogin === 'true') {
        setTimeout(() => {
          router.push('/home');
        }, 2000); // Add delay of 2 seconds
        return;
      }

      // Check for parent login
      const parentLogin = await AsyncStorage.getItem('isLoggedINP');
      if (parentLogin === 'true') {
        setTimeout(() => {
          router.push('/homeP');
        }, 2000); // Add delay of 2 seconds
        return;
      }

      const tutorLogin = await AsyncStorage.getItem('isLoggedINT');
      if (tutorLogin === 'true') {
        setTimeout(() => {
          router.push('/homeT');
        }, 2000); // Add delay of 2 seconds
        return;
      }

      // If no user is logged in, navigate to start
      setTimeout(() => {
        router.push('/start');
      }, 2000); // Add delay of 2 seconds
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Ensure the loading state is set to false after 2 seconds
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#8C78F0' }}>
        <ActivityIndicator size='large' color='blue' />
      </View>
    );
  }

  return null;
}
