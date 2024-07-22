import React from 'react';
import { Stack } from 'expo-router';

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown:false,
        headerStyle: {
          backgroundColor: '#6c47ff',
        },
        headerTintColor: '#fff',
        headerBackTitle: 'Back',
      }}>

      <Stack.Screen
        name="start"
        options={{
          headerTitle: 'Start',
        }}></Stack.Screen>
        
      <Stack.Screen
        name="login"
        options={{
          headerTitle: 'Login',
        }}></Stack.Screen>

       <Stack.Screen
        name="loginT"
        options={{
          headerTitle: 'LoginT',
        }}></Stack.Screen>

       <Stack.Screen
        name="loginP"
        options={{
          headerTitle: 'LoginP',
        }}></Stack.Screen>

      <Stack.Screen
        name="signup"
        options={{
          headerTitle: 'Create Account',
        }}></Stack.Screen>

      <Stack.Screen
        name="signupP"
        options={{
          headerTitle: 'Create Account',
        }}></Stack.Screen>



    </Stack>
  );
};

export default PublicLayout;
