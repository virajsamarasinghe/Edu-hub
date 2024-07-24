import { Button, TextInput, View, StyleSheet,Pressable,Text,KeyboardAvoidingView, ScrollView ,Platform,TouchableOpacity, Alert } from 'react-native';
import React, { useState, useCallback, useEffect ,useRef} from 'react';
import { Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useRouter} from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import {useAuth} from '../../context/authContext'

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
  const { register } = useAuth();
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const firstName = useRef("");
  const lastName = useRef("");
  const emailAddress = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Reset state when screen is focused
      setValue(null);
      setIsFocus(false);
    }, [])
  );

  const handleCreateUser = async () => {
    if (!value) {
      alert('Please select your user type (Student or Parent)');
      return;
    }

    if (!firstName.current || !lastName.current || !emailAddress.current || !password.current || !confirmPassword.current) {
      alert('Please fill in all required fields');
      return;
    }

    if (password.current !== confirmPassword.current) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await register(firstName.current, lastName.current, emailAddress.current, password.current);
      setLoading(false);
      console.log('got result:', response);

      if (!response.success) {
        Alert.alert('Sign Up', response.msg);
      } else {
        if (value === '1') {
          console.log('Student signup');
        } else if (value === '2') {
          router.navigate('signupP');
        }
        router.navigate('login');
      }
    } catch (error) {
      setLoading(false);
      console.error('Sign up error:', error);
      Alert.alert('Sign Up', 'An error occurred during sign up.');
    }
  };

  const handleDropdownChange = (item: DropdownItem) => {
    setValue(item.value);
    if (item.value === '2') {
      // Directly navigate to SignupP for Parent selection
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
        <AntDesign name="leftcircleo" size={30} style={styles.icon} color="#fff" />
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
          
          <Text style={{ padding: 3 }}>First Name</Text>
              <TextInput
                autoCapitalize="none"
                placeholder="First Name"
                placeholderTextColor="#ACACAA"
                onChangeText={value => firstName.current = value}
                style={styles.inputField}
              />
              <Text style={{ padding: 3 }}>Last Name</Text>
              <TextInput
                autoCapitalize="none"
                placeholder="Last Name"
                placeholderTextColor="#ACACAA"
                onChangeText={value => lastName.current = value}
                style={styles.inputField}
              />
              <Text style={{ padding: 3 }}>Email</Text>
              <TextInput
                autoCapitalize="none"
                placeholder="simon@galaxies.dev"
                placeholderTextColor="#ACACAA"
                onChangeText={value => emailAddress.current = value}
                style={styles.inputField}
              />
              <Text style={{ padding: 3 }}>Password</Text>
              <TextInput
                placeholder="password"
                placeholderTextColor="#ACACAA"
                onChangeText={value => password.current = value}
                secureTextEntry
                style={styles.inputField}
              />
              <Text style={{ padding: 3 }}>Confirm Password</Text>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#ACACAA"
                onChangeText={value => confirmPassword.current = value}
                secureTextEntry
                style={styles.inputField}
              />

          <Pressable style={styles.button} onPress={handleCreateUser}  >
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
