import { Button, TextInput, View, StyleSheet,Pressable,Text,KeyboardAvoidingView, ScrollView ,Platform,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Stack } from 'expo-router';
import LottieView from 'lottie-react-native';

import { Ionicons } from '@expo/vector-icons';
import {useRouter} from 'expo-router';



const Signup = () => {

  const router =useRouter();
  
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  
  const [studentID, setStudentID] = useState("");
  const [username, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);


  const handleCreateUser = async () => {
    if (!value) {
      alert('Please select your user type (Student or Parent)');
      return;
    }

    // Basic validation (replace with more robust validation)
    if (!emailAddress || !password || !confirmPassword) {
      alert('Please fill in all required fields (email, password, confirm password)');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
}

  // Create the user and send the verification email

  // Verify the email address

  
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
    <ScrollView style={styles.content} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.welcome}>
        <LottieView style={{flex:1}} source={require('../../assets/animation/3.json')} autoPlay loop/>
        </View>
    <View style={styles.container}>
    <Text style={{fontSize:35, fontFamily:'outfit-bold', paddingBottom:10,textAlign:'center'}}>Create Your Account!!!</Text>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      

      {!pendingVerification && (
        <View>

          
          <Text style={{padding:3}}>Student ID</Text>
            <TextInput
              autoCapitalize="none"
              value={studentID}
              placeholder="student ID"
              placeholderTextColor="#ACACAA"
              onChangeText={(firstName) => setStudentID(firstName)}
              style={styles.inputField}
            />
          
          <Text style={{padding:3}}>Username</Text>
            <TextInput
              autoCapitalize="none"
              value={username}
              placeholder="username"
               placeholderTextColor="#ACACAA"
              onChangeText={(lastName) => setUserName(lastName)}
              style={styles.inputField}
            />
          
          <Text style={{padding:3}}>Email</Text>
          <TextInput autoCapitalize="none" placeholder="simon@galaxies.dev"  placeholderTextColor="#ACACAA" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />
          <Text style={{padding:3}}>Password</Text>
          <TextInput placeholder="password"  placeholderTextColor="#ACACAA" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />
          <Text style={{padding:3}}> Confirm Password</Text>
          <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#ACACAA"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.inputField}
              />
          

          <Pressable style={styles.button} >
          <Text style={styles.buttonText}>SignUp</Text>
         </Pressable>
        </View>
      )}

      {pendingVerification && (
        <View>
          <View>
            <TextInput value={code} placeholder="Code..." style={styles.inputField} onChangeText={setCode} />
          </View>
          <Button  title="Verify Email" color={'#6c47ff'}></Button>
        </View>
      )}
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
    width: '100%',
    height: 630,
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
    marginTop:-120,
    paddingTop:-20
   
  
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  inputField: {
    marginVertical: 4,
    width:300,
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
    width:300,
    height:46
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  welcome:{
    height:360,
    marginTop:20 ,
    width:355
    
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
    backgroundColor: 'rgba(0, 0, 0, 0)', // Same background as content
  },
});

export default Signup;
