import React, { useState , useEffect } from 'react';
import { Button, TextInput, View, StyleSheet, Image, Pressable, Text, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




export default function Profile() {
    
    
    const [phone, setPhone] = useState('');
    const [isEditingUsername, setIsEditingUsername] = useState(false);
  
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState('');
    const [lastName, setLastName] = useState('');
    const [Email, setEmailAddress] = useState('');
    const [emailAddress, setemailAddress] = useState('');
    const router = useRouter();
    

    

   

    useEffect(() => {
        const fetchData = async () => {
          try {
            const storedEmail = await AsyncStorage.getItem('emailAddress');
            if (storedEmail) {
              setEmailAddress(storedEmail);
            }
          } catch (error) {
            console.error('Error fetching email:', error);
          }
        };
    
        fetchData();
      }, []);
  

      const updatePhone = async () => {
        if (!phone) {
          alert('Please enter a phone number');
          return;
        }
    
        try {
          const emailAddress = await AsyncStorage.getItem('userP');
          if (!emailAddress) {
            alert('User not found. Please log in again.');
            return;
          }
    
          const response = await axios.post('http://192.168.8.142:5001/phoneP', {
            emailAddress,
            phone,
          });
    
          // Assuming response.data contains the updated user profile including the phone number
          if (response.data && response.data.phoneP) {
            setPhone(response.data.phoneP);
    
            // Store the updated phone number in AsyncStorage
            await AsyncStorage.setItem('phoneP', response.data.phoneP);
          }
    
          console.log('Phone number updated successfully:', response.data);
          setIsEditingPhone(false);
        } catch (error) {
          console.error('Error updating phone number:', error);
          alert('Failed to update phone number. Please try again later.');
        }
      };

      const updateUsername = async () => {
       
    
        try {
          const emailAddress = await AsyncStorage.getItem('userP');
          if (!emailAddress) {
            alert('User not found. Please log in again.');
            return;
          }
    
          const response = await axios.post('http://192.168.8.142:5001/username', {
            emailAddress,
            username,
          });
    
          // Assuming response.data contains the updated user profile including the phone number
          if (response.data && response.data.username) {
            setUsername(response.data.username);
    
            // Store the updated phone number in AsyncStorage
            await AsyncStorage.setItem('username', response.data.username);
          }
    
          console.log('username updated successfully:', response.data);
          setIsEditingUsername(false);
        } catch (error) {
          console.error('Error updating firstname:', error);
          alert('Failed to update firstname. Please try again later.');
        }
      };
    

      useEffect(() => {
        const fetchPhoneFromDatabase = async () => {
          try {
            // Retrieve the user ID from AsyncStorage or any other stored state
            const emailAddress = await AsyncStorage.getItem('userP');
            if (!emailAddress) {
              alert('User not found. Please log in again.');
              return;
            }
            
      
            // Fetch the latest phone number from the database
            const response = await axios.get('http://192.168.8.142:5001/get-user-dataP', {
                params: { emailAddress}
              });

              const { username, phone } = response.data.data;

     
              setPhone(phone);
              await AsyncStorage.setItem('phoneP', phone);

              setUsername(username);
              await AsyncStorage.setItem('username', username);

              setemailAddress(emailAddress);
              await AsyncStorage.setItem('userP', emailAddress);

            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchPhoneFromDatabase();
      }, []);
    

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('isLoggedINP');
            router.replace('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handlePress = () => {
      router.push('/resetP'); // Navigate to the /reset route
    };


    const toggleEditUsername = () => setIsEditingUsername(!isEditingUsername);
    const toggleEditPhone = () => setIsEditingPhone(!isEditingPhone);
    const toggleEditPassword = () => setIsEditingPassword(!isEditingPassword);

    return (
        <LinearGradient
        colors={['#8C78F0', 'rgba(140, 120, 140, 0)']}
        locations={[0.37, 0.91]}
        style={styles.container}
    >
            <TouchableOpacity style={styles.iconContainerm}>
                <Ionicons name="notifications-outline" size={30} color="#ffffff"  />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainerb}>
                <Ionicons name="chatbubble-outline" size={30} color="#ffffff"  />
            </TouchableOpacity>

            <View style={styles.box}/>
                
            
            <TouchableOpacity style={styles.box1}>
                <Image source={require('./../../assets/images/profile.png')} style={styles.profileImage} />
            </TouchableOpacity>
            <Text style={styles.hellovirajText}>Hello {username},</Text>
            
            <Text style={styles.profileText}>Profile</Text>
            <View style={styles.box2}>
            

            <Text style={styles.label}>Username</Text>
      <View style={styles.inputContainer}>
        {isEditingUsername ? (
          <TextInput
            autoCapitalize="none"
            value={username}
            placeholder="firstname"
            placeholderTextColor="#ACACAA"
            onChangeText={setUsername}
            style={styles.inputField}
            
          />
        ) : (
          <Text style={styles.inputField}>{username}</Text>
        )}
        {isEditingUsername ? (
          <TouchableOpacity onPress={updateUsername} style={styles.saveIcon}>
            <FontAwesome name="save" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleEditUsername} style={styles.editIcon}>
            <FontAwesome name="edit" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

     
      <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        autoCapitalize="none"
                        value={emailAddress}
                        placeholder="Email"
                        placeholderTextColor="#ACACAA"
                        onChangeText={setEmailAddress}
                        style={styles.inputField}
                        keyboardType="email-address"
                        editable={false}
                    />
                </View>

     <Text style={styles.label}>Phone</Text>
      <View style={styles.inputContainer}>
        {isEditingPhone ? (
          <TextInput
            autoCapitalize="none"
            value={phone}
            placeholder="Phone"
            placeholderTextColor="#ACACAA"
            onChangeText={setPhone}
            style={styles.inputField}
            keyboardType="phone-pad"
          />
        ) : (
          <Text style={styles.inputField}>{phone}</Text>
        )}
        {isEditingPhone ? (
          <TouchableOpacity onPress={updatePhone} style={styles.saveIcon}>
            <FontAwesome name="save" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleEditPhone} style={styles.editIcon}>
            <FontAwesome name="edit" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
           
                        <TextInput
                            autoCapitalize="none"
                            value={password}
                            placeholder="**********"
                            placeholderTextColor="#ACACAA"
                            onChangeText={setPassword}
                            style={styles.inputField}
                            editable={false}
                        />
                  
                    <TouchableOpacity onPress={handlePress} style={styles.editIcon}>
                        <FontAwesome name="edit" size={24} color="black" />
                    </TouchableOpacity>
                  
            </View>

            <TouchableOpacity style={styles.button} onPress={logout} >
            <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
            <View style={styles.box4}>
              <Text style={styles.doText}>Do you have any Trouble?</Text>
              <TouchableOpacity>
              <Text style={styles.usText}>Contact Us</Text>
              </TouchableOpacity>
              </View>



              </View>
            
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('1%'),
    },
    iconContainerb: {
        flexDirection: 'row',
        position: 'absolute',
        top: hp('5.6%'),
        right: wp('4.8%'),
    },
    button: {
        
        backgroundColor: '#8C78F0',
        padding: hp('1.5%'),
        borderRadius: 99,
        alignItems: 'center',
        marginTop: hp('2%'),
        width: wp('79%'),
    },
    buttonText: {
        color: '#fff',
        fontSize:  hp('1.9%'),
        fontWeight: 'bold',
    },
    iconContainerm: {
        flexDirection: 'row',
        position: 'absolute',
        top: hp('5.6%'),
        right: wp('15.7%'),
    },
   
    label: {
    alignSelf: 'flex-start',
    marginLeft: wp('1%'),
    fontSize: hp('1.9%'),
    color: '#000',
    marginBottom: hp('0.4%'),
    marginTop: hp('0.4%'),
        
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',    
       
    },
    
    doText:{
        color: '#000',
        left: -wp('3%'),
        top: hp('1.1%'),
        fontSize:hp('1.6%'),

    },
    usText:{
        color: '#8C78F0',
        left: wp('40%'),
        top: -hp('0.8%'),
        fontSize: hp('1.6%'),
    },
    inputField: {
       
    marginVertical:  hp('0.5%'),
    height: hp('5%'),
    width:wp('79%'),
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 15,
    padding: wp('3%'),
    backgroundColor: '#fff',
        
    },
    box2:{
        top: hp('7%'),

    },
    editIcon: {
        marginLeft: -wp('7%'),
        top: hp('0.1%'),
    },
    box: {
        position: 'absolute',
        
        width: '100%',
        height: hp('80%'),
        backgroundColor: '#ffffff',
        top: hp('20%'),
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        borderRadius: wp('10%'),
        alignItems: 'center', // Center the profile image horizontally
        justifyContent: 'center', // Center the profile image vertically
    },
    box1:{
        top: -hp('9%'),
        left: -wp('40%'),
    },
    box4:{
       left: wp('11%'), 

    },
    profileImage: {
        width: hp('7%'),
        height: hp('7%'),
        borderRadius: 13,
         // Adjust this value to position the image correctly
    },
    hellovirajText:{
        color: '#ffffff',
        fontSize: hp('2.2%'),
        fontWeight: 'bold',
        position: 'absolute',
        left: wp('20%'),
        top: hp('11%'),
    },
    idText:{
        color: '#ffffff',
        fontSize: hp('2.2%'),
        fontWeight: '400',
        position: 'absolute',
        left: wp('20%'),
        top:hp('12%'),
    },
    profileText:{
        color: '#000',
        fontSize: hp('3.4%'),
        fontWeight: 'bold',
        position: 'absolute',
        left:  wp('9%'),
        top: hp('22%'),
    },
    saveIcon: {
        marginLeft: -wp('7%'),
        top: hp('0.1%'),
    },
});