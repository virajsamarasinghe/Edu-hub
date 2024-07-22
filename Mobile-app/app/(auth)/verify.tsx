
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Text, Alert,KeyboardAvoidingView, ScrollView ,Platform,TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import LottieView from 'lottie-react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useRouter} from 'expo-router';



const Login = () => {

  const router =useRouter();


  

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior="padding"
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
  >
      <View style={styles.iconContainer}>
      <TouchableOpacity onPress={()=>router.back()}>
        <AntDesign name="leftcircleo" size={30} style={styles.icon} color="#fff" />
      </TouchableOpacity>
      </View>
    
    <ScrollView style={styles.content}>
      
      <View style={styles.welcome}>
        <LottieView style={{flex:1}} source={require('../../assets/animation/4.json')} autoPlay loop/>
      </View>
      
    <View style={styles.container}>

      <Text style={{fontSize:33, fontFamily:'outfit-bold', paddingBottom:40,marginTop:-80,textAlign:'center'}}>Verify your email</Text>
     
    
      <Text style={{padding:5,marginLeft:-150}}>Enter your code here.</Text>
      <TextInput  autoCapitalize="none" placeholder="OTP code" placeholderTextColor="#ACACAA" style={styles.inputField} />

      


      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Verify</Text>
      </Pressable>

      <Link href="/help" asChild>
        <Pressable >
        <Text style={styles.linkText}>Help?</Text>
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
    paddingBottom:80,
    marginTop:0,
    width: '100%',
    height: 510,
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
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#6c47ff',
    padding: 12,
    borderRadius: 99,
    alignItems: 'center',
    marginTop: 50,
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
    height:360, 
    marginTop:20
    
    
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
 

});

export default Login;
