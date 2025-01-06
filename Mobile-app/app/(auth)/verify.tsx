import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect,useCallback } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable,TouchableOpacity, Text, Alert, KeyboardAvoidingView, ScrollView, Platform ,BackHandler} from 'react-native';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


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

    

      const response = await axios.post('http://172.20.10.2:5001/verify-email', { code });

      if (response.data.status === 'success') {
        alert('Email verified successfully!');
        router.replace('/login'); // Navigate to login page after verification
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
      await axios.post('http://172.20.10.2:5001/resend-verification-code', { email });
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
          <TouchableOpacity style={styles.button} onPress={handleVerification}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, isResendDisabled && styles.buttonDisabled]} 
            onPress={handleResendCode} 
            disabled={isResendDisabled}
          >
            <Text style={styles.buttonText}>Resend Code ({countdown})</Text>
          </TouchableOpacity>
          <Link href="/help" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Help?</Text>
            </TouchableOpacity>
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
    flexGrow: 1,
  },
  container: {
    marginTop: -hp('1%'),
    paddingTop: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('15%'),
    
    
    width: '100%',
    height: hp('60%'),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('10%'),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: hp('5%'),
    padding: hp('2%'),
    fontFamily: 'outfit-bold',
    
    marginTop: -hp('7%'),
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: -wp('2%'),
    fontSize: hp('1.6%'),
    color: 'rgba(75, 85, 99, 1)',
    marginBottom: hp('0.4%'),
  },
  inputField: {
    marginVertical:  hp('0.5%'),
    height: hp('6%'),
    width:wp('75%'),
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 15,
    padding: wp('3%'),
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6c47ff',
    padding: hp('1.5%'),
    borderRadius: 99,
    alignItems: 'center',
    marginTop: hp('2%'),
    width: wp('75%'),
  },
  buttonDisabled: {
    backgroundColor: '#a3a3a3',
  },
  buttonText: {
    color: '#fff',
    fontSize:  hp('2.3%'),
  },
  linkText: {
    fontSize: hp('1.6%'),
    color: 'rgba(75, 85, 99, 1)',
    marginVertical: hp('1%'),
  },
  welcome: {
    height: hp('42%'),
    marginTop: hp('4%'),
  },
});

export default Verify;
