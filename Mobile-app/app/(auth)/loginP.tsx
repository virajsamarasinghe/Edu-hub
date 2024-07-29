
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { TouchableOpacity,View, StyleSheet, TextInput, Button, Pressable, Text, Alert,KeyboardAvoidingView, ScrollView ,Platform} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {

    const router =useRouter();
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
    if (!emailAddress || !password) {
      alert('Please fill in both fields');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://192.168.8.142:5001/loginP', {
        emailAddress,
        password
      });
      setLoading(false);
      console.log('Login successful:', response.data);

      await AsyncStorage.setItem('isLoggedINP', 'true');

      //alert('Login successful');
      // Navigate to the home screen or another screen after successful login
       router.push('/homeP');
    } catch (error) {
      setLoading(false);
      alert('Failed to login. Please check your student ID and password.');
    }
  }
  

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior="padding"
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
  >
      <View style={styles.iconContainer}>
      <TouchableOpacity onPress={()=>router.back()}>
      <Ionicons name="arrow-back-outline" size={28} style={styles.icon} color="white" />
      </TouchableOpacity>
      </View>

   
    <ScrollView style={styles.content}>
      <View style={styles.welcome}>
        <LottieView style={{flex:1}} source={require('../../assets/animation/1.json')} autoPlay loop/>
      </View>
      <Text style={{fontSize:35,padding:20,marginBottom:10,marginTop:-50,color:'#fff',textAlign:'center'}}>Edu-Hub</Text>
    <View style={styles.container}>

      <Text style={{fontSize:33, fontFamily:'outfit-bold', paddingBottom:30,textAlign:'center'}}>Hi!, Please Login</Text>
     
    
      <Text style={{padding:3,marginLeft:-260}}>Email</Text>
      <TextInput
            autoCapitalize="none"
            placeholder="Email Address"
            placeholderTextColor="#ACACAA"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />
      <Text  style={{padding:3,marginLeft:-230}}>Password</Text>
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
        <Pressable >
        <Text style={styles.linkText}>Forgot password?</Text>
        </Pressable>
      </Link>

      <Link href="/signupP" asChild>
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
  content:{
    backgroundColor:'#8C78F0',
    padding:5,

  },
  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom:40,
    width: '100%',
    height: 540,
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 40, 
    //borderBottomLeftRadius: 0, 
    //borderBottomRightRadius: 0,
    shadowColor: '#000000', // Shadow color
    shadowOffset: { width: 0, height: 0 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 10, // Shadow radius
    elevation: 5,
   
  
  },
  inputField: {
    marginVertical: 4,
    
    height: 50,
    width:300,
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
    width:300,
    height:46
   
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
    width:300,
    height:46
  
  },
  signUpText: {
    color: '#6c47ff',
    fontSize: 20,
  },
  welcome:{
    height:310, 
    marginTop:30
    
    
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
    padding:10,
    width: 300,
    marginVertical: 8,
  },
  icon: {
    marginRight: 5,
    marginTop:5
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
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    paddingTop: Platform.OS === 'ios' ? 45 : 15, // Adjust as per your design
    paddingHorizontal: 15,
    backgroundColor: '#8C78F0', // Same background as content
  },
  eyeIcon: {
    position: 'absolute',
    right: 60,
    top:260
    
  },

});

export default Login;
