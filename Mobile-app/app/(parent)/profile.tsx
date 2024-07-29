import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Image, Pressable, Text, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
    const [name1, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('isLoggedINP');
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <LinearGradient
            colors={['#8C78F0', 'rgba(140, 120, 140, 0)']}
            locations={[0.37, 0.91]}
            style={styles.container}
        >
            <TouchableOpacity style={styles.iconContainerm}>
                <Ionicons name="notifications-outline" size={30} color="#ffffff" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainerb}>
                <Ionicons name="chatbubble-outline" size={30} color="#ffffff" style={styles.icon} />
            </TouchableOpacity>

            <View style={styles.box}/>
                
            
            <View style={styles.box1}>
                <Image source={require('./../../assets/images/profile.png')} style={styles.profileImage} />
            </View>
            <Text style={styles.hellovirajText}>Hello Viraj,</Text>
            <Text style={styles.idText}>ID EG/2021/4776</Text>
            <Text style={styles.profileText}>Profile</Text>
            <View style={styles.box2}>
            

            <Text style={styles.label}>Name</Text>
            <TextInput
                autoCapitalize="none"
                value={name1}
                placeholder="Name"
                placeholderTextColor="#ACACAA"
                onChangeText={setName}
                style={styles.inputField}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                autoCapitalize="none"
                value={email}
                placeholder="Email"
                placeholderTextColor="#ACACAA"
                onChangeText={setEmail}
                style={styles.inputField}
                keyboardType="email-address"
            />

            <Text style={styles.label}>Phone</Text>
            <TextInput
                autoCapitalize="none"
                value={phone}
                placeholder="Phone"
                placeholderTextColor="#ACACAA"
                onChangeText={setPhone}
                style={styles.inputField}
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                autoCapitalize="none"
                value={password}
                placeholder="Password"
                placeholderTextColor="#ACACAA"
                onChangeText={setPassword}
                style={styles.inputField}
                secureTextEntry
            />

            <Pressable style={styles.button} onPress={logout} >
            <Text style={styles.buttonText}>Log out</Text>
            </Pressable>
            <View style={styles.box4}>
              <Text style={styles.doText}>Do you have any Trouble?</Text>
              <Text style={styles.usText}>Contact Us</Text>
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
    },
    iconContainerb: {
        flexDirection: 'row',
        position: 'absolute',
        top: 50,
        right: 20,
    },
    button: {
        backgroundColor: '#8C78F0', // Example color
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF', // Example text color
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconContainerm: {
        flexDirection: 'row',
        position: 'absolute',
        top: 50,
        right: 65,
    },
    icon: {
        marginLeft: 10,
    },
    label: {
        marginTop: 10,
        fontSize: 18,
        color: '#000',
        
        marginBottom: 8,
        left: 15,
        
    },
    doText:{
        color: '#000',
        left: 15,
        top: 10,
        fontSize:15,

    },
    usText:{
        color: '#8C78F0',
        left: 170,
        top: -4,
        fontSize: 15,
    },
    inputField: {
        width: 370,
        height: 40,
        alignItems: 'center',
        borderColor: '#ACACAA',
        borderWidth: 1,
        borderRadius: 15,
        paddingLeft: 10,
        color: '#000',
        marginBottom: 10,
        
    },
    box2:{
        top: 30,

    },
    box: {
        position: 'absolute',
        width: 410,
        height: 694,
        backgroundColor: '#ffffff',
        top: 165,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 45,
        alignItems: 'center', // Center the profile image horizontally
        justifyContent: 'center', // Center the profile image vertically
    },
    box1:{
        top: -73,
        left: -163,
    },
    box4:{
       left: 45, 

    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 13,
        marginTop: -50, // Adjust this value to position the image correctly
    },
    hellovirajText:{
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '400',
        position: 'absolute',
        left: 80,
        top: 75,
    },
    idText:{
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '400',
        position: 'absolute',
        left: 80,
        top:100,
    },
    profileText:{
        color: '#000',
        fontSize: 34,
        fontWeight: '600',
        position: 'absolute',
        left: 25,
        top: 201,
    },
});