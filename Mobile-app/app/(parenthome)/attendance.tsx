import React, { useState , useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart, BarChart } from 'react-native-chart-kit';


import Swiper from 'react-native-swiper';
import axios from 'axios';

const Advices = () => {
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [studentId, setStudentId] = useState<string | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [falseCount, setFalseCount] = useState(0);
  const [trueCount, setTrueCount] = useState(0);
  const [pieChartData, setPieChartData] = useState([
    { name: 'Absent days', days: 0, color: '#8C78F080', legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Present days', days: 0, color: '#8C78F0', legendFontColor: '#7F7F7F', legendFontSize: 10 },
  ]);
  const [monthlyAttendance, setMonthlyAttendance] = useState<any>(null);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const monthlyAttendanceData = Object.keys(monthlyAttendance || {}).map((month) => {
    const { present, absent } = monthlyAttendance[month];
    const total = present + absent;
    const presentPercentage = (present / total) * 100;
    return { month, presentPercentage };
  });

  const barChartData = {
    labels: monthlyAttendanceData.map((data) => monthNames[parseInt(data.month)]),
    datasets: [
      {
        data: monthlyAttendanceData.map((data) => data.presentPercentage),
      },
    ],
  };

  useEffect(() => {
    const fetchStudentIdFromDatabase = async () => {
      try {
        const emailAddress = await AsyncStorage.getItem('userP');
        if (!emailAddress) {
          alert('User not found. Please log in again.');
          return;
        }

        const response = await axios.get('http://192.168.8.153:5001/get-user-dataP', {
          params: { emailAddress }
        });

        const { studentId } = response.data.data;
        setStudentId(studentId);
        await AsyncStorage.setItem('studentId', studentId);

        fetchAttendanceData(studentId);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error, Failed to fetch user data');
      }
    };

    const fetchAttendanceData = async (studentId: string) => {
      try {
        const response = await axios.post('http://192.168.8.153:5001/check-attendance', { studentId });
        const { attendanceDates } = response.data;
        console.log('Attendance Dates:', attendanceDates);

        // Format dates and set marked dates
        const formattedDates = attendanceDates.reduce((acc: any, record: any) => {
          const dateStr = new Date(record.date).toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
          acc[dateStr] = {
            marked: true,
            dotColor: record.attendanceStatus ? 'green' : 'red' // Use 'green' for present and 'red' for absent
          };
          return acc;
        }, {});

        setMarkedDates(formattedDates);
        setTotalRecords(attendanceDates.length);
        const trueDatesCount = attendanceDates.filter((record: any) => record.attendanceStatus).length;
        const falseDatesCount = attendanceDates.length - trueDatesCount;

        setPieChartData([
          { name: 'Absent days', days: falseDatesCount, color: '#8C78F080', legendFontColor: '#7F7F7F', legendFontSize: 10 },
          { name: 'Present days', days: trueDatesCount, color: '#8C78F0', legendFontColor: '#7F7F7F', legendFontSize: 10 },
        ]);
        setTrueCount(trueDatesCount);
        setFalseCount(falseDatesCount);

        const monthlyAttendance = attendanceDates.reduce((acc: any, record: any) => {
          const month = new Date(record.date).getMonth(); // Get month index (0-11)
          if (!acc[month]) {
            acc[month] = { present: 0, absent: 0 };
          }
          if (record.attendanceStatus) {
            acc[month].present += 1;
          } else {
            acc[month].absent += 1;
          }
          return acc;
        }, {});

        setMonthlyAttendance(monthlyAttendance);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
        alert('Error, Failed to fetch attendance records');
      }
    };

    fetchStudentIdFromDatabase();
  }, []); // Empty dependency array to run only once on mount

  const handleBarPress = (index: number) => {
    setSelectedBar(index);
  };

  return (
    
    <LinearGradient
      colors={['#8C78F0', 'rgba(140, 120, 140, 0)']}
      locations={[0.37, 0.91]}
      style={styles.container}
    >
      <Text style={styles.topLeftText}>Attendance </Text>
      <TouchableOpacity style={styles.iconContainerm}>
        <Ionicons name="notifications-outline" size={30} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainerb}>
        <Ionicons name="chatbubble-outline" size={30} color="#ffffff" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.calendarContainer}>
          <Calendar
            markedDates={markedDates}
            style={styles.calendar}
          />
        </View>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          
        >
          <View style={styles.slide}>
            <View style={styles.chartContainer}>
            <TouchableOpacity>
              <PieChart
                data={pieChartData}
                width={wp('90%')}
                height={220}
                chartConfig={{
                  backgroundColor: '#1cc910',
                  backgroundGradientFrom: '#eff3ff',
                  backgroundGradientTo: '#efefef',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16
                  }
                }}
                accessor="days"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
              </TouchableOpacity>
              <Text style={styles.chartTitle}>Year Attendance Percentage</Text>
            </View>
          </View>
          <View style={styles.slide}>
            <View style={styles.chartContainer}>
            <View style={styles.customBarContainer}>
  {barChartData.datasets[0].data.map((value, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.customBar, { height: `${value}%` }]}
      onPress={() => handleBarPress(index)}
    >
      <View style={styles.barContent}>
        {selectedBar === index && (
          <Text style={styles.percentageText}>{`${value}%`}</Text>
        )}
      </View>
      <Text style={styles.barLabel}>{barChartData.labels[index]}</Text>
    </TouchableOpacity>
  ))}
</View>
<Text style={styles.chartTitle}>Monthly Attendance Percentage</Text>
            </View>
          </View>
        </Swiper>
      </ScrollView>
    </LinearGradient>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(140, 120, 240, ${opacity})`,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  fillShadowGradientFrom: '#8C78F0',
  fillShadowGradientTo: '#8C78F0',
  fillShadowGradientOpacity: 1,
  propsForLabels: {
    fontSize: 10,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeftText: {
    position: 'absolute',
    top: hp('9%'),
    left: wp('3.7%'),
    fontSize: 34,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  iconContainerb: {
    flexDirection: 'row',
    position: 'absolute',
    top: hp('5.6%'),
    right: wp('4.8%'),
  },
  iconContainerm: {
    flexDirection: 'row',
    position: 'absolute',
    top: hp('5.6%'),
    right: wp('15.7%'),
  },
  calendarContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#8C78F0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    marginTop: hp('17%'),
    width: wp('94.7%'),
  },
  calendar: {
    width: '100%',
  },
  wrapper: {
    height: 300,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#8C78F0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: hp('6%'),
  },
  customBarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 220,
    width: wp('90%'),
  },
  customBar: {
    width: '7%',
    backgroundColor: '#8C78F0',
    borderRadius: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartTitle: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: '#000',
    fontWeight: '300',
  },
  barLabel: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 4,
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: hp('3%'),
  },
  activeDot: {
    backgroundColor: '#8C78F0',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: hp('3%'),
  },
  percentageText: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 4,
  },
});

export default Advices;
