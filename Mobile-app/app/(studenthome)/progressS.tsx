import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const ProgressScreen = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');

  const barChartData = {
    labels: ['Test 01', 'Test 02', 'Test 03', 'Test 04', 'Test 05', 'Test 06'],
    datasets: [
      {
        data: [80, 70, 95, 85, 75, 78],
        color: (opacity = 1) => `rgba(140, 120, 240, ${opacity})`, // Solid purple color for bars
      },
    ],
    legend: ['Overall Percentage: 82.6%'], // Chart legend
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(140, 120, 240, ${opacity})`,
    barPercentage: 0.6,
    fillShadowGradient: '#8C78F0',
    fillShadowGradientOpacity: 1,
    useShadowColorFromDataset: false,
    propsForLabels: { fontSize: 12, fontWeight: '500', color: '#6A6A6A' },
    decimalPlaces: 0,
    animationDuration: 1500,
  };

  return (
    <LinearGradient colors={['#8C78F0', '#D1C4F7']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Arrow */}
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Progress Title */}
        <View style={styles.centerContainer}>
          <Text style={styles.title}>Progress</Text>
        </View>

        {/* Notification Icon */}
        <View style={styles.rightContainer}>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Latest Test Card */}
      <View style={styles.testCard}>
        <Text style={styles.cardTitle}>Latest Test: Quiz 1</Text>
        <Text style={styles.cardText}>Mark: <Text style={styles.cardHighlight}>85%</Text></Text>
        <Text style={styles.cardText}>Rank: <Text style={styles.cardHighlight}>5th</Text></Text>
        <Text style={styles.cardDescription}>
          The test was focused on recent topics including mathematics and science. Keep up the good work!
        </Text>
      </View>

     
      {/* Enhanced Bar Chart */}
      <View style={styles.chartContainer}>
        <BarChart
          data={barChartData}
          width={width * 0.9}
          height={220}
          chartConfig={chartConfig}
          fromZero
          yAxisLabel=""
          yAxisSuffix="%"
          showValuesOnTopOfBars={true}
          style={styles.chartStyle}
        />
      </View>

       {/* Suggestion Box */}
       <View style={styles.suggestionBox}>
        <Text style={styles.suggestionTitle}>Suggestion</Text>
        <View style={styles.chatBubble}>
          <Text style={styles.chatText}>Based on Quiz 1</Text>
        </View>
        <View style={styles.chatBubble}>
          <Text style={styles.chatText}>
            All good here. We wash hands and stay home.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: hp('12%'), // Increased paddingTop to push content further down
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
    position: 'relative',
  },
  leftContainer: {
    position: 'absolute',
    left: 0,
    top: hp('-6.5%'),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: hp('-2.6%'),
    left: wp('-28%'),
  },
  rightContainer: {
    position: 'absolute',
    right: 0,
    top: hp('-6.5%'),
  },
  title: {
    color: '#ffffff',
    fontSize: hp('3.8%'),
    fontWeight: '600',
    marginTop: 20, // Adjust marginTop to move the title down
  },
  testCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A4A4A',
  },
  cardText: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 5,
  },
  cardHighlight: {
    color: '#8C78F0',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  suggestionBox: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A4A4A',
  },
  chatBubble: {
    backgroundColor: '#8C78F0',
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: '80%',
  },
  chatText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#8C78F0',
    padding: 12,
    borderRadius: 25,
    
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    top: hp('-2.3%'),
  },
  chartStyle: {
    borderRadius: 20,
    overflow: 'hidden',
    
  },
});

export default ProgressScreen;
