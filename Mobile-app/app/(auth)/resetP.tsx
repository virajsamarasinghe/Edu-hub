import { Button, Alert, TextInput, View, StyleSheet, Pressable, Text, KeyboardAvoidingView, ScrollView, Platform,TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


import LottieView from 'lottie-react-native';

const ResetPassword = () => {
  const router = useRouter();


  const [emailAddress, setEmailAddress] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {

    if (!emailAddress) {
      Alert.alert('Please enter your email address');
      return;
    }

    if (!oldPassword ||!newPassword ||!confirmPassword) {
      Alert.alert('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://192.168.8.153:5001/reset-passwordP', {
        emailAddress,
        oldPassword,
        newPassword,
        confirmPassword,
      });
      setLoading(false);
      Alert.alert('Success', response.data.message);
      router.push('/login');
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to reset password. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
    >
    <View style={styles.iconContainer}>
    <TouchableOpacity onPress={()=>router.back()}>
    <Ionicons name="arrow-back-outline" size={wp('7%')} style={styles.icon} color="white" />
    </TouchableOpacity>
    </View>
      <ScrollView style={styles.content}>
        <View style={styles.welcome}>
          <LottieView style={{ flex: 1 }} source={require('../../assets/animation/5.json')} autoPlay loop />
        </View>
        <View style={styles.container}>
        <Text style={styles.title}>Reset Your Password</Text>
        <Text  style={[styles.label]}>Email</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.inputField}
            placeholder="Email"
            placeholderTextColor="#ACACAA"
            value={emailAddress}
            onChangeText={setEmailAddress}
            
          />
           <Text  style={[styles.label]}>Old_Password</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Old Password"
            placeholderTextColor="#ACACAA"
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
          />
           <Text style={[styles.label]}>New_Password</Text>
           <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="New Password"
              placeholderTextColor="#ACACAA"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showNewPassword ? 'eye' : 'eye-off'}
                size={22}
                color="#ACACAA"
              />
            </TouchableOpacity>
          </View>
           <Text  style={[styles.label]}>Confirm_Password</Text>
           <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Confirm New Password"
              placeholderTextColor="#ACACAA"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={22}
                color="#ACACAA"
              />
            </TouchableOpacity>
          </View>
          <Pressable style={styles.button} onPress={handleResetPassword} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Resetting...' : 'Reset Password'}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#8C78F0',
    padding:  wp('1%'),
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
    paddingTop: hp('2%'),
    
    width: '100%',
    height: hp('65%'),
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
    fontSize: wp('8%'),
    fontFamily: 'outfit-bold',
    paddingBottom: hp('2%'),
    marginTop: -hp('8%'),
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: wp('9%'),
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
  buttonText: {
    color: '#fff',
    fontSize:  hp('2.3%'),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  eyeIcon: {
    position: 'absolute',
    right: wp('3%'),
    top:hp('2.3%')
  },
  welcome: {
    height:hp('40%'),
    marginTop: hp('3%'),
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    paddingTop: Platform.OS === 'ios' ? 45 : 15, // Adjust as per your design
    paddingHorizontal:  wp('3%'),
    backgroundColor: 'transparent', // Same background as content
  },
  icon: {
    marginRight: wp('2%'),
    marginTop: hp('2.5%')
  },
});

export default ResetPassword;
