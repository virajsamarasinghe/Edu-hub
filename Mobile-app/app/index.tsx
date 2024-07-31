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
        router.push('/home');
        return;
      }

      // Check for parent login
      const parentLogin = await AsyncStorage.getItem('isLoggedINP');
      if (parentLogin === 'true') {
        router.push('/homeP');
        return;
      }

      // If no user is logged in, navigate to start
      router.push('/start');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
