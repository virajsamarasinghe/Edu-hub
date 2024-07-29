import { Button, TextInput, View, StyleSheet,Pressable,Text,KeyboardAvoidingView, ScrollView ,Platform,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import {useRouter} from 'expo-router';



const Signup = () => {

  const router =useRouter();
  
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  
  const [studentId, setStudentID] = useState("");
  const [username, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleCreateUser = async () => {
 

    // Basic validation (replace with more robust validation)
    if (!emailAddress || !password || !confirmPassword) {
      alert('Please fill in all required fields (email, password, confirm password)');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://192.168.8.142:5001/registerP', {
        studentId,
        username,
        emailAddress,
        password
      });
      setLoading(false);
      console.log('Registration successful:', response.data);
      alert('Registration successful! Please check your email for verification.');
      setPendingVerification(true);
      router.push({
        pathname: '/verifyP',
        params: { email: emailAddress }
      })
    } catch (error) {
      setLoading(false);
      alert('Failed to register. Please try again.');
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
      

    
        <View>

          
          <Text style={{padding:3}}>Student ID</Text>
            <TextInput
              autoCapitalize="none"
              value={studentId}
              placeholder="student ID"
              placeholderTextColor="#ACACAA"
              onChangeText={setStudentID}
              style={styles.inputField}
            />
          
          <Text style={{padding:3}}>Username</Text>
            <TextInput
              autoCapitalize="none"
              value={username}
              placeholder="username"
              placeholderTextColor="#ACACAA"
              onChangeText={setUserName}
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
          

          <Pressable style={styles.button} onPress={handleCreateUser} >
          <Text style={styles.buttonText}>SignUp</Text>
         </Pressable>
        </View>
      


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
  label: {
    padding: 3
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
  eyeIcon1: {
    position: 'absolute',
    right: 8,
    top:285
  },
  eyeIcon2: {
    position: 'absolute',
    right: 8,
    top:365
  },
});

export default Signup;
