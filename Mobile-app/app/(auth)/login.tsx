import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet,TouchableOpacity, TextInput, Pressable, Text, KeyboardAvoidingView, ScrollView, Platform,BackHandler } from 'react-native';
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
  { label: 'Parent', value: '2' },
  { label: 'Tutor', value: '3' },
];

const Login = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>('1'); // Set default to '1' for Student

  const [isFocus, setIsFocus] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddress2, setEmailAddress2] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');

  useFocusEffect(
    useCallback(() => {
      // Reset state when screen is focused
      setValue('1');
      setEmailAddress('');
      setIsFocus(false);
      setStudentId('');
      setPassword('');
      setPassword1('');
      setEmailAddress2('');
      setPassword2('');

    }, [])
  );


  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp(); // Exits the app when back button is pressed
        return true; // Prevents the default behavior
      };
  
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
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
      const response = await axios.post('http://192.168.8.153:5001/login', {
        studentId,
        password
      });
      setLoading(false);
      console.log('Login successful:', response.data);

      //const studId = response.data.studentId;
      await AsyncStorage.setItem('userId', studentId);

      const userDataResponse = await axios.get('http://192.168.8.153:5001/get-user-data', {
        params: { studentId }
      });

      

       
      const { firstName, emailAddress, phone } = userDataResponse.data.data;

      // Store user data in AsyncStorage
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('emailAddress', emailAddress);
      await AsyncStorage.setItem('phone', phone);
      await AsyncStorage.setItem('isLoggedIN', 'true');

      //alert('Login successful');
      // Navigate to the home screen or another screen after successful login
       router.push('/home');
    } catch (error) {
      setLoading(false);
      alert('Failed to login. Please check your student ID and password.');
    }

    // Handle navigation based on user type
   
  };

  const handleLoginP = async () => {

    if (!value) {
      alert('Please select your user type');
      return;
    }
    
    if (!emailAddress || !password1) {
      alert('Please fill in both fields');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://192.168.8.142:5001/loginP', {
        emailAddress,
        password1
      });
      setLoading(false);
      console.log('Login successful:', response.data);

      await AsyncStorage.setItem('userP',emailAddress);

      const userDataResponseP = await axios.get('http://192.168.8.142:5001/get-user-dataP', {
        params: { emailAddress}
      });

      const { username, phone } = userDataResponseP.data.data;
      await AsyncStorage.setItem('username', username);
     
      await AsyncStorage.setItem('phoneP', phone);

      await AsyncStorage.setItem('isLoggedINP', 'true');

      //alert('Login successful');
      // Navigate to the home screen or another screen after successful login
       router.push('/homeP');
    } catch (error) {
      setLoading(false);
      alert('Failed to login. Please check your email and password.');
    }
  }

  const handleLoginT = async () => {
    if (!emailAddress2 || !password2) {
      alert('Please fill in both fields');
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.post('http://192.168.8.142:5001/loginT', {
        emailAddress2,
        password2
      });
      setLoading(false);
  
      if (response.data.status === 'success') {
        console.log('Login successful:', response.data);
        await AsyncStorage.setItem('userP', emailAddress2);
        // Navigate to the home screen or another screen
        router.push('/home');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      setLoading(false);
      alert('Failed to login. Please check your email and password.');
    }
  };
  

  const handleDropdownChange = (item: any) => {
    setValue(item.value);
    setIsFocus(false);
  };

  const handleSignUpNavigation = () => {
    router.push('/signup'); // This replaces the current screen with the signup screen, so back navigation is blocked
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

           {value === '1' && (
            <>
              {/* Student Login Input Fields */}
              <Text style={styles.label}>Student ID</Text>
              <TextInput
                autoCapitalize="none"
                placeholder="Enter your Student ID"
                placeholderTextColor="#ACACAA"
                value={studentId}
                onChangeText={setStudentId}
                style={styles.inputField}
              />

              <Text style={styles.label}>Password</Text>
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
            </>
          )}

          {value === '3' && (
            <>
              {/* Tutor Login Input Fields */}
              <Text style={styles.label}>Email</Text>
              <TextInput
                autoCapitalize="none"
                placeholder="Enter your EmailAddress"
                placeholderTextColor="#ACACAA"
                value={emailAddress2}
                onChangeText={setEmailAddress2}
                style={styles.inputField}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#ACACAA"
                value={password2}
                onChangeText={setPassword2}
                secureTextEntry={!showPassword2}
                style={styles.inputField}
              />
              <TouchableOpacity
                onPress={() => setShowPassword2(!showPassword2)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword2 ? 'eye' : 'eye-off'}
                  size={22}
                  color="#ACACAA"
                />
              </TouchableOpacity>
            </>
          )}

          {value === '2' && (
            <>
              {/* Parent Login Input Fields */}
              <Text style={styles.label}>Email</Text>
              <TextInput
                autoCapitalize="none"
                placeholder="Enter your email"
                placeholderTextColor="#ACACAA"
                value={emailAddress}
                onChangeText={setEmailAddress}
                style={styles.inputField}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#ACACAA"
                value={password1}
                onChangeText={setPassword1}
                secureTextEntry={!showPassword1}
                style={styles.inputField}
              />
              <TouchableOpacity
                onPress={() => setShowPassword1(!showPassword1)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword1 ? 'eye' : 'eye-off'}
                  size={22}
                  color="#ACACAA"
                />
              </TouchableOpacity>
            </>
          )}

          

<TouchableOpacity 
  style={styles.button} 
  onPress={() => {
    if (value === '1') {
      handleLogin();  // Call student login
    } else if (value === '2') {
      handleLoginP();  // Call parent login
    }
    else if (value === '3') {
      handleLoginT();  
    } else {
      // You can add a handler for Tutor login if needed
      alert('Please select a valid user type');
    }
  }}
>
  <Text style={styles.buttonText}>Login</Text>
</TouchableOpacity>


          

          <Link href="/verifyEmail" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Forgot password?</Text>
            </TouchableOpacity>
          </Link>

            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpNavigation}>
              <Text style={styles.signUpText}>Create New Account</Text>
            </TouchableOpacity>
        
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



  Label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: wp('6%'),
    top: hp('2%'),
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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