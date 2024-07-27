import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import quiz from '../../assets/icon/quiz.png'; 
import resources from '../../assets/icon/resourcess.png';
import progress from '../../assets/icon/progress.png';
import chat from '../../assets/icon/chat.png';

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
            <View style={styles.box1}>
                <Image source={quiz} style={styles.quizImage} />
                <Text style={styles.quizText}>Quiz</Text>
                <Text style={styles.quiznoteText}>Upcoming Quizes</Text>
            </View>
            <View style={styles.box2} >
            <Image source={resources} style={styles.resourcesImage} />
                <Text style={styles.resourcesText}>Resources</Text>
                <Text style={styles.resourcenoteText}>You can download all the resources from here!</Text>
            </View>
            <View style={styles.box3} >
            <Image source={progress} style={styles.progressImage} />
                <Text style={styles.progressText}>Progress</Text>
                <Text style={styles.progressnoteText}>Your progress according{'\n'} to your marks</Text>
            </View>
            <View style={styles.box4} >
            <Image source={chat} style={styles.chatImage} />
                <Text style={styles.chatText}>Tutor’s
                Advices</Text>
                <Text style={styles.chatnoteText}>Ask questions</Text>
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
    box1: {
        position: 'absolute',
        width: 190,
        height: 200,
        backgroundColor: '#ffffff',
        top: 360,
        left: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 30,
    },
    box2: {
        position: 'absolute',
        width: 190,
        height: 200,
        backgroundColor: '#ffffff',
        top: 360,
        right: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 30,
    },
    box3: {
        position: 'absolute',
        width: 190,
        height: 200,
        backgroundColor: '#ffffff',
        top: 580,
        left: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 30,
    },
    box4: {
        position: 'absolute',
        width: 190,
        height: 200,
        backgroundColor: '#ffffff',
        top: 580,
        right: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 30,
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
    },
    quizImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 20,
        left: -5,
    },
    quizText:{
        color: '#000',
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
       
    },
    quiznoteText:{
        color: '#ACACAA',
        fontSize: 14,
        fontWeight: '300',
        textAlign: 'center',
        top: 20,
        
    },
    resourcesImage:{
        width: 65,
        height: 70,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 20,
        left: 0,
        top: 7.5,

    },
    resourcesText:{
        color: '#000',
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
        top: 12,
    },
    resourcenoteText:{
        color: '#ACACAA',
        fontSize: 14,
        fontWeight: '300',
        textAlign: 'center',
        top: 30,
        
    },
    progressImage:{
        width: 60,
        height: 60,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 20,
        left: -5,
    },
    progressText:{
        color: '#000',
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
        top: 12,
    },
    progressnoteText:{
        color: '#ACACAA',
        fontSize: 14,
        fontWeight: '300',
        textAlign: 'center',
        top: 30,

    },
    chatImage:{
        width: 65,
        height: 65,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 20,
        left: -5,
    },
    chatText:{
        color: '#000',
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
        top: 12,
    },
    chatnoteText:{
        color: '#ACACAA',
        fontSize: 14,
        fontWeight: '300',
        textAlign: 'center',
        top: 30,
    },
});