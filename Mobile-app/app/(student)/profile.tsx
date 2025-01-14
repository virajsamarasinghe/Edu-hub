import React, { useState , useEffect } from 'react';
import { Button, TextInput, View, StyleSheet, Image, Pressable, Text, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




export default function Profile() {
    
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isEditingFirstName, setIsEditingFirstName] = useState(false);
    const [isEditingLastName, setIsEditingLastName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [Email, setEmailAddress] = useState('');
    const [studentId, setStudentId] = useState('');
    
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

    //   useEffect(() => {
    //     (async () => {
    //         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //         if (status !== 'granted') {
    //             Alert.alert('Sorry, we need camera roll permissions to upload profile photo!');
    //         }
    //     })();
    // }, []);

    useEffect(() => {
      const loadProfileImage = async () => {
          try {
              const savedImage = await AsyncStorage.getItem('profileImage');
              if (savedImage) {
                  setProfileImage(savedImage);
              }
          } catch (error) {
              console.error('Error loading profile image:', error);
          }
      };

      loadProfileImage();
  }, []);
  
  const pickImage = async (): Promise<void> => {
    try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImageUri = result.assets[0].uri;
            setProfileImage(selectedImageUri); // Now TypeScript knows this is a string
            await uploadImage(selectedImageUri);
        }
    } catch (error) {
        console.error('Error picking image:', error);
        Alert.alert('Error', 'Failed to pick image');
    }
};

  // Function to upload image to server
  const uploadImage = async (imageUri: string) => {
    try {
        const studentId = await AsyncStorage.getItem('userId');
        if (!studentId) {
            Alert.alert('Error', 'User not found. Please log in again.');
            return;
        }

        // Get the file name from the uri
        const uriParts = imageUri.split('.');
        const fileType = uriParts[uriParts.length - 1];

        // Create form data
        const formData = new FormData();
        formData.append('studentId', studentId);
        formData.append('profileImage', {
            uri: Platform.OS === 'android' ? imageUri : imageUri.replace('file://', ''),
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        } as any); // Type assertion to avoid TypeScript error

        const response = await axios.post('http://192.168.8.153:5001/upload-profile-image', formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            transformRequest: (data, headers) => {
                return formData; // Prevent axios from trying to transform the formData
            },
        });

        if (response.data.success) {
            Alert.alert('Success', 'Profile photo updated successfully');
            await AsyncStorage.setItem('profileImage', imageUri);
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Error', 'Failed to upload image');
    }
};
      const updatePhone = async () => {
        if (!phone) {
          alert('Please enter a phone number');
          return;
        }
    
        try {
          const studentId = await AsyncStorage.getItem('userId');
          if (!studentId) {
            alert('User not found. Please log in again.');
            return;
          }
    
          const response = await axios.post('http://192.168.8.153:5001/phone', {
            studentId,
            phone,
          });
    
          // Assuming response.data contains the updated user profile including the phone number
          if (response.data && response.data.phone) {
            setPhone(response.data.phone);
    
            // Store the updated phone number in AsyncStorage
            await AsyncStorage.setItem('phone', response.data.phone);
          }
    
          console.log('Phone number updated successfully:', response.data);
          setIsEditingPhone(false);
        } catch (error) {
          console.error('Error updating phone number:', error);
          alert('Failed to update phone number. Please try again later.');
        }
      };

      const updateFirstname = async () => {
       
    
        try {
          const studentId = await AsyncStorage.getItem('userId');
          if (!studentId) {
            alert('User not found. Please log in again.');
            return;
          }
    
          const response = await axios.post('http://192.168.8.153:5001/firstname', {
            studentId,
            firstName,
          });
    
          // Assuming response.data contains the updated user profile including the phone number
          if (response.data && response.data.firstName) {
            setFirstName(response.data.firstName);
    
            // Store the updated phone number in AsyncStorage
            await AsyncStorage.setItem('firstName', response.data.firstName);
          }
    
          console.log('firstname updated successfully:', response.data);
          setIsEditingFirstName(false);
        } catch (error) {
          console.error('Error updating firstname:', error);
          alert('Failed to update firstname. Please try again later.');
        }
      };
    
      const updateLastname = async () => {
       
    
        try {
          const studentId = await AsyncStorage.getItem('userId');
          if (!studentId) {
            alert('User not found. Please log in again.');
            return;
          }
    
          const response = await axios.post('http://192.168.8.153:5001/lastname', {
            studentId,
            lastName,
          });
    
          // Assuming response.data contains the updated user profile including the phone number
          if (response.data && response.data.lastName) {
            setLastName(response.data.lastName);
    
            // Store the updated phone number in AsyncStorage
            await AsyncStorage.setItem('lastName', response.data.lastName);
          }
    
          console.log('lastname updated successfully:', response.data);
          setIsEditingLastName(false);
        } catch (error) {
          console.error('Error updating lastname:', error);
          alert('Failed to update lastname. Please try again later.');
        }
      };


      useEffect(() => {
        const fetchPhoneFromDatabase = async () => {
          try {
            // Retrieve the user ID from AsyncStorage or any other stored state
            const studentId = await AsyncStorage.getItem('userId');
            if (!studentId) {
              alert('User not found. Please log in again.');
              return;
            }
            
      
            // Fetch the latest phone number from the database
            const response = await axios.get('http://192.168.8.153:5001/get-user-data', {
                params: { studentId }
              });

              const { firstName, emailAddress, phone, lastName } = response.data.data;

     
              setPhone(phone);
              await AsyncStorage.setItem('phone', phone);

              setFirstName(firstName);
              await AsyncStorage.setItem('firstName', firstName);

              setLastName(lastName);
              await AsyncStorage.setItem('lastName', lastName);

              setStudentId(studentId);
              await AsyncStorage.setItem('userId', studentId);

            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchPhoneFromDatabase();
      }, []);
    

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('isLoggedIN');
            router.replace('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handlePress = () => {
      router.push('/reset'); // Navigate to the /reset route
    };

    const handlePressQR = () => {
      router.push('/QR'); // Navigate to the /reset route
    };

    const toggleEditFirstName = () => setIsEditingFirstName(!isEditingFirstName);
    const toggleEditLastName = () => setIsEditingLastName(!isEditingLastName);
    const toggleEditEmail = () => setIsEditingEmail(!isEditingEmail);
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
            <TouchableOpacity style={styles.iconContainerb} onPress={handlePressQR}>
            <AntDesign name="qrcode" size={30} color="#ffffff" />
            </TouchableOpacity>

            <View style={styles.box}/>
                
            
            <TouchableOpacity style={styles.box1} onPress={pickImage}>
                <Image 
                    source={profileImage ? { uri: profileImage } : require('./../../assets/images/profile.png')} 
                    style={styles.profileImage} 
                />
                <View style={styles.editPhotoButton}>
                    <FontAwesome name="camera" size={16} color="#ffffff" />
                </View>
            </TouchableOpacity>
            <Text style={styles.hellovirajText}>Hello {firstName},</Text>
            <Text style={styles.idText}>ID : {studentId}</Text>
            <Text style={styles.profileText}>Profile</Text>
            <View style={styles.box2}>
            

            <Text style={styles.label}>FirstName</Text>
      <View style={styles.inputContainer}>
        {isEditingFirstName ? (
          <TextInput
            autoCapitalize="none"
            value={firstName}
            placeholder="firstname"
            placeholderTextColor="#ACACAA"
            onChangeText={setFirstName}
            style={styles.inputField}
            
          />
        ) : (
          <Text style={styles.inputField}>{firstName}</Text>
        )}
        {isEditingFirstName ? (
          <TouchableOpacity onPress={updateFirstname} style={styles.saveIcon}>
            <FontAwesome name="save" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleEditFirstName} style={styles.editIcon}>
            <FontAwesome name="edit" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.label}>LastName</Text>
      <View style={styles.inputContainer}>
        {isEditingLastName ? (
          <TextInput
            autoCapitalize="none"
            value={lastName}
            placeholder="lastname"
            placeholderTextColor="#ACACAA"
            onChangeText={setLastName}
            style={styles.inputField}
            
          />
        ) : (
          <Text style={styles.inputField}>{lastName}</Text>
        )}
        {isEditingLastName ? (
          <TouchableOpacity onPress={updateLastname} style={styles.saveIcon}>
            <FontAwesome name="save" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleEditLastName} style={styles.editIcon}>
            <FontAwesome name="edit" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
           
                <TextInput
                    autoCapitalize="none"
                    value={Email}
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
        
        width: '97%',
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
        top: -hp('5.6%'),
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
        top: hp('9%'),
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
 
  editPhotoButton: {
      top: hp('-1%'),
      bottom:hp('5%'),
      position: 'absolute',
     
      right: hp('-1%'),
      backgroundColor: '#949494',
      padding: hp('0.5%'),
      borderRadius: 20,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  },
});