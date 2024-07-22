import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Text, Alert,Image } from 'react-native';
import LottieView from 'lottie-react-native';





export default function Start() {



        return (
        <View style={{
            backgroundColor: 'rgba(140, 120, 240, 1)',
            height: '100%'
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 100
            }}>
                <Image source={require('./../../assets/images/login.png')} 
                    style={{
                        width: 160,
                        height: 342,
                        borderRadius: 20,
                        borderWidth: 6,
                        borderColor: '#000',
                        marginLeft:30
                    }}
                />

                <Image source={require('./../../assets/images/login.png')} 
                    style={{
                        width: 160,
                        height: 342,
                        borderRadius: 20,
                        borderWidth: 6,
                        borderColor: '#000',
                        marginLeft:30
                    }}
                />
            </View>
            <View style={{alignItems:'center',marginTop:-300}}>
                <Image source={require('./../../assets/images/login.png')} 
                    style={{
                        width: 160,
                        height: 342,
                        borderRadius: 20,
                        borderWidth: 6,
                        borderColor: '#000'
                    }}
                />
                </View>

            <View style={{backgroundColor: 'rgba(140, 120, 240, 1)',padding: 20, alignItems: 'center',marginTop:10}} >  
                <Text style={{color: '#fff', fontSize: 25, fontFamily: 'outfit-bold', textAlign: 'center'}}>Integrated Virtual
                    <Text style={{color: '#000000'}}> Education and Progress</Text> System
                </Text> 
                <Text style={{fontSize: 16, fontFamily: 'outfit', textAlign: 'center', marginVertical: 20, color: '#000000'}}>IVEPS integrates virtual classrooms, personalized pathways, 
                AI-driven progress tracking, and optimizes learning outcomes.</Text>

            </View>
            <View style={styles.welcome}>
            <LottieView style={{flex:1}} source={require('../../assets/animation/2.json')} autoPlay loop/>
            </View>
            <Link href="/login" asChild>
            <Pressable style={{    backgroundColor: '#6c47ff',
    padding: 12,
    borderRadius: 99,
    alignItems: 'center',
    marginTop: 16,
    width:'50%',
    height:55,
    marginLeft:'25%',}} >
            <Text style={{color:'#fff',fontFamily:'outfit',fontSize:20,paddingTop:3,textAlign:'center'}}>Get Start  </Text>
            </Pressable>
            </Link>            
            

        </View>
    );

    
    
};


const styles = StyleSheet.create({
    welcome:{
        height:120, 
        marginTop:-30
        
        
      },

})