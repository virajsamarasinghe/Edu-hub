import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect,useCallback } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable,TouchableOpacity, Text, Alert, KeyboardAvoidingView, ScrollView, Platform ,BackHandler} from 'react-native';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Verify = () => {
  const router = useRouter();
 
  const [emailAddress, setEmailAddress] = useState('');
 

  

  const handleVerification = async () => {
    try {

    

      const response = await axios.post('http://192.168.8.142:5001/sendcode', 
        {emailAddress},
      );

      if (response.data.status === 'success') {
        
        router.replace('/verificationCode'); // Navigate to login page after verification
      } else {
        alert('Invalid email.');
      }
    } catch (error) {
      console.error('Email send failed:', error);
      alert('Email send failed. Please try again.');
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
    
          <Text style={styles.label}>Enter your EmailAddress:</Text>

          <TextInput
            autoCapitalize="none"
            style={styles.inputField}
            placeholder="Email"
            placeholderTextColor="#ACACAA"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerification}>
            <Text style={styles.buttonText}>Send Code</Text>
          </TouchableOpacity>
         
          
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
    paddingTop: -hp('5%'),
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
    marginTop: hp('5%'),
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
