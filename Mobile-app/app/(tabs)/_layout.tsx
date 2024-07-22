import React from 'react'
import {Tabs} from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';





export default function TabLayout(){
    return(
        <Tabs screenOptions={{headerShown:false}}>
            <Tabs.Screen name='home'
            options={{
                tabBarLabel: 'Home',
                tabBarIcon:({color})=><Ionicons name="home" size={24} color={color} />
            }}
            />
            <Tabs.Screen name='schedule'
            options={{
                tabBarLabel: 'Schedule',
                tabBarIcon:({color})=><MaterialCommunityIcons name="shopping-outline" size={24} color={color} /> 
             }}
            />

            <Tabs.Screen name='classFee'
            options={{
                tabBarLabel: 'Class Fee',
                tabBarIcon:({color})=><Ionicons name="cart-outline" size={24} color={color} />
                
            }}  
                      
            />
            <Tabs.Screen name='profile'
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon:({color})=><MaterialCommunityIcons name="account-outline" size={24} color={color} />,
               
            }}  
                      
            />
            
        </Tabs>

    )
}