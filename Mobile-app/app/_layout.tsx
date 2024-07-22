import { Stack } from "expo-router";
import{useFonts} from "expo-font";
import {View,Text} from 'react-native';
import React, {useEffect} from 'react';
import {Slot,useRouter, useSegments} from 'expo-router';
import {AuthContextProvider,useAuth} from '../context/authContext';


const MainLayout = ()=>{
  const {isAuthenticated}= useAuth();
  const segments= useSegments();
  const router = useRouter();

  useEffect(()=>{
    if(typeof isAuthenticated=='undefined')return;
    const inApp= segments[0]=='(tabs)';
    if(isAuthenticated && !inApp){
      router.replace('/home');

    }else if(isAuthenticated==false){
      router.replace('/start');
    }
  },[isAuthenticated])

  return <Slot/>

}

export default function RootLayout() {
  useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium':require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf'),
  })
  return (
    <AuthContextProvider>
      <MainLayout/>
    </AuthContextProvider>

  );
}
