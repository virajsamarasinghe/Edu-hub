import {View,Text, Pressable} from 'react-native'
import React from 'react'
import {useAuth} from '../../context/authContext'




export default function home(){
    const { logout } = useAuth();
    const handleLogout = async() => {
        await logout();
    };
    return(
        <View>
            <Text>Welcome</Text>

            <Pressable onPress={handleLogout} style={{padding:80}}>
                <Text>Signout</Text>
            </Pressable>

        </View>
    )
}

