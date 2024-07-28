import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function StartPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('isLoggedIN');
      console.log(data, 'at StartPage');
      if (data === 'true') {
        setIsLoggedIn(true);
        router.push('/home');
      } else {
        setIsLoggedIn(false);
        router.push('/login');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
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
