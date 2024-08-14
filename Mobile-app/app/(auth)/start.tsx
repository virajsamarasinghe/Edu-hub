
import { Link } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Text, Image, Pressable, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Start() {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <View style={[styles.imageRow, { marginTop: height * 0.1 }]}>
        <Image
          source={require('./../../assets/images/login.png')}
          style={styles.image}
        />
        <Image
          source={require('./../../assets/images/login.png')}
          style={styles.image}
        />
      </View>
      <View style={[styles.centerImage, { marginTop: -hp('35%') }]}>
        <Image
          source={require('./../../assets/images/login.png')}
          style={styles.image}
        />
      </View>

      <View style={[styles.textContainer, { marginTop: -hp('2%') }]}>
        <Text style={styles.title}>
          Integrated Virtual
          <Text style={styles.highlight}> Education and Progress</Text> System
        </Text>
        <Text style={styles.description}>
          IVEPS integrates virtual classrooms, personalized pathways, AI-driven progress tracking, and optimizes learning outcomes.
        </Text>
      </View>
      
      <View style={styles.welcome}>
            <LottieView style={{flex:1}} source={require('../../assets/animation/2.json')} autoPlay loop/>
      </View>

      <Link href="/login" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Get Start</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(140, 120, 240, 1)',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: wp('40%'),
    height: hp('40%'),
    borderRadius: 20,
    borderWidth: 6,
    borderColor: '#000',
  },
  centerImage: {
    alignItems: 'center',
  },
  textContainer: {
    padding: wp('5%'),
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: hp('3%'),
    fontFamily: 'outfit-bold',
    textAlign: 'center',
  },
  highlight: {
    color: '#000000',
  },
  description: {
    fontSize: hp('2%'),
    fontFamily: 'outfit',
    textAlign: 'center',
    marginVertical: hp('2%'),
    color: '#000000',
  },
  welcome: {
    height: hp('15%'),
    marginTop: -hp('3%'),
  },
  lottie: {
    width: '100%',
  },
  button: {
    backgroundColor: '#6c47ff',
    padding: hp('1.5%'),
    borderRadius: 99,
    alignItems: 'center',
    marginTop: hp('2%'),
    width: '50%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'outfit',
    fontSize: hp('2.5%'),
    textAlign: 'center',
  },
});
