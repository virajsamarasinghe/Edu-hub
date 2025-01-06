import React, { useState,useRef,useEffect  } from 'react';
import { View,ScrollView, Text, StyleSheet,TextInput, TouchableOpacity ,FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Modalize } from 'react-native-modalize';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Svg, Line } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CalendarStrip from 'react-native-calendar-strip'; 
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import { Keyboard } from 'react-native';


interface Schedule {
    id: string;
    title: string;
    lesson: string;
    location: string;
    date: string;
    time: string;
}

interface DropdownItem {
    label: string;
    value: string;
}

const data: DropdownItem[] = [
    { label: 'Upcoming', value: 'Upcoming' },
    { label: 'Today', value: 'Today' },
    { label: 'Previous', value: 'Previous' },
];

export default function Home() {
    const [selectedBox, setSelectedBox] = useState<string | number>(2);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const modalizeRef = useRef<Modalize>(null);
    const handleBoxPress = (boxNumber: number) => {
        setSelectedBox(boxNumber); // Update selected box
    };

    const openBottomSheet = () => {
        modalizeRef.current?.open();
    };

    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('Upcoming');
    

    const [value, setValue] = useState<string>('Upcoming');
    const [isFocus, setIsFocus] = useState(false);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [lesson, setLesson] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    useEffect(() => {
        // Fetch schedules from the database when the component mounts
        fetchSchedules();
    }, []);
    
    useEffect(() => {
        // Filter schedules based on the selected category or date
        filterSchedules();
    }, [searchQuery,schedules, selectedCategory, selectedDate]);

    useEffect(() => {
        const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
            setSearchVisible(false); // Hide search bar when keyboard is dismissed
        });
    
        return () => {
            keyboardListener.remove(); // Clean up the listener on unmount
        };
    }, []);
    
    

    const fetchSchedules = async () => {
        try {
            const response = await axios.get('http://192.168.8.142:5001/schedules');
            if (response.status === 200) {
                setSchedules(response.data);
                setSelectedCategory('Upcoming'); // Ensure Upcoming is selected by default
            } else {
                console.error(`Unexpected response: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching schedules:', error);
            alert('Failed to fetch schedules. Please check your network connection.');
        }
    };
    
    
    const renderCalendarStrip = () => (
        <CalendarStrip
            calendarAnimation={{ type: 'sequence', duration: 30 }}
            style={{ height: 100, paddingTop: -3 }}
            calendarHeaderStyle={{ color: '#000', fontSize: 25, marginBottom: 10, marginLeft: -180 }}
            calendarColor={'transparent'}
            dateNameStyle={{ color: '#000' }}
            dateNumberStyle={{ color: '#000' }}
            highlightDateContainerStyle={{
                backgroundColor: '#FF7648',
                borderRadius: 8,
                padding: 4,
            }}
            highlightDateNameStyle={{ color: '#fff' }}
            highlightDateNumberStyle={{ color: '#fff' }}
            onDateSelected={(date) => {
                const selectedDate = new Date(date);
                setSelectedDate(selectedDate);
                // Reset category when date is selected
                setSelectedCategory('');
                setValue('');
            }}
            selectedDate={selectedDate || new Date()}
            useIsoWeekday={false}
        />
    );  
    

    const filterSchedules = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        
        let filtered = [...schedules]; // Create a copy of schedules
        
        // First filter by category
        if (selectedCategory === 'Upcoming') {
            filtered = filtered.filter((schedule) => {
                const scheduleDate = new Date(schedule.date);
                scheduleDate.setHours(0, 0, 0, 0);
                return scheduleDate >= today;
            });
        } else if (selectedCategory === 'Today') {
            filtered = filtered.filter((schedule) => {
                const scheduleDate = new Date(schedule.date);
                scheduleDate.setHours(0, 0, 0, 0);
                return scheduleDate.getTime() === today.getTime();
            });
        } else if (selectedCategory === 'Previous') {
            filtered = filtered.filter((schedule) => {
                const scheduleDate = new Date(schedule.date);
                scheduleDate.setHours(0, 0, 0, 0);
                return scheduleDate < today;
            });
        }

        // Then filter by selected date if one is chosen
        if (selectedDate) {
            const selected = new Date(selectedDate);
            selected.setHours(0, 0, 0, 0);
            filtered = filtered.filter((schedule) => {
                const scheduleDate = new Date(schedule.date);
                scheduleDate.setHours(0, 0, 0, 0);
                return scheduleDate.getTime() === selected.getTime();
            });
        }

        // Finally, filter by search query if one exists
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((schedule) => 
                schedule.title.toLowerCase().includes(query) ||
                schedule.lesson.toLowerCase().includes(query) ||
                schedule.location.toLowerCase().includes(query)
            );
            
        }
        //setSearchVisible(false);

        setFilteredSchedules(filtered);
    };
    

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        setSelectedDate(null); // Reset selected date when changing category
        setValue(value);
        
    };

    const renderScheduleItem = React.useCallback(
        ({ item }: { item: Schedule }) => (
            <View style={styles.whiteBox2}>
                <View>
                    <Text style={styles.linemText}>{item.time.slice(0, 5)}</Text>
                    
                    
                </View>
                
                
            <View
                style={[
                    styles.box,
                    
                ]}
                //onPress={() => setSelectedBox(item.id)}
                accessibilityRole="button"
                >
               
                <Text
                    style={[
                        styles.line1Text,
                        
                    ]}
                >
                    {item.title}
                </Text>
                <Text
                    style={[
                        styles.line2Text,
                        
                    ]}
                >
                    {item.lesson}
                </Text>
                <Text
                    style={[
                        styles.line3Text,
                        
                    ]}
                >
                    {item.location}
                </Text>
                <Text
                    style={[
                        styles.line4Text,
                        
                    ]}
                >
                    {item.date.split('T')[0]}
                </Text>
            </View>
            </View>
        ),
        [selectedBox]
    );
    
    
    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
        if (!searchVisible) {
            setSearchQuery('');
        }
    };
    

    

    
    
    
    
      



    return (
        <LinearGradient
            colors={['#8C78F0', 'rgba(140, 120, 140, 0)']}
            locations={[0.37, 0.91]}
            style={styles.container}
        >
           

            {/* Chat Icon */}
           

            <Text style={styles.welcomeText}>Schedule</Text>
            
            <TouchableOpacity style={styles.iconContainerm} onPress={toggleSearch}>
            <Feather name="search" size={30} color="#ffffff"    />
            </TouchableOpacity>

            {searchVisible && (
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by Class, Lesson, or Location..."
                        placeholderTextColor="#ACACAA"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus
                    />
                    <TouchableOpacity 
                        style={styles.clearSearch}
                        onPress={() => {
                            setSearchQuery('');
                            //setSearchVisible(false);
                        }}
                    >
                        <AntDesign name="close" size={20} color="#666" />
                    </TouchableOpacity>
                </View>
            )}
            
            
            <View style={styles.whiteBox}>
                <View style={styles.calendarContainer}>
                
                {renderCalendarStrip()}

                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.dropdownContainer}>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: '#FF7648' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select"
                            value={selectedCategory}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => handleCategoryChange(item.label)}
                        />
                    </View>

                    <View style={styles.scheduleListContainer}>
                        {filteredSchedules.length > 0 ? (
                            <FlatList
                            data={filteredSchedules}
                            keyExtractor={(item, index) => item.id || `${item.date}-${index}`}
                            renderItem={renderScheduleItem}
                            style={styles.flatList}
                        />
                        
                        ) : (
                            <Text style={styles.noSchedulesText}>No schedules available</Text>
                        )}
                    </View>
                </View>




            <Text style={styles.timeText}>Time</Text>
            <Text style={styles.courseText}>Course</Text>
            </View>
            
        
 
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
        top: hp('5.6%'),
        right: wp('4.8%'),
    },
    iconContainerm: {
        flexDirection: 'row',
        position: 'absolute',
        top: hp('5.6%'),
        right: wp('4%'),
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
        marginTop: hp('0%'),
        position: 'absolute',
        width: wp('95%'),
        height: hp('70%'),
        backgroundColor: '#ffffff',
        top: hp('20%'),
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        borderTopLeftRadius: wp('10%'),
        borderTopRightRadius: wp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    whiteBox2: {
        marginTop: hp('1%'),
        //position: 'absolute',
        left: wp('5.5%'),
        width: wp('85%'),
        height: hp('17%'),
        backgroundColor: '#ffffff',
        top: hp('2%'),
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 5,
        borderRadius: wp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        //paddingHorizontal: hp('20%'),
    },
 
    box1Text: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        top: hp('1%'),
    },
    
    line1Text: {
        fontSize: hp('2.2%'),
        fontWeight: '700',
        marginBottom: 5,
        color: '#ffffff',
    },
    linemText: {
        fontSize: hp('2%'),
        fontWeight: '700',
        //marginBottom: 5,
        left: -wp('34%'),
        top: hp('8%'),
    },
    line2Text: {
        fontSize: hp('2%'),
        fontWeight: '500',
        marginBottom: 5,
        color: '#ffffff',
    },
    line3Text: {
        fontSize: hp('1.8%'),
        fontWeight: '400',
        marginBottom: 5,
        color: '#ffffff',
    },
    line4Text: {
        fontSize: hp('1.8%'),
        fontWeight: '400',
        color: '#ffffff',
    },
    selectedText: {
        color: '#ffffff',
    },
    unselectedText: {
        color: '#000000',
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
        fontSize: hp('2%'),
        fontWeight: '600',
        position: 'absolute',
        left: wp('10%'),
        top: hp('14 %'),
    },
    calendarContainer: {
        position: 'absolute',
        top: hp('2%'),
        width: wp('85%'),
        zIndex: 10, // Ensure calendar is on top
        elevation: 10, // For Android
        backgroundColor: 'transparent', // Ensure no background color
    },
    courseText: {
        color: '#BCC1CD',
        fontSize: hp('2%'),
        fontWeight: '600',
        position: 'absolute',
        left: wp('32%'),
        top: hp('14%'),
    },
    bottomSheet: {
        backgroundColor: '#ffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    bottomSheetContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sheetTitle: {
        fontSize: hp('2.9%'),
        
        marginBottom: hp('2.8%'),
    },
    inputField: {
       
        marginVertical:  hp('0.5%'),
        height: hp('5.8%'),
        width:wp('85%'),
        borderWidth: 1,
        borderColor: '#6c47ff',
        borderRadius: 15,
        padding: wp('3%'),
        backgroundColor: '#ffff',
            
        },
        label: {
            alignSelf: 'flex-start',
            marginLeft: wp('6%'),
            fontSize: hp('1.9%'),
            color: '#000',
            marginBottom: hp('0.4%'),
            marginTop: hp('0.4%'),
                
        },
        label1: {
            alignSelf: 'flex-start',
            marginLeft: wp('35%'),
            fontSize: hp('1.9%'),
            color: '#000',
            //marginBottom: hp('0.4%'),
            top: hp('-6.8%'),
                
        },
            inputContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                 
               
        },
        inputContainerl: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp('0%'),
            width:wp('90%'),
            
           
        },
        inputContainer2: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp('70%'),
            width:wp('100%'),
            marginTop: hp('-6.4%'),
           
        },
        
        datePickerButton: {
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            justifyContent: 'center',
          },
          datePickerText: {
            color: '#ACACAA',
          },
          button: {
            backgroundColor: '#ff8b3d',
            padding: hp('1.5%'),
            borderRadius: 15,
            alignItems: 'center',
            marginTop: hp('-5%'),
            width: wp('28%'),
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 3.84,
            left: wp('28%'),
            right: wp('3%'),
            
        },
        buttonText: {
            color: '#fff',
            fontSize: hp('2.2%'),
            fontWeight: '600',
        },
        dropdown: {
    height: hp('5%'),
    width: wp('30%'),
    backgroundColor: '#4DC591',
    borderRadius: wp('10%'),
    paddingHorizontal: 8,
    top: hp('0%'),
    left: wp('31.4%'),
    borderWidth: 1,
    borderColor: 'transparent',
    zIndex: 10, // Ensures dropdown is always on top
},
contentContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
},

dropdownContainer: {
    position: 'absolute',
    top: hp('1%'),
    left: wp('31%'),
    width: wp('30%'),
    zIndex: 1000, // Higher z-index to stay on top
    elevation: 1000, // For Android
},


scheduleListContainer: {
    marginTop: hp('17%'), // Adjust this value to position the list below the dropdown
    flex: 1,
    width: '100%',
},

flatList: {
    flex: 1,
    width: '100%',
},

noSchedulesText: {
    marginTop: hp('20%'),
    textAlign: 'center',
    fontSize: hp('2%')
},

        placeholderStyle: {
            fontSize: hp('2%'),
            color: '#000',
            fontWeight: '500',
            left:wp('5%'),
        },
        selectedTextStyle: {
            fontSize: hp('2%'),
            fontWeight: '500',
            color: '#000',
        },
        box: {
            width:  wp('60%'),
            height: hp('14.5%'),
            backgroundColor: '#D0BDFF',
            borderRadius: hp('2%'),
            marginVertical: hp('1%'), // Adds vertical gap between boxes
            paddingHorizontal: wp('5%'),
            paddingTop: hp('1.5%'),
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.19,
            shadowRadius: 3.84,
            elevation: 5,
            top: -hp('1.2%'),
            left: wp('10%'),
        },

        searchContainer: {
            position: 'absolute',
            top: hp('10%'),
        
            left: wp('3%'),
            right: wp('3%'),
            backgroundColor: '#fff',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            zIndex: 1000,
        },
        
        searchInput: {
            flex: 1,
            height: hp('5%'),
            fontSize: 16,
            color: '#333',
        },
        
        clearSearch: {
            padding: 8,
        },

        icons:{
            marginLeft: wp('45%'),
            //fontSize: 25,
            top:hp('1%'),
        }
        
     
});
