import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window'); // Get the screen width for responsiveness

const Quiz = () => {
    const router = useRouter();

    const quizData = [
        { id: '1', title: 'Coming Soon', subtitle: 'Statistics', isComingSoon: true },
        { id: '2', title: 'Maths', subtitle: 'Statistics' },
        { id: '3', title: 'Maths', subtitle: 'Statistics' },
        { id: '4', title: 'Maths', subtitle: 'Statistics' },
        { id: '5', title: 'Maths', subtitle: 'Statistics' },
        { id: '6', title: 'Maths', subtitle: 'Statistics' },
        { id: '7', title: 'Maths', subtitle: 'Statistics' },
        { id: '8', title: 'Maths', subtitle: 'Statistics' },
        { id: '9', title: 'Maths', subtitle: 'Statistics' },
    ];

    const handleQuizDetailsPress = () => {
        // router.push('/quizDetails'); // Navigate to the /quizDetails route
    };

    const openBottomSheet = () => {
        // Define the functionality for opening the bottom sheet here
    };

    const renderItem = ({ item }: { item: { id: string; title: string; subtitle: string; isComingSoon?: boolean } }) => (
        <TouchableOpacity
            style={[
                styles.card,
                item.isComingSoon && styles.comingSoonCard,
                { width: width * 0.9 }, // Make cards 90% of the screen width
            ]}
            onPress={item.isComingSoon ? undefined : handleQuizDetailsPress} // Navigate only if isComingSoon is false
        >
            <View style={styles.iconContainer}>
                <Ionicons name="stats-chart" size={35} color="#8C78F0" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>
    );

    return (
        <LinearGradient colors={['#8C78F0', '#D1C4F7']} style={styles.container}>
            <View style={styles.header } >
                <TouchableOpacity  onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Quiz</Text>
                <TouchableOpacity  onPress={openBottomSheet}>
            <FontAwesome name="plus" size={30} color="#ffffff"   />
            </TouchableOpacity>
            </View>

            {/* Spacer for the line to appear lower */}
            <View style={styles.dividerSpacer} />

            <FlatList
                data={quizData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    headerText: {
        color: '#ffffff',
        fontSize: hp('3.8%'),
        fontWeight: '600',
        position: 'absolute',
        left: wp('3%'),
        top: hp('10%'),
    },
    dividerSpacer: {
        height: 41, // Adjust this to control the spacing
    },
    listContainer: {
        alignItems: 'center', // Center the FlatList items for responsiveness
        paddingBottom: 10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    comingSoonCard: {
        opacity: 0.7,
    },
    iconContainer: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 15,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: width > 350 ? 18 : 16, // Adjust font size based on screen width
        fontWeight: 'bold',
        color: '#000',
    },
    cardSubtitle: {
        fontSize: width > 350 ? 14 : 12, // Adjust subtitle size for smaller screens
        color: '#888',
    },
});

export default Quiz;
