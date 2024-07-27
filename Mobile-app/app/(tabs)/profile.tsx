import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


export default function Home() {
    return (
        <LinearGradient
            colors={['#8C78F0', 'rgba(140, 120, 240, 0)']}
            locations={[0.37, 0.91]}
            style={styles.container}
        >
            <View style={styles.iconContainer}>
                <Ionicons name="notifications-outline" size={30} color="#ffffff" style={styles.icon} />
                <Ionicons name="chatbubble-outline" size={30} color="#ffffff" style={styles.icon} />
            </View>
           
            
            <Text style={styles.hellovirajText}>Hello Viraj,</Text>
            <Text style={styles.yourLearningtimeText}>Your Learning Time</Text>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.eduHubText}>Edu-Hub!</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 50,
        right: 20,
    },
    icon: {
        marginLeft: 15,
    },
    welcomeText: {
        color: '#ffffff',
        fontSize: 55,
        fontWeight: '800', // Extra bold
        position: 'absolute',
        left: 10,
        top: 135,
    },
    eduHubText: {
        color: '#ffffff',
        fontSize: 55,
        fontWeight: '800', // Extra bold
        position: 'absolute',
        left: 10,
        top: 200, // Adjust this value as needed to position "Edu-Hub!" below "Welcome to"
    },
    hellovirajText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '400', // Extra bold
        position: 'absolute',
        left: 10,
        top: 115,
    },
    yourLearningtimeText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '500', // Extra bold
        position: 'absolute',
        left: 10,
        top: 320, // Adjust this value as needed to position "Your Learning Time" below "Edu-Hub!"
    }
});