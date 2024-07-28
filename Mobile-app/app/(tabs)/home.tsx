import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';




export default function Home() {
    return (
        <LinearGradient
            colors={['#8C78F0', 'rgba(140, 120, 140, 0)']}
            locations={[0.37, 0.91]}
            style={styles.container}
        >
            <TouchableOpacity style={styles.iconContainerm}>
                <Ionicons name="notifications-outline" size={30} color="#ffffff" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainerb}>
                <Ionicons name="chatbubble-outline" size={30} color="#ffffff" style={styles.icon} />


            </TouchableOpacity>
            <TouchableOpacity style={styles.box1}>
                <Image source={require('./../../assets/icon/quiz.png')} style={styles.quizImage} />
                <Text style={styles.quizText}>Quiz</Text>
                <Text style={styles.quiznoteText}>Upcoming Quizes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box2} >
            <Image source={require('./../../assets/icon/resourcess.png')} style={styles.resourcesImage} />
                <Text style={styles.resourcesText}>Resources</Text>
                <Text style={styles.resourcenoteText}>You can download all the resources from here!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box3} >
            <Image source={require('./../../assets/icon/progress.png')} style={styles.progressImage} />
                <Text style={styles.progressText}>Progress</Text>
                <Text style={styles.progressnoteText}>Your progress according{'\n'} to your marks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box4} >
            <Image source={require('./../../assets/icon/chat.png')} style={styles.chatImage} />
                <Text style={styles.chatText}>Tutor’s
                Advices</Text>
                <Text style={styles.chatnoteText}>Ask questions</Text>
            </TouchableOpacity>
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
    iconContainerb: {
        flexDirection: 'row',
        position: 'absolute',
        top: 50,
        right: 20,
    },
    iconContainerm: {
        flexDirection: 'row',
        position: 'absolute',
        top: 50,
        right: 65,
    },
    icon: {
        marginLeft: 10,
    },
    box1: {
        position: 'absolute',
        width: 190,
        height: 200,
        backgroundColor: '#ffffff',
        top: 365,
        left: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 30,
        borderColor: '#8C78F0',
        borderWidth: 2,
    },
    box2: {
        position: 'absolute',
        width: 190,
        height: 200,
        backgroundColor: '#ffffff',
        top: 365,
        right: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 30,
        borderColor: '#8C78F0',
        borderWidth: 2,
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
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 30,
        borderColor: '#8C78F0',
        borderWidth: 2,
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
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 30,
        borderColor: '#8C78F0',
        borderWidth: 2,
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