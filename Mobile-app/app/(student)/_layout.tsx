import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: { 
                backgroundColor: '#8C78F0',
                borderTopLeftRadius: hp('2%'),
                borderTopRightRadius: hp('2%'),
            },
            tabBarActiveTintColor: '#FFD700',
            tabBarInactiveTintColor: '#ffffff',
            tabBarLabelStyle: {

                fontSize: hp('1.3%'),

                
                 // Adjust this value to reduce the gap between icon and label
            },
            tabBarItemStyle: {
                marginTop: hp('1%'), // Adjust this value to move the icon and label down
            }
        }}>
            <Tabs.Screen name='home'
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={26} color={color} />
                }}
            />
            <Tabs.Screen name='schedule'
                options={{
                    tabBarLabel: 'Schedule',
                    tabBarIcon: ({ color }) => <FontAwesome name="calendar-times-o" size={26} color={color} />
                }}
            />
            <Tabs.Screen name='classFee'
                options={{
                    tabBarLabel: 'Class Fee',
                    tabBarIcon: ({ color }) => <MaterialIcons name="payments" size={26} color={color} />
                }}
            />
            <Tabs.Screen name='profile'
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-outline" size={26} color={color} />,
                }}
            />
        </Tabs>
    );
}