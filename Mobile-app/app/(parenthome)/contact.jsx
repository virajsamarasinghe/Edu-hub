import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';

const Advices = () => {
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState(null); // Correctly initialized with useState
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Automatically set today's date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate);
  }, []);

  const handleSubmit = async () => {
    if (!studentId) {
      setErrorMessage('Please enter Student ID');
      return;
    }

    if (attendanceStatus === null) {
      setErrorMessage('Please select attendance status');
      return;
    }

    try {
      const response = await axios.post('http://192.168.8.153:5001/save-attendance', {
        date,
        studentId,
        attendanceStatus, // Sending boolean directly
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Attendance data submitted successfully');
        setErrorMessage('');
        setStudentId('');
        setAttendanceStatus(null); // Reset the form
      } else {
        setErrorMessage('Failed to submit attendance data');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting attendance data');
    }
  };

  return (
    <LinearGradient
      colors={['#8C78F0', 'rgba(140, 120, 140, 0)']}
      locations={[0.37, 0.91]}
      style={styles.container}
    >
      <TouchableOpacity style={styles.iconContainerm}>
        <Ionicons name="notifications-outline" size={30} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainerb}>
        <Ionicons name="chatbubble-outline" size={30} color="#ffffff" />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.text}>Attendance Page</Text>
        <TextInput
          style={styles.input}
          placeholder="Student ID"
          placeholderTextColor="#ffffff"
          value={studentId}
          onChangeText={setStudentId}
        />
        <TextInput
          style={styles.input}
          placeholder="Date"
          placeholderTextColor="#ffffff"
          value={date}
          onChangeText={setDate}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.statusButton,
              attendanceStatus === true && styles.selectedButton,
            ]}
            onPress={() => setAttendanceStatus(true)} // Set attendanceStatus to true
          >
            <Text style={styles.statusButtonText}>Present</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusButton,
              attendanceStatus === false && styles.selectedButton,
            ]}
            onPress={() => setAttendanceStatus(false)} // Set attendanceStatus to false
          >
            <Text style={styles.statusButtonText}>Absent</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerm: {
    position: 'absolute',
    top: hp('5%'),
    left: wp('5%'),
  },
  iconContainerb: {
    position: 'absolute',
    top: hp('5%'),
    right: wp('5%'),
  },
  text: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    width: wp('80%'),
    height: hp('6%'),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('80%'),
    marginBottom: 20,
  },
  statusButton: {
    width: wp('35%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectedButton: {
    backgroundColor: '#8C78F0',
  },
  statusButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  submitButton: {
    width: wp('80%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#8C78F0',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
});

export default Advices;