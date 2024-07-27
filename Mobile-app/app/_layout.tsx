import { Button, TextInput, View, StyleSheet, Pressable, Text, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

interface DropdownItem {
  label: string;
  value: string;
}

const data = [
  { label: 'Student', value: '1' },
  { label: 'Parent', value: '2' },
];

const Signup = () => {
  const router = useRouter();

  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setValue(null);
      setIsFocus(false);
    }, [])
  );

  const handleCreateUser = async () => {
    if (!value) {
      alert('Please select your user type (Student or Parent)');
      return;
    }

    if (!emailAddress || !password || !confirmPassword || !firstName || !lastName) {
      alert('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://192.168.8.142:5000/register', {
        firstName,
        lastName,
        emailAddress,
        password
      });
      setLoading(false);
      console.log('Registration successful:', response.data);
      alert('Registration successful! Please check your email for verification.');
      setPendingVerification(true);
      router.push('/verify');
    } catch (error) {
      setLoading(false);
      alert('Failed to register. Please try again.');
    }
  };

  const handleDropdownChange = (item: DropdownItem) => {
    setValue(item.value);
    if (item.value === '2') {
      router.navigate('signupP');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
    >
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="leftcircleo" size={30} style={styles.icon} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.welcome}>
          <LottieView style={{ flex: 1 }} source={require('../../assets/animation/3.json')} autoPlay loop />
        </View>
        <View style={styles.container}>
          <Text style={{ fontSize: 35, fontFamily: 'outfit-bold', paddingBottom: 10, textAlign: 'center' }}>Create Your Account!!!</Text>
          <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />

          {!pendingVerification && (
            <View>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  handleDropdownChange(item);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? 'blue' : 'black'}
                    name="Safety"
                    size={20}
                  />
                )}
              />

              <Text style={styles.label}>First Name</Text>
              <TextInput
                autoCapitalize="none"
                value={firstName}
                placeholder="First Name"
                placeholderTextColor="#ACACAA"
                onChangeText={setFirstName}
                style={styles.inputField}
              />
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                autoCapitalize="none"
                value={lastName}
                placeholder="Last Name"
                placeholderTextColor="#ACACAA"
                onChangeText={setLastName}
                style={styles.inputField}
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                autoCapitalize="none"
                placeholder="simon@galaxies.dev"
                placeholderTextColor="#ACACAA"
                value={emailAddress}
                onChangeText={setEmailAddress}
                style={styles.inputField}
              />
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#ACACAA"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.inputField}
              />
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#ACACAA"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.inputField}
              />

              <Pressable style={styles.button} onPress={handleCreateUser}>
                <Text style={styles.buttonText}>SignUp</Text>
              </Pressable>
            </View>
          )}

          {/* {pendingVerification && (
            <View>
              <View>
                <TextInput value={code} placeholder="Code..." style={styles.inputField} onChangeText={setCode} />
              </View>
              <Button title="Verify Email" color={'#6c47ff'} />
            </View>
          )} */}
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
    width: '100%',
    height: 630,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 40,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginTop: -120,
    paddingTop: -20
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 46
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  welcome: {
    height: 360,
    marginTop: 20,
    width: 355
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 15,
    padding: 10,
    width: 300,
    marginVertical: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    paddingTop: Platform.OS === 'ios' ? 45 : 15,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  label: {
    padding: 3
  },
});

export default Signup;