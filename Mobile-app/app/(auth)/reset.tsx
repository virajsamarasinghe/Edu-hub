import { Button, Alert, TextInput, View, StyleSheet, Pressable, Text, KeyboardAvoidingView, ScrollView, Platform,TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

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
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://192.168.8.144:5001/reset-password', {
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
    <Ionicons name="arrow-back-outline" size={28} style={styles.icon} color="white" />
    </TouchableOpacity>
    </View>
      <ScrollView style={styles.content}>
        <View style={styles.welcome}>
          <LottieView style={{ flex: 1 }} source={require('../../assets/animation/5.json')} autoPlay loop />
        </View>
        <View style={styles.container}>
        <Text style={styles.title}>Reset Your Password</Text>
        <Text  style={{ padding: 3, marginLeft: -260 }}>Email</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Email"
            placeholderTextColor="#ACACAA"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
           <Text  style={{ padding: 3, marginLeft: -200 }}>Old_Password</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Old Password"
            placeholderTextColor="#ACACAA"
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
          />
           <Text  style={{ padding: 3, marginLeft: -190 }}>New_Password</Text>
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
           <Text  style={{ padding: 3, marginLeft: -160 }}>Confirm_Password</Text>
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
    padding: 5,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 80,
    
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
    paddingBottom: 30,
    marginTop: -70,
    textAlign: 'center',
  },
  inputField: {
    marginVertical: 4,
    width: 300,
    height: 50,
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
    marginTop: 16,
    width: 300,
    height: 46,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
  },
  eyeIcon: {
    position: 'absolute',
    right: 8,
  },
  welcome: {
    height: 360,
    marginTop: 20,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    paddingTop: Platform.OS === 'ios' ? 45 : 15, // Adjust as per your design
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Same background as content
  },
  icon: {
    marginRight: 5,
    marginTop:10
  },
});

export default ResetPassword;
