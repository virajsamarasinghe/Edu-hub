import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const QuizDetails = () => {
  const router = useRouter(); // Initialize the router from expo-router
  const [countdown, setCountdown] = useState(3600); // 1 hour countdown (3600 seconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev: number) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    return formattedTime;
  };

  return (
    <LinearGradient colors={['#8C78F0', '#D1C4F7']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}> {/* Use router.back() for going back */}
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Quiz Details</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <Ionicons name="checkmark-circle-outline" size={60} color="#8C78F0" style={styles.icon} />
        <Text style={styles.quizTitle}>Mathematician</Text>
        <Text style={styles.quizSubtitle}>Solving Mathematical Problems</Text>
        <Text style={styles.quizDescription}>Test your knowledge in algebra, calculus, and geometry.</Text>

        <Text style={styles.quizDetail}>Start Time: {formatTime(1627564800)}</Text>
        <Text style={styles.quizDetail}>End Time: {formatTime(1627572000)}</Text>
        <Text style={styles.quizDetail}>Duration: 1h 30m</Text>

        <View style={styles.countdownContainer}>
          <Text style={styles.countdownLabel}></Text>
          <Text style={styles.countdown}>{formatTime(countdown)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() =>router.push('/question')}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/quiz')}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginTop: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    marginBottom: 15,
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8C78F0',
    marginTop: 10,
  },
  quizSubtitle: {
    fontSize: 18,
    color: '#8C78F0',
    marginTop: 5,
  },
  quizDescription: {
    fontSize: 16,
    color: '#8C78F0',
    marginTop: 10,
    textAlign: 'center',
  },
  quizDetail: {
    fontSize: 16,
    color: '#8C78F0',
    marginTop: 10,
    textAlign: 'center',
  },
 
  countdownLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  countdown: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8C78F0',
    left: wp('36%'),
    top: hp('-33%'),
  },
  button: {
    backgroundColor: '#8C78F0',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizDetails;
