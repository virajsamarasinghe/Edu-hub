import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet,Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QRCodePage() {
    const [qrCode, setQRCode] = useState('');

    useEffect(() => {
        const fetchQRCode = async () => {
            try {
                const studentId = await AsyncStorage.getItem('userId');
                if (!studentId) {
                    alert('User not found. Please log in again.');
                    return;
                }

                const response = await axios.get('http://192.168.8.142:5001/get-qr-code', {
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
        width: 300,
        height: 300,
        resizeMode: 'contain',
        borderRadius: 35,
    },
});
