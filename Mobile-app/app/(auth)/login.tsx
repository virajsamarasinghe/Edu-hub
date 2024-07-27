import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import LottieView from 'lottie-react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

interface DropdownItem {
  label: string;
  value: string;
}

const data = [
  { label: 'Student', value: '1' },
  { label: 'Tutor', value: '2' },
  { label: 'Parent', value: '3' },
];

const Login = () => {
  const router = useRouter();
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Reset state when screen is focused
      setValue(null);
      setIsFocus(false);
    }, [])
  );

  const handleLogin = async () => {
    if (!value) {
      alert('Please select your user type');
      return;
    }
    if (!studentId || !password) {
      alert('Please fill in both fields');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://192.168.8.142:5001/login', {
        studentId,
        password
      });
      setLoading(false);
      console.log('Login successful:', response.data);
      alert('Login successful');
      // Navigate to the home screen or another screen after successful login
       router.push('/home');
    } catch (error) {
      setLoading(false);
      alert('Failed to login. Please check your student ID and password.');
    }

    // Handle navigation based on user type
    if (value === '1') {
      // Student signup logic (if any)
      console.log('Student login');
      // Navigate or continue signup for student
    } else if (value === '2') {
      // Tutor signup navigation
      router.navigate('loginT'); // Navigate to loginT screen
    } else if (value === '3') {
      // Parent signup navigation
      router.navigate('loginP'); // Navigate to loginP screen
    }
  };

  const handleDropdownChange = (item: DropdownItem) => {
    setValue(item.value);
    if (item.value === '2') {
      // Directly navigate to loginT for Tutor selection
      router.navigate('loginT');
    } else if (item.value === '3') {
      // Directly navigate to loginP for Parent selection
      router.navigate('loginP');
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
          <LottieView style={{ flex: 1 }} source={require('../../assets/animation/1.json')} autoPlay loop />
        </View>
        <Text style={{ fontSize: 35, padding: 20, marginBottom: 10, marginTop: -50, color: '#fff', textAlign: 'center' }}>Edu-Hub</Text>
        <View style={styles.container}>
          <Text style={{ fontSize: 33, fontFamily: 'outfit-bold', paddingBottom: 30, textAlign: 'center' }}>Hi!, Please Login</Text>

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
              setValue((prevValue) => item.value);
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
          <Text  style={{ padding: 3, marginLeft: -220 }}>Student ID</Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Enter your Student ID"
            placeholderTextColor="#ACACAA"
            value={studentId}
            onChangeText={setStudentId}
            style={styles.inputField}
          />

          <Text  style={{ padding: 3, marginLeft: -220 }}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#ACACAA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputField}
          />

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <Link href="/reset" asChild>
            <Pressable>
              <Text style={styles.linkText}>Forgot password?</Text>
            </Pressable>
          </Link>

          <Link href="/signup" asChild>
            <Pressable style={styles.signUpButton}>
              <Text style={styles.signUpText}>Create New Account</Text>
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
    paddingBottom: 40,
    width: '100%',
    height: 540,
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
  label: {
    marginVertical: 4,
    fontSize: 16,
    color: 'rgba(75, 85, 99, 1)',
  },
  linkText: {
    fontSize: 13,
    color: 'rgba(75, 85, 99, 1)',
    marginVertical: 4,
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
  signUpButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#6c47ff',
    alignItems: 'center',
    marginTop: 18,
    width: 300,
    height: 46,
  },
  signUpText: {
    color: '#6c47ff',
    fontSize: 20,
  },
  welcome: {
    height: 310,
    marginTop: 20,
  },
  picker: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
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
  Label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default Login;