import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Svg, Line } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CalendarStrip from 'react-native-calendar-strip'; // Import CalendarStrip

export default function Home() {
    const [selectedBox, setSelectedBox] = useState(2); // Default selected box is Box 2

    const handleBoxPress = (boxNumber: number) => {
        setSelectedBox(boxNumber); // Update selected box
    };

    return (
        <LinearGradient
            colors={['#8C78F0', 'rgba(140, 120, 140, 0)']}
            locations={[0.37, 0.91]}
            style={styles.container}
        >
            {/* Notification Icon */}
            <TouchableOpacity style={styles.iconContainerm}>
                <Ionicons name="notifications-outline" size={30} color="#ffffff" style={styles.icon} />
            </TouchableOpacity>

            {/* Chat Icon */}
            <TouchableOpacity style={styles.iconContainerb}>
                <Ionicons name="chatbubble-outline" size={30} color="#ffffff" style={styles.icon} />
            </TouchableOpacity>

            {/* Calendar Strip */}
            <View style={styles.calendarContainer}>
                <CalendarStrip
                    calendarAnimation={{ type: 'sequence', duration: 30 }}
                    style={{ height: 100, paddingTop: -3 }}
                    calendarHeaderStyle={{ color: '#000', fontSize: 25, marginBottom: 10, marginLeft: -180 }} // Adjust header style and position
                    calendarColor={'transparent'}
                    dateNameStyle={{ color: '#000' }}
                    dateNumberStyle={{ color: '#000' }}
                    highlightDateContainerStyle={{
                        backgroundColor: '#FF7648',
                        borderRadius: 8, // Added border radius
                        padding: 4,       // Optional: Adjust padding for better appearance
                    }}
                    onDateSelected={(date) => console.log(date)} // Handle selected date
                />
            </View>

            {/* White Box */}
            <View style={styles.whiteBox}></View>

            <View style={styles.Box1}>
                <Text style={styles.box1Text}>Today</Text>
            </View>

            {/* Touchable Box 2 */}
            <TouchableOpacity
                style={[
                    styles.Box,
                    selectedBox === 2 && { backgroundColor: '#8C78F0' },
                ]}
                onPress={() => handleBoxPress(2)}
            >
                <Text
                    style={[
                        styles.line1Text,
                        selectedBox === 2 ? styles.selectedText : styles.unselectedText,
                    ]}
                >
                    Theory Class
                </Text>
                <Text
                    style={[
                        styles.line2Text,
                        selectedBox === 2 ? styles.selectedText : styles.unselectedText,
                    ]}
                >
                    Chapter 1: Introduction
                </Text>
                <Text
                    style={[
                        styles.line3Text,
                        selectedBox === 2 ? styles.selectedText : styles.unselectedText,
                    ]}
                >
                    Room 202
                </Text>
                <Text
                    style={[
                        styles.line4Text,
                        selectedBox === 2 ? styles.selectedText : styles.unselectedText,
                    ]}
                >
                    Instructor: Dr. Smith
                </Text>
            </TouchableOpacity>

            {/* Time Label for Box 2 */}
            <View style={[styles.timeLabelContainer, { top: hp('20%'), left: wp('15%') }]}>
                <Text style={styles.timeLabelStart}>10:00</Text>
                <Text style={styles.timeLabelEnd}>11:30</Text>
            </View>

            {/* Touchable Box 3 */}
            <TouchableOpacity
                style={[
                    styles.Box,
                    selectedBox === 3 && { backgroundColor: '#8C78F0' },
                ]}
                onPress={() => handleBoxPress(3)}
            >
                <Text
                    style={[
                        styles.line1Text,
                        selectedBox === 3 ? styles.selectedText : styles.unselectedText,
                    ]}
                >
                    Workshop
                </Text>
                <Text
                    style={[
                        styles.line2Text,
                        selectedBox === 3 ? styles.selectedText : styles.unselectedText,
                    ]}
                >
                    Chapter 3: Animal Kingdom
                </Text>
                <Text
                    style={[
                        styles.line3Text,
                        selectedBox === 3 ? styles.selectedText : styles.unselectedText,
                    ]}
                >
                    Lab 101
                </Text>
                <Text
                    style={[
                        styles.line4Text,
                        selectedBox === 3 ? styles.selectedText : styles.unselectedText,
                    ]}
                >
                    Instructor: Prof. Lee
                </Text>
            </TouchableOpacity>

            {/* Time Label for Box 3 */}
            <View style={[styles.timeLabelContainer, { top: hp('37%'), left: wp('15%') }]}>
                <Text style={styles.timeLabelStart}>2:00</Text>
                <Text style={styles.timeLabelEnd}>3:30</Text>
            </View>

            {/* Touchable Box 4 */}
            <TouchableOpacity
                style={[
                    styles.Box,
                    selectedBox === 4 && { backgroundColor: '#8C78F0' },
                ]}
                onPress={() => handleBoxPress(4)}
            >
                <Text
                    style={[
                        styles.line1Text,
                        selectedBox === 4 ? styles.selectedText : styles.unselectedText,
                    ]}
                >
                    Seminar
                </Text>
                <Text
                    style={[
                        styles.line2Text,
                        selectedBox === 4 ? styles.selectedText : styles.unselectedText,
                    ]}
                >
                    Chapter 2: Economy USA
                </Text>
                <Text
                    style={[
                        styles.line3Text,
                        selectedBox === 4 ? styles.selectedText : styles.unselectedText,
                    ]}
                >
                    Auditorium
                </Text>
                <Text
                    style={[
                        styles.line4Text,
                        selectedBox === 4 ? styles.selectedText : styles.unselectedText,
                    ]}
                >
                    Instructor: Dr. Patel
                </Text>
            </TouchableOpacity>

            {/* Time Label for Box 4 */}
            <View style={[styles.timeLabelContainer, { top: hp('53%'), left: wp('15%') }]}>
                <Text style={styles.timeLabelStart}>5:00</Text>
                <Text style={styles.timeLabelEnd}>6:30</Text>
            </View>

            <Svg height="50%" width="2" style={styles.verticalLine}>
                <Line x1="0" y1="0" x2="0" y2="100%" stroke="#FAF9F9" strokeWidth="9" />
            </Svg>

            

            {/* Existing Text Components */}
            <Text style={styles.welcomeText}>Schedule</Text>
            <Text style={styles.timeText}>Time</Text>
            <Text style={styles.courseText}>Course</Text>
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
    welcomeText: {
        color: '#ffffff',
        fontSize: hp('3.8%'),
        fontWeight: '600',
        position: 'absolute',
        left: wp('3%'),
        top: hp('10%'),
    },
    whiteBox: {
        position: 'absolute',
        width: '95%',
        height: hp('70%'),
        backgroundColor: '#ffffff',
        top: hp('20%'),
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        borderRadius: wp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    Box1: {
        width: 93,
        height: 40,
        backgroundColor: '#4DC591',
        borderRadius: 9,
        left: wp('28.5%'),
        top: hp('4%'),
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.19,
        shadowRadius: 3.84,
        elevation: 5,
    },
    box1Text: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        top: hp('1%'),
    },
    Box: {
        width: 255,
        height: 130,
        backgroundColor: '#F6F6F5',
        borderRadius: 16,
        marginVertical: hp('1%'), // Adds vertical gap between boxes
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('2%'),
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.19,
        shadowRadius: 3.84,
        elevation: 5,
        top: hp('16%'),
        left: wp('9%'),
    },
    line1Text: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 5,
    },
    line2Text: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    line3Text: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 5,
    },
    line4Text: {
        fontSize: 12,
        fontWeight: '300',
    },
    selectedText: {
        color: '#ffffff',
    },
    unselectedText: {
        color: '#000000',
    },
    verticalLine: {
        position: 'absolute',
        left: wp('23%'),
        top: hp('41%'),
    },
    timeLabelContainer: {
        position: 'absolute',
        left: wp('15%'), // Adjust according to your layout
    },
    timeLabelStart: {
        color: '#000000',
        fontSize: 16.7,
        fontWeight: '500',
        top: hp('20%'),
        left: wp('-5%'),
    },
    timeLabelEnd: {
        color: '#BCC1CD',
        fontSize: 14,
        fontWeight: '300',
        top: hp('20%'),
        left: wp('-5%'), // Move to the right to show end time
    },
    timeText: {
        color: '#BCC1CD',
        fontSize: 16.4,
        fontWeight: '600',
        position: 'absolute',
        left: wp('10%'),
        top: hp('36.5%'),
    },
    calendarContainer: {
        position: 'absolute',
        top: hp('23.6%'),
        width: wp('85%'),
        zIndex: 10, // Ensure calendar is on top
        elevation: 10, // For Android
        backgroundColor: 'transparent', // Ensure no background color
    },
    courseText: {
        color: '#BCC1CD',
        fontSize: 16.4,
        fontWeight: '600',
        position: 'absolute',
        left: wp('28%'),
        top: hp('36.5%'),
    },
});
