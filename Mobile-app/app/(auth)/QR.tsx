import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet,Text,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function QRCodePage() {
    const router = useRouter();
    const [qrCode, setQRCode] = useState('');

    useEffect(() => {
        const fetchQRCode = async () => {
            try {
                const studentId = await AsyncStorage.getItem('userId');
                if (!studentId) {
                    alert('User not found. Please log in again.');
                    return;
                }

                const response = await axios.get('http://192.168.8.144:5001/get-qr-code', {
                    params: { studentId }
                });

                setQRCode(response.data.qrCode);
            } catch (error) {
                console.error('Error fetching QR code:', error);
            }
        };

        fetchQRCode();
    }, []);

    return (
        <LinearGradient
        colors={['#8C78F0', 'rgba(140, 120, 140, 0)']}
        locations={[0.37, 0.91]}
        style={styles.container}
    >

<View style={styles.iconContainer}>
    <TouchableOpacity onPress={()=>router.back()}>
      <Ionicons name="arrow-back-outline" size={wp('7%')} style={styles.icon1} color="white" />
    </TouchableOpacity>
      </View>

      <Text style={styles.welcomeText}>Scan Me!</Text>
        <View style={styles.container}>
            {qrCode ? (
                <Image
                    style={styles.qrImage}
                    source={{ uri: qrCode }}
                />
            ) : (
                <Text>Loading QR code...</Text>
            )}
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
    qrImage: {
        width: hp('35%'),
        height: hp('35%'), // Adjusted to be square
        resizeMode: 'contain',
        borderRadius: hp('5%'), // Updated to provide a large, circular border radius
        borderWidth: hp('0.5%'), 
        borderColor: '#fff',// 
        
    },
    icon1: {
        marginRight: wp('2%'),
        marginTop: hp('2.5%')
      },
    iconContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999,
        paddingTop: hp('2%'),
        paddingHorizontal: wp('3%'),
        backgroundColor: 'transparent',
      },
      welcomeText: {
        color: '#ffffff',
        fontSize: hp('6.3%'),
        fontWeight: '800', // Extra bold
        position: 'absolute',
        
        top: hp('15%'),
        alignItems: 'center',
    },
});
