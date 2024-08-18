import { Button, TextInput, View, StyleSheet, Pressable, Text, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setValue(null);
      setIsFocus(false);
      setFirstName('');
      setLastName('');
      setEmailAddress('');
      setPassword('');
      setConfirmPassword('');
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
      const response = await axios.post('http://192.168.8.144:5001/register', {
        firstName,
        lastName,
        emailAddress,
        password
      });
      setLoading(false);
      console.log('Registration successful:', response.data);
      alert('Registration successful! Please check your email for verification.');
      setPendingVerification(true);
      router.replace({
        pathname: '/verify',
        params: { email: emailAddress }
      })
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
    <TouchableOpacity onPress={()=>router.back()}>
      <Ionicons name="arrow-back-outline" size={wp('7%')} style={styles.icon1} color="white" />
    </TouchableOpacity>
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.welcome}>
          <LottieView style={{ flex: 1 }} source={require('../../assets/animation/3.json')} autoPlay loop />
        </View>
        <View style={styles.container}>
          <Text style={{ fontSize:hp('3.8%'), fontFamily: 'outfit-bold', paddingBottom:hp('0%'), paddingTop:-hp('1%'), textAlign: 'center'  }}>Create Your Account!!!</Text>
          <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />

          
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
                placeholder="example@gmail.com"
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
                secureTextEntry={!showPassword}
                style={styles.inputField}
              />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon1}
            >
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={22}
                color="#ACACAA"
              />
            </TouchableOpacity>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#ACACAA"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={styles.inputField}
              />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon2}
            >
              <Ionicons
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={22}
                color="#ACACAA"
              />
            </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
                <Text style={styles.buttonText}>SignUp</Text>
              </TouchableOpacity>
            </View>
          


        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#8C78F0',
    padding:wp('1%'),
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
    paddingTop: -hp('3%'),
    paddingBottom: hp('9%'),
    width: '100%',
    height: hp('78%'),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('10%'),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginTop: -hp('13%'),
    
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  welcome: {
    height:hp('40%'),
    marginTop: hp('2%'),
    width: wp('100%')
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
  icon1: {
    marginRight: wp('2%'),
    marginTop: hp('2.5%')
  },
  placeholderStyle: {
    fontSize: hp('2%'),
  },
  selectedTextStyle: {
    fontSize: hp('2%'),
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    paddingTop: Platform.OS === 'ios' ? 45 : 15,
    paddingHorizontal: wp('3%'),
    backgroundColor: 'transparent',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: wp('2%'),
    fontSize: hp('1.6%'),
    color: 'rgba(75, 85, 99, 1)',
    marginBottom: hp('0.4%'),
  },
  eyeIcon1: {
    position: 'absolute',
    right: wp('3%'),
    top:hp('39.3%')
  },
  eyeIcon2: {
    position: 'absolute',
    right: wp('3%'),
    top:hp('48.2%')
  },
});

export default Signup;
