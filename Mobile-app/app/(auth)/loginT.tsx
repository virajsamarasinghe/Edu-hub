
import { Link } from 'expo-router';
import React, { useState, useCallback, useEffect } from 'react';
import { TouchableOpacity,View, StyleSheet, TextInput, Button, Pressable, Text, Alert,KeyboardAvoidingView, ScrollView ,Platform} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const Login = () => {

  const router =useRouter();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Reset state when screen is focused
     
      setEmailAddress('');
      setPassword('');

    }, [])
  );

  const handleLogin = async () => {
  if (!emailAddress || !password) {
    alert('Please fill in both fields');
    return;
  }

  try {
    setLoading(true);
    const response = await axios.post('http://192.168.8.142:5001/loginT', {
      emailAddress,
      password
    });
    setLoading(false);
    console.log('Login successful:', response.data);

    await AsyncStorage.setItem('userP',emailAddress);

    // const userDataResponseP = await axios.get(`${config.API_URL}/get-user-dataT`, {
    //   params: { emailAddress}
    // });

    // const { usernameT, phoneT } = userDataResponseP.data.data;
    // await AsyncStorage.setItem('usernameT', usernameT);
   
    // await AsyncStorage.setItem('phoneT', phoneT);

    // await AsyncStorage.setItem('isLoggedINT', 'true');

    //alert('Login successful');
    // Navigate to the home screen or another screen after successful login
    //  router.push('/homeT');
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
       <Ionicons name="arrow-back-outline" size={wp('7%')} style={styles.icon} color="white" />
      </TouchableOpacity>
      </View>
    
    <ScrollView style={styles.content}>
      
      <View style={styles.welcome}>
        <LottieView style={{flex:1}} source={require('../../assets/animation/1.json')} autoPlay loop/>
      </View>
      <Text style={{fontSize:hp('5%'),padding:hp('2%'),marginTop:-hp('6%'),color:'#fff',textAlign:'center'}}>Edu-Hub</Text>
    <View style={styles.container}>

      <Text style={{fontSize:hp('4%'), fontFamily:'outfit-bold', paddingBottom:hp('5%'),textAlign:'center'}}>Hi!, Please Login</Text>
     
    
     
      <Text style={styles.label}>Email</Text>
      <TextInput
            autoCapitalize="none"
            placeholder="Email Address"
            placeholderTextColor="#ACACAA"
            value={emailAddress}
            onChangeText={setEmailAddress}
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
      


      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Link href="/verifyEmail" asChild>
        <Pressable >
        <Text style={styles.linkText}>Forgot password?</Text>
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
    padding: wp('10%'),
    paddingBottom:hp('15%'),
    width: '100%',
    height: hp('65%'),
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius:wp('10%'), 
    //borderBottomLeftRadius: 0, 
    //borderBottomRightRadius: 0,
    shadowColor: '#000000', // Shadow color
    shadowOffset: { width: 0, height: 0 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 10, // Shadow radius
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
    marginLeft: wp('3%'),
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
  
  welcome:{
    height:hp('35%'),
    marginTop: hp('3%'),
    
    
  },
 
 
  icon: {
    marginRight: wp('2%'),
    marginTop: hp('2.5%')
  },
  eyeIcon: {
    position: 'absolute',
    right: wp('13%'),
    top:hp('31%')
    
  },

  placeholderStyle: {
    fontSize: hp('2%'),
  },
 
 
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    paddingTop: Platform.OS === 'ios' ? 45 : 15, // Adjust as per your design
    paddingHorizontal: 15,
    backgroundColor: 'transparent', // Same background as content
  },
 

});

export default Login;
