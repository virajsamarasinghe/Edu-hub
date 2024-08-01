import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet,TouchableOpacity, TextInput, Pressable, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import LottieView from 'lottie-react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Reset state when screen is focused
      setValue(null);
      setIsFocus(false);
      setStudentId('');
      setPassword('')

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

      await AsyncStorage.setItem('isLoggedIN', 'true');

      //alert('Login successful');
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
        <Text style={{ fontSize:hp('5%'), padding: hp('2%'), marginTop:-hp('7%'), color: '#fff', textAlign: 'center' }}>Edu-Hub</Text>
        <View style={styles.container}>
          <Text style={{ fontSize:hp('4%'), fontFamily: 'outfit-bold', paddingBottom:hp('2%'), paddingTop:-hp('1%'), textAlign: 'center' }}>Hi!, Please Login</Text>

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
          <Text  style={styles.label}>Student ID</Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Enter your Student ID"
            placeholderTextColor="#ACACAA"
            value={studentId}
            onChangeText={setStudentId}
            style={styles.inputField}
          />

          <Text  style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#ACACAA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.inputField}
          />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={22}
                color="#ACACAA"
              />
            </TouchableOpacity>
          

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
    padding: wp('1%'),
    flexGrow: 1,
    
  },
  container: {
    marginTop:-hp('2%'),
    paddingTop:-hp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('15%'),
    //paddingBottom: 40,
    width: '100%',
    height: hp('66%'),	
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
  label: {
    alignSelf: 'flex-start',
    marginLeft: -wp('2%'),
    fontSize: hp('1.6%'),
    color: 'rgba(75, 85, 99, 1)',
    marginBottom: hp('0.4%'),
  },
  linkText: {
    fontSize: hp('1.6%'),
    color: 'rgba(75, 85, 99, 1)',
    marginVertical: hp('1%'),
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
  signUpButton: {
    backgroundColor: '#fff',
    padding: hp('1.2%'),
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#6c47ff',
    alignItems: 'center',
    marginTop: hp('2%'),
    width:wp('75%'),
   
  },
  signUpText: {
    color: '#6c47ff',
    fontSize:hp('2.4%'),
  },
  welcome: {
    height:hp('35%'),
    marginTop: hp('3%'),
  },

  dropdown: {
    height: hp('6%'),
    width:wp('75%'),
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 15,
    padding: wp('3%'),
    marginVertical:hp('1%'),
  },
  icon: {
    marginRight: wp('2%'),
  },

  placeholderStyle: {
    fontSize: hp('2%'),
  },
  selectedTextStyle: {
    fontSize: hp('2%'),
  },
 
  eyeIcon: {
    position: 'absolute',
    right: wp('13%'),
    top:hp('31.9%')
    
  },
});

export default Login;