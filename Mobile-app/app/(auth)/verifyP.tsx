import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Text, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import axios from 'axios';

const Verify = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(60); // 60 seconds countdown
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [countdown]);

  const handleVerification = async () => {
    try {

    

      const response = await axios.post('http://192.168.8.142:5001/verify-emailP', { code });

      if (response.data.status === 'success') {
        alert('Email verified successfully!');
        router.push('/loginP'); // Navigate to login page after verification
      } else {
        alert('Invalid verification code.');
      }
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Verification failed. Please try again.');
    }
  };

  const handleResendCode = async () => {
    try {
      await axios.post('http://192.168.8.142:5001/resend-verification-codeP', { email });
      setCountdown(60); // Reset the countdown timer
      setIsResendDisabled(true);
      alert('Verification code resent. Please check your email.');
    } catch (error) {
      console.error('Resend failed:', error);
      alert('Resend failed. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
    >
      <ScrollView style={styles.content}>
        <View style={styles.welcome}>
          <LottieView style={{ flex: 1 }} source={require('../../assets/animation/4.json')} autoPlay loop />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Verify your email</Text>
          <Text style={styles.label}>Enter your code here:</Text>

          <TextInput
            autoCapitalize="none"
            placeholder="OTP code"
            placeholderTextColor="#ACACAA"
            style={styles.inputField}
            value={code}
            onChangeText={setCode} // Update code state
          />
          <Pressable style={styles.button} onPress={handleVerification}>
            <Text style={styles.buttonText}>Verify</Text>
          </Pressable>
          <Pressable 
            style={[styles.button, isResendDisabled && styles.buttonDisabled]} 
            onPress={handleResendCode} 
            disabled={isResendDisabled}
          >
            <Text style={styles.buttonText}>Resend Code ({countdown})</Text>
          </Pressable>
          <Link href="/help" asChild>
            <Pressable>
              <Text style={styles.linkText}>Help?</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#8C78F0',
    padding: 5,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 80,
    marginTop: 0,
    width: '100%',
    height: 510,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 40,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 33,
    fontFamily: 'outfit-bold',
    paddingBottom: 40,
    marginTop: -80,
    textAlign: 'center',
  },
  label: {
    padding: 5,
    marginLeft: -150,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6c47ff',
    padding: 12,
    borderRadius: 99,
    alignItems: 'center',
    marginTop: 20,
    width: 300,
    height: 46,
  },
  buttonDisabled: {
    backgroundColor: '#a3a3a3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  linkText: {
    fontSize: 13,
    color: 'rgba(75, 85, 99, 1)',
    marginVertical: 10,
  },
  welcome: {
    height: 360,
    marginTop: 20,
  },
});

export default Verify;
