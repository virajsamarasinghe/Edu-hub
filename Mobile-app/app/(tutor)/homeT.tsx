import { View, Text, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect ,useNavigation} from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




export default function Home() {
    
    

    const [username, setUsername] = useState('');
    const navigation = useNavigation();
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                return true; // Return true to prevent default behavior (going back)
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

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
                params: { emailAddress }
              });

              const { username } = response.data.data;

    
              setUsername(username);
              await AsyncStorage.setItem('firstName', username);

            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchPhoneFromDatabase();
      }, []);
      const handleQuizPress = () => {
        router.push('/quizT'); // Navigate to the /attendance route
      };
      
      const handleResourcesPress = () => {
        router.push('/progressT'); // Navigate to the /progress route
      };
      const handleContactPress = () => {
        router.push('/contactT'); // Navigate to the /progress route
      };
      const handleAdvicesPress = () => {
        router.push('/advicesT'); // Navigate to the /progress route
      };
      const handleAttendancePress = () => {
        router.push('/attendanceT'); // Navigate to the /attendance route
      };
      const handleProgressPress = () => {
        router.push('/progressT'); // Navigate to the /progress route
      };


    return (
        <LinearGradient
            colors={['#8C78F0', 'rgba(140, 120, 140, 0)']}
            locations={[0.37, 0.91]}
            style={styles.container}
        >
           
                <TouchableOpacity style={styles.iconContainerb}>
                <Ionicons name="chatbubble-outline" size={30} color="#ffffff" />


            </TouchableOpacity>
            <TouchableOpacity style={styles.box1} onPress={handleQuizPress}>
            <Image source={require('./../../assets/icon/quiz.png')} style={styles.quizImage} />
            <Text style={styles.quizText}>Quiz</Text>
            <Text style={styles.quiznoteText}>Add Quizes </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box2} onPress={handleResourcesPress}>
            <Image source={require('./../../assets/icon/resourcess.png')} style={styles.resourcesImage} />
                <Text style={styles.resourcesText}>Resources</Text>
                <Text style={styles.resourcenoteText}>You can upload all the resources from here!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box3} onPress={handleContactPress}>
            <Image source={require('./../../assets/icon/notification.png')} style={styles.progressImage} />
                <Text style={styles.progressText}>Noticeboard</Text>
                <Text style={styles.progressnoteText}>Add new Notifications
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box4} onPress={handleAdvicesPress}>
            <Image source={require('./../../assets/icon/chat.png')} style={styles.chatImage} />
                <Text style={styles.chatText}>Your Advices</Text>
                <Text style={styles.chatnoteText}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box5} onPress={handleProgressPress}>
            <Image source={require('./../../assets/icon/progress.png')} style={styles.resourcesImage} />
                <Text style={styles.resourcesText}>Progress</Text>
                <Text style={styles.resourcenoteText}> Your Students progress </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box6} onPress={handleAttendancePress}>
            <Image source={require('./../../assets/icon/attendance.png')} style={styles.quizImage} />
            <Text style={styles.quizText}>Attendance</Text>
            <Text style={styles.quiznoteText}>Students Attendance </Text>
            </TouchableOpacity>
            <Text style={styles.eduHubText}>Edu-Hub!</Text>
            <Text style={styles.hellovirajText}>Hello {username},</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainerb: {
        flexDirection: 'row',
        position: 'absolute',
        top: hp('5.6%'),
        right: wp('4.8%'),
    },
    iconContainerm: {
        flexDirection: 'row',
        position: 'absolute',
        top: hp('5.6%'),
        right: wp('15.7%'),
    },
   
    box1: {
        position: 'absolute',
        width: hp('21.2%'),
        height: hp('22.4%'),
        backgroundColor: '#ffffff',
        top: hp('20%'),
        left: wp('2.4%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: wp('8%'),
        borderColor: '#8C78F0',
        borderWidth: 2,
    },
    box2: {
        position: 'absolute',
        width: hp('21.2%'),
        height: hp('22.4%'),
        backgroundColor: '#ffffff',
        top: hp('20%'),
        right: wp('2.4%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: wp('8%'),
        borderColor: '#8C78F0',
        borderWidth: 2,
    },
    box3: {
        position: 'absolute',
        width: hp('21.2%'),
        height: hp('22.4%'),
        backgroundColor: '#ffffff',
        top: hp('43.6%'),
        left: wp('2.4%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: wp('8%'),
        borderColor: '#8C78F0',
        borderWidth: 2,
    },
    box4: {
        position: 'absolute',
        width: hp('21.2%'),
        height: hp('22.4%'),
        backgroundColor: '#ffffff',
        top: hp('43.6%'),
        right: wp('2.4%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: wp('8%'),
        borderColor: '#8C78F0',
        borderWidth: 2,
    },
    box5: {
        position: 'absolute',
        width: hp('21.2%'),
        height: hp('22.4%'),
        backgroundColor: '#ffffff',
        top: hp('67.2%'),
        right: wp('2.4%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: wp('8%'),
        borderColor: '#8C78F0',
        borderWidth: 2,
    },
    box6: {
        position: 'absolute',
        width: hp('21.2%'),
        height: hp('22.4%'),
        backgroundColor: '#ffffff',
        top: hp('67.2%'),
        left: wp('2.4%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: wp('8%'),
        borderColor: '#8C78F0',
        borderWidth: 2,
    },
    welcomeText: {
        color: '#ffffff',
        fontSize: hp('6.3%'),
        fontWeight: '800', // Extra bold
        position: 'absolute',
        left: wp('3%'),
        top: hp('15%'),
    },
    eduHubText: {
        color: '#ffffff',
        fontSize: hp('6.3%'),
        fontWeight: '800', // Extra bold
        position: 'absolute',
        left: wp('3%'),
        top: hp('9%'), // Adjust this value as needed to position "Edu-Hub!" below "Welcome to"
    },
    hellovirajText: {
        color: '#ffffff',
        fontSize: hp('2.2%'),
        fontWeight: '400', // Extra bold
        position: 'absolute',
        left: wp('4%'),
        top: hp('16%'),
    },
    yourLearningtimeText: {
        color: '#ffffff',
        fontSize: hp('2.2%'),
        fontWeight: '500', // Extra bold
        position: 'absolute',
        left: wp('3%'),
        top: hp('36%'), // Adjust this value as needed to position "Your Learning Time" below "Edu-Hub!"
    },
    quizImage: {
        width: hp('9%'),
        height: hp('9%'),
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: hp('2%'),
        left: -wp('1%'),
    },
    quizText:{
        color: '#000',
        fontSize: hp('2.7%'),
        fontWeight: '400',
        textAlign: 'center',
       
    },
    quiznoteText:{
        color: '#ACACAA',
        fontSize: hp('1.55%'),
        fontWeight: '300',
        textAlign: 'center',
        top: hp('2.5%'),
        
    },
    resourcesImage:{
        width: hp('7.5%'),
        height: hp('7.5%'),
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: hp('2%'),
        left: wp('0%'),
        top: hp('1%'),

    },
    resourcesText:{
        color: '#000',
        fontSize: hp('2.7%'),
        fontWeight: '400',
        textAlign: 'center',
        top: hp('1.4%'),
    },
    resourcenoteText:{
        color: '#ACACAA',
        fontSize: hp('1.55%'),
        fontWeight: '300',
        textAlign: 'center',
        top: hp('2.8%'),
        
        
    },
    progressImage:{
        width: hp('7.5%'),
        height: hp('7%'),
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: hp('2.8%'),
        left: -wp('1%'),
    },
    progressText:{
        color: '#000',
        fontSize: hp('2.7%'),
        fontWeight: '400',
        textAlign: 'center',
        top: hp('1.4%'),
    },
    progressnoteText:{
        color: '#ACACAA',
        fontSize: hp('1.55%'),
        fontWeight: '300',
        textAlign: 'center',
        top: hp('2.8%'),

    },
    chatImage:{
        width: hp('7.5%'),
        height:hp('7.3%'),
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: hp('2.4%'),
        left: -wp('0.8%'),
    },
    chatText:{
        color: '#000',
        fontSize: hp('2.7%'),
        fontWeight: '400',
        textAlign: 'center',
        top: hp('1.4%'),
    },
    chatnoteText:{
        color: '#ACACAA',
        fontSize: hp('1.55%'),
        fontWeight: '300',
        textAlign: 'center',
        top: hp('2.8%'),
    },
});