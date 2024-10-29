import { View, Text, StyleSheet, TouchableOpacity,KeyboardAvoidingView,Platform, Alert, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useCallback, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect, useNavigation, NavigationProp } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardField, useStripe, StripeProvider,initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';
import LottieView from 'lottie-react-native';


const PUBLISHABLE_KEY = 'pk_test_51PoAoaB44XaxZNEmJa6hDXjhrpMaOjwPTOyG1pikZkG7tNOX73LOoparv94l0QelNzz36xunrhh0PUkv8H5EefkU00rgq5dkaG'; // Replace with your actual publishable key

interface DropdownItem {
    label: string;
    value: string;
}

const data: DropdownItem[] = [
    { label: 'All Classes', value: 'All Classes' },
    { label: 'Paper Class', value: 'Paper Class' },
    { label: 'Revision', value: 'Revision' },
];

type RootStackParamList = {
    pay: {
        amount: number;
        onPaymentSuccess: () => Promise<void>;
    };
};

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

export default function Home() {
    const [value, setValue] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [overview, setOverview] = useState<{ [key: string]: string }>({});
    const [showPayment, setShowPayment] = useState(false);
    const [cardComplete, setCardComplete] = useState(false);
    const { confirmPayment,initPaymentSheet, presentPaymentSheet } = useStripe();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useFocusEffect(
        useCallback(() => {
            setValue(null);
            setIsFocus(false);
            fetchPaymentStatus();
        }, [])
    );

    const fetchPaymentStatus = async () => {
        const studentId = await AsyncStorage.getItem('userId');
        if (!studentId) {
            Alert.alert('User not found. Please log in again.');
            return;
        }
    
        try {
            const statusOverview: { [key: string]: string } = {};
            let anyPaid = false;
    
            for (const item of data) {
                const response = await axios.get('http://192.168.8.142:5001/status', {
                    params: {
                        studentID: studentId,
                        year: currentYear,
                        month: currentMonth,
                        classType: item.label,
                    },
                });
                statusOverview[item.label] = response.data.status;
                if (response.data.status === 'Paid') {
                    anyPaid = true;
                }
            }
    
            if (!anyPaid) {
                // Show all unpaid classes
                const unpaidOverview: { [key: string]: string } = {};
                for (const item of data) {
                    if (statusOverview[item.label] !== 'Paid') {
                        unpaidOverview[item.label] = 'Not Paid';
                    }
                }
                setOverview(unpaidOverview);

               
            } else {
                // Only show paid classes
                const paidOverview: { [key: string]: string } = {};
                for (const [key, value] of Object.entries(statusOverview)) {
                    if (value === 'Paid') {
                        paidOverview[key] = 'Paid';
                    }
                }
                setOverview(paidOverview);
            }
        } catch (error) {
            console.error('Error fetching payment status:', error);
        }
    };
    
    

    const paymentAmounts: { [key: string]: number } = {
        'All Classes': 2000 * 100, // amount in LKR cents
        'Paper Class': 1000 * 100,
        'Revision': 1500 * 100,
    };
    
    const handlePayment = () => {
        
        if (!value) {
            Alert.alert('Please select a class type.');
            return;
        }
    
        setShowPayment(true);
    };
    
    const handlePayPress = async () => {
        const email = await AsyncStorage.getItem('emailAddress');
        const phone = await AsyncStorage.getItem('phone');
        if (!cardComplete) {
            Alert.alert("Please enter your card details");
            return;
        }
    
        const amount = paymentAmounts[value || ''] || 0;
    
        try {
            const response = await axios.post('http://192.168.8.142:5001/create-payment-intent', {
                amount,
            });
    
            const clientSecret = response.data.clientSecret;
            const { paymentIntent, error } = await confirmPayment(clientSecret, {
                paymentMethodType: 'Card',
            });
    
            if (error) {
                Alert.alert(`Payment failed: ${error.message}`);
            } else if (paymentIntent) {
                Alert.alert('Payment successful!', `Payment ID: ${paymentIntent.id}`);
    
                const studentId = await AsyncStorage.getItem('userId');
                if (!studentId) return;
    
                const updateResponse = await axios.post('http://192.168.8.142:5001/make', {
                    studentID: studentId,
                    year: currentYear,
                    month: currentMonth,
                    classType: value,
                    email,
                    phone,
                });
    
                if (updateResponse.data.success) {
                    fetchPaymentStatus(); // Refresh status after payment
                } else {
                    Alert.alert('Payment failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Payment error:', error);
            Alert.alert('Payment failed. Please try again.');
        }
        setShowPayment(false);
    };
    
    
    
    return (
        <StripeProvider publishableKey={PUBLISHABLE_KEY}>
            <LinearGradient
                colors={['#8C78F0', 'rgba(140, 120, 140, 0)']}
                locations={[0.37, 0.91]}
                style={styles.container}
            >
                <TouchableOpacity style={styles.iconContainerm}>
                    <Ionicons name="notifications-outline" size={30} color="#ffffff" style={styles.icon} />
                </TouchableOpacity>
               

                <Text style={styles.textpay}>Payment</Text>

                <View style={styles.content}>

                <View style={styles.box1}>
                    <Text style={styles.Text1}>Payment Status</Text>
                    <Text style={styles.TextYear}> {currentYear}</Text>
                    <Text style={styles.TextMonth}>{currentMonth} </Text>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select' : '...'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                            setValue(item.label);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="Safety"
                                size={20}
                            />
                        )}
                    />
                    <TouchableOpacity style={styles.button} onPress={handlePayment}>
                        <Text style={styles.buttonText}>Pay Now</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.box2}>
    <Text style={styles.Text2}>Overview</Text>
    <ScrollView>
    {Object.keys(overview).map((key) => {
        const status = overview[key];
        const statusColor = status === 'Paid' ? styles.paidStatus : styles.notPaidStatus;

        return (
            <View key={key} style={styles.overviewRow}>
                <Text style={styles.TextOverview}>{currentMonth}</Text>
                <Text style={styles.TextOverview}>{key}</Text>
                <Text style={[styles.TextOverview, statusColor]}>{status}</Text>
            </View>
        );
    })}
    </ScrollView>
</View>
</View>




                {/* Payment Modal */}
<Modal
 visible={showPayment}
 transparent
 animationType="slide"
 onRequestClose={() => setShowPayment(false)}
>

<TouchableWithoutFeedback onPress={() => setShowPayment(false)}>
  
    <View style={styles.modalContainer}>
   
    <TouchableWithoutFeedback>
  
        <View style={styles.modalContent}>
         <Text style={styles.headerText}>Enter Payment Details</Text>
         
                <LottieView 
                    style={styles.lottieAnimation} 
                    source={require('../../assets/animation/7.json')} 
                    autoPlay 
                    loop 
                />
            <Text  style={styles.label}>Amount</Text>
            <Text style={styles.amountText}>
              LKR {paymentAmounts[value || ''] / 100}
            </Text>
            
            <CardField
                postalCodeEnabled={true}
                
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    fontSize: 16,
                    borderWidth: 1,
                    borderColor: '#cccccc',
                    borderRadius: 5,
                    textColor: '#000000',
                }}
                style={styles.cardFieldContainer}
                onCardChange={(details) => setCardComplete(details.complete)}
            />
            <TouchableOpacity style={styles.button} onPress={handlePayPress}>
                <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
            </View>
          
            </TouchableWithoutFeedback>
            
            </View>
            
            </TouchableWithoutFeedback>
           
            </Modal>
            </LinearGradient>
        </StripeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        marginTop:hp('40%'),
        paddingTop:-hp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('15%'),
        //paddingBottom: 40,
        width: '100%',
        height: hp('66%'),	
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: wp('10%'),
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        
      },
  
    iconContainerm: {
        flexDirection: 'row',
        position: 'absolute',
        top: hp('5.6%'),
        right: wp('4.8%'),
    },
    icon: {
        marginLeft: 10,
    },
    label: {
        alignSelf: 'flex-start',
        marginLeft: wp('12%'),
        fontSize: hp('1.6%'),
        color: 'rgba(75, 85, 99, 1)',
        marginBottom: hp('0.4%'),
      },
    box1: {
        position: 'absolute',
        width: hp('42%'),
        height: hp('26%'),
        backgroundColor: '#ffffff',
        top: hp('2%'),
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: wp('8%'),
        borderColor: '#8C78F0',
        borderWidth: 1,
        padding: wp('5%'),
    },
    box2: {
        position: 'absolute',
        width: hp('42%'),
        height: hp('35%'),
        backgroundColor: '#ffffff',
        top: hp('30%'),
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: wp('8%'),
        borderColor: '#8C78F0',
        borderWidth: 1,
        padding: wp('5%'),
    },
    textpay: {
        color: '#ffffff',
        fontSize: hp('3.8%'),
        fontWeight: '600',
        position: 'absolute',
        left: wp('3%'),
        top: hp('10%'),
    },
    Text1: {
        color: '#000',
        fontSize: hp('2.7%'),
        fontWeight: '500',
    },
    Text2: {
        color: '#000',
        fontSize: hp('2.7%'),
        fontWeight: '500',
        top: hp('0%'),
    },
    TextMonth: {
        color: '#000',
        fontSize: hp('3.2%'),
        fontWeight: '700',
        top: hp('4%'),
    },
    TextYear: {
        color: '#000',
        fontSize: hp('2.2%'),
        fontWeight: '500',
        top: hp('4%'),
    },
    amountText: {
       
        marginVertical:  hp('0.5%'),
        height: hp('5%'),
        width:wp('70%'),
        borderWidth: 1,
        borderColor: '#6c47ff',
        borderRadius:  wp('2%'),
        padding: wp('2%'),
        backgroundColor: '#fff',
        fontSize: hp('2.1%'),
    },
    overviewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        paddingVertical: hp('1%'),
         // Adjust the spacing between rows
    },
    TextOverview: {
        flex: 1, // Ensure that each item in the row takes equal space
        textAlign: 'center', // Align text to center within each column
        fontSize: hp('2.1%'),
        fontWeight: '400',
        color: '#000',
        
    },
    paidStatus: {
        color: 'green',
        fontWeight: 'bold',
    },
    notPaidStatus: {
        color: 'red',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: hp('1.5%'),
        borderRadius: 15,
        alignItems: 'center',
        marginTop: hp('3%'),
        width: wp('75%'),
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        left: wp('3%'),
        right: wp('3%'),
        
    },
    buttonText: {
        color: '#fff',
        fontSize: hp('2.2%'),
        fontWeight: '600',
    },
    dropdown: {
        height: hp('6%'),
        width: wp('45%'),
        backgroundColor: '#EEEEEE',
        borderRadius: wp('4%'),
        paddingHorizontal: 8,
        marginTop: -hp('2.5%'),
        left: wp('38%'),
        borderWidth: 1,
        borderColor: '#6c47ff',
    },
    placeholderStyle: {
        fontSize: hp('2%'),
        color: '#b3b3b3',
    },
    selectedTextStyle: {
        fontSize: hp('2%'),
        color: '#333',
    },
    modalContainer: {
        flex: 1,
       
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '100%',
        height: '80%',
        marginTop:  hp('55%'),
        backgroundColor: '#fff',
        borderRadius: wp('8%'),
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        
    },
    headerText: {
        fontSize: hp('3%'),
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    cardFieldContainer: {
        marginVertical:  hp('0.5%'),
        height: hp('5%'),
        width:wp('70%'),
        borderWidth: 1,
        borderColor: '#6c47ff',
        borderRadius:  wp('2%'),
        padding: wp('2%'),
        backgroundColor: '#fff',
        fontSize: hp('2.1%'),
    },
 
    welcome: {
        height:hp('15%'),
        marginTop: hp('2%'),
      },
      lottieAnimation: {
        width: hp('20%'), 
        height: hp('15%'), 
        marginTop: -hp('3%')
    },
});


// import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import React, { useState, useCallback, useEffect } from 'react';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { useFocusEffect, useNavigation, NavigationProp } from '@react-navigation/native';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { Dropdown } from 'react-native-element-dropdown';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CardField, useStripe, StripeProvider, initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';
// import LottieView from 'lottie-react-native';
// import { Platform } from 'react-native';

// const PUBLISHABLE_KEY = 'pk_test_51PoAoaB44XaxZNEmJa6hDXjhrpMaOjwPTOyG1pikZkG7tNOX73LOoparv94l0QelNzz36xunrhh0PUkv8H5EefkU00rgq5dkaG'; // Replace with your actual publishable key

// interface DropdownItem {
//     label: string;
//     value: string;
// }

// const data: DropdownItem[] = [
//     { label: 'All Classes', value: 'All Classes' },
//     { label: 'Paper Class', value: 'Paper Class' },
//     { label: 'Revision', value: 'Revision' },
// ];

// type RootStackParamList = {
//     pay: {
//         amount: number;
//         onPaymentSuccess: () => Promise<void>;
//     };
// };

// const currentDate = new Date();
// const currentYear = currentDate.getFullYear();
// const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

// export default function Home() {
//     const [value, setValue] = useState<string | null>(null);
//     const [isFocus, setIsFocus] = useState(false);
//     const [overview, setOverview] = useState<{ [key: string]: string }>({});
//     const [showPayment, setShowPayment] = useState(false);
//     const [cardComplete, setCardComplete] = useState(false);
//     const { confirmPayment,initPaymentSheet, presentPaymentSheet } = useStripe();
//     const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//     useFocusEffect(
//         useCallback(() => {
//             setValue(null);
//             setIsFocus(false);
//             fetchPaymentStatus();
//         }, [])
//     );

//     const fetchPaymentStatus = async () => {
//         const studentId = await AsyncStorage.getItem('userId');
//         if (!studentId) {
//             Alert.alert('User not found. Please log in again.');
//             return;
//         }
    
//         try {
//             const statusOverview: { [key: string]: string } = {};
//             let anyPaid = false;
    
//             for (const item of data) {
//                 const response = await axios.get('http://192.168.8.142:5001/status', {
//                     params: {
//                         studentID: studentId,
//                         year: currentYear,
//                         month: currentMonth,
//                         classType: item.label,
//                     },
//                 });
//                 statusOverview[item.label] = response.data.status;
//                 if (response.data.status === 'Paid') {
//                     anyPaid = true;
//                 }
//             }
    
//             if (!anyPaid) {
//                 // Show all unpaid classes
//                 const unpaidOverview: { [key: string]: string } = {};
//                 for (const item of data) {
//                     if (statusOverview[item.label] !== 'Paid') {
//                         unpaidOverview[item.label] = 'Not Paid';
//                     }
//                 }
//                 setOverview(unpaidOverview);

               
//             } else {
//                 // Only show paid classes
//                 const paidOverview: { [key: string]: string } = {};
//                 for (const [key, value] of Object.entries(statusOverview)) {
//                     if (value === 'Paid') {
//                         paidOverview[key] = 'Paid';
//                     }
//                 }
//                 setOverview(paidOverview);
//             }
//         } catch (error) {
//             console.error('Error fetching payment status:', error);
//         }
//     };
    
    

//     const paymentAmounts: { [key: string]: number } = {
//         'All Classes': 2000 * 100, // amount in LKR cents
//         'Paper Class': 1000 * 100,
//         'Revision': 1500 * 100,
//     };
    
//     const handlePayment = async () => {
//         if (!value) {
//             Alert.alert('Please select a class type.');
//             return;
//         }
    
//         const amount = paymentAmounts[value || ''] || 0;
    
//         try {
//             const response = await axios.post('http://192.168.8.142:5001/create-payment-intent', {
//                 amount,
//             });
    
//             const clientSecret = response.data.clientSecret;
    
//             const customAppearance = {
//                 font: {
//                     family: Platform.OS === 'android' ? 'avenirnextregular' : 'AvenirNext-Regular',
//                     scale: 1.15,
//                 },
//                 shapes: {
//                     borderRadius: 12,
//                     borderWidth: 0.5,
//                 },
//                 primaryButton: {
//                     shapes: {
//                         borderRadius: 20,
//                     },
//                 },
//                 colors: {
//                     primary: '#fcfdff',
//                     background: '#ffffff',
//                     componentBackground: '#f3f8fa',
//                     componentBorder: '#f3f8fa',
//                     componentDivider: '#000000',
//                     primaryText: '#000000',
//                     secondaryText: '#000000',
//                     componentText: '#000000',
//                     placeholderText: '#73757b',
//                 },
//             };
    
//             const { error } = await initPaymentSheet({
//                 paymentIntentClientSecret: clientSecret,
//                 appearance: customAppearance,
//                 intentConfiguration: {
//                     paymentIntent: {
//                         clientSecret: clientSecret,
//                     },
//                 },
//             });
    
//             if (error) {
//                 Alert.alert(`Initialization failed: ${error.message}`);
//                 return;
//             }
    
//             const { error: paymentError } = await presentPaymentSheet();
    
//             if (paymentError) {
//                 Alert.alert(`Payment failed: ${paymentError.message}`);
//             } else {
//                 Alert.alert('Payment successful!');
    
//                 const studentId = await AsyncStorage.getItem('userId');
//                 if (!studentId) return;
    
//                 const updateResponse = await axios.post('http://192.168.8.142:5001/make', {
//                     studentID: studentId,
//                     year: currentYear,
//                     month: currentMonth,
//                     classType: value,
//                 });
    
//                 if (updateResponse.data.success) {
//                     fetchPaymentStatus(); // Refresh status after payment
//                 } else {
//                     Alert.alert('Payment failed. Please try again.');
//                 }
//             }
//         } catch (error) {
//             console.error('Payment error:', error);
//             Alert.alert('Payment failed. Please try again.');
//         }
//         setShowPayment(false);
//     };
    
    
    
//     return (
//         <StripeProvider publishableKey={PUBLISHABLE_KEY}>
//             <LinearGradient
//                 colors={['#8C78F0', 'rgba(140, 120, 140, 0)']}
//                 locations={[0.37, 0.91]}
//                 style={styles.container}
//             >
//                 <TouchableOpacity style={styles.iconContainerm}>
//                     <Ionicons name="notifications-outline" size={30} color="#ffffff" style={styles.icon} />
//                 </TouchableOpacity>
               

//                 <Text style={styles.textpay}>Payment</Text>

//                 <View style={styles.box1}>
//                     <Text style={styles.Text1}>Payment Status</Text>
//                     <Text style={styles.TextYear}> {currentYear}</Text>
//                     <Text style={styles.TextMonth}>{currentMonth} </Text>
//                     <Dropdown
//                         style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
//                         placeholderStyle={styles.placeholderStyle}
//                         selectedTextStyle={styles.selectedTextStyle}
//                         data={data}
//                         maxHeight={300}
//                         labelField="label"
//                         valueField="value"
//                         placeholder={!isFocus ? 'Select' : '...'}
//                         value={value}
//                         onFocus={() => setIsFocus(true)}
//                         onBlur={() => setIsFocus(false)}
//                         onChange={(item) => {
//                             setValue(item.label);
//                             setIsFocus(false);
//                         }}
//                         renderLeftIcon={() => (
//                             <AntDesign
//                                 style={styles.icon}
//                                 color={isFocus ? 'blue' : 'black'}
//                                 name="Safety"
//                                 size={20}
//                             />
//                         )}
//                     />
//                     <TouchableOpacity style={styles.button} onPress={handlePayment}>
//                         <Text style={styles.buttonText}>Pay Now</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.box2}>
//     <Text style={styles.Text2}>Overview</Text>
//     <ScrollView>
//     {Object.keys(overview).map((key) => {
//         const status = overview[key];
//         const statusColor = status === 'Paid' ? styles.paidStatus : styles.notPaidStatus;

//         return (
//             <View key={key} style={styles.overviewRow}>
//                 <Text style={styles.TextOverview}>{currentMonth}</Text>
//                 <Text style={styles.TextOverview}>{key}</Text>
//                 <Text style={[styles.TextOverview, statusColor]}>{status}</Text>
//             </View>
//         );
//     })}
//     </ScrollView>
// </View>




//                 {/* Payment Modal */}
//                 <Modal
//                     animationType="slide"
//                     transparent={true}
//                     visible={showPayment}
//                     onRequestClose={() => setShowPayment(false)}
//                 >
//                     <TouchableWithoutFeedback onPress={() => setShowPayment(false)}>
//                         <View style={styles.modalBackground}>
//                             <View style={styles.modalContainer}>
//                                 <CardField
//                                     postalCodeEnabled={false}
//                                     placeholders={{
//                                         number: '4242 4242 4242 4242',
//                                     }}
//                                     onCardChange={(details) => setCardComplete(details.complete)}
//                                     style={styles.cardField}
//                                 />
//                                 <TouchableOpacity style={styles.modalButton} onPress={handlePayment}>
//                                     <Text style={styles.modalButtonText}>Confirm Payment</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </TouchableWithoutFeedback>
//                 </Modal>
//             </LinearGradient>
//         </StripeProvider>
//     );
// }

// const styles = StyleSheet.create({
//     modalButton: {
//         backgroundColor: '#007BFF',
//         borderRadius: 8,
//         paddingVertical: 12,
//         alignItems: 'center',
//         width: '100%',
//     },
//     modalButtonText: {
//         color: '#ffffff',
//         fontSize: 16,
//     },
//     cardField: {
//         width: '100%',
//         height: 50,
//         marginVertical: 20,
//     },
//     modalBackground: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0,0,0,0.5)',
//     },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
  
//     iconContainerm: {
//         flexDirection: 'row',
//         position: 'absolute',
//         top: hp('5.6%'),
//         right: wp('4.8%'),
//     },
//     icon: {
//         marginLeft: 10,
//     },
//     label: {
//         alignSelf: 'flex-start',
//         marginLeft: wp('6%'),
//         fontSize: hp('1.6%'),
//         color: 'rgba(75, 85, 99, 1)',
//         marginBottom: hp('0.4%'),
//       },
//     box1: {
//         position: 'absolute',
//         width: hp('42%'),
//         height: hp('26%'),
//         backgroundColor: '#ffffff',
//         top: hp('17%'),
//         justifyContent: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.5,
//         shadowRadius: 3.84,
//         elevation: 5,
//         borderRadius: wp('8%'),
//         borderColor: '#8C78F0',
//         borderWidth: 1,
//         padding: wp('5%'),
//     },
//     box2: {
//         position: 'absolute',
//         width: hp('42%'),
//         height: hp('25%'),
//         backgroundColor: '#ffffff',
//         top: hp('45%'),
//         justifyContent: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.5,
//         shadowRadius: 3.84,
//         elevation: 5,
//         borderRadius: wp('8%'),
//         borderColor: '#8C78F0',
//         borderWidth: 1,
//         padding: wp('5%'),
//     },
//     textpay: {
//         color: '#ffffff',
//         fontSize: hp('3.8%'),
//         fontWeight: '600',
//         position: 'absolute',
//         left: wp('3%'),
//         top: hp('10%'),
//     },
//     Text1: {
//         color: '#000',
//         fontSize: hp('2.7%'),
//         fontWeight: '500',
//     },
//     Text2: {
//         color: '#000',
//         fontSize: hp('2.7%'),
//         fontWeight: '500',
//         top: hp('0%'),
//     },
//     TextMonth: {
//         color: '#000',
//         fontSize: hp('3.2%'),
//         fontWeight: '700',
//         top: hp('4%'),
//     },
//     TextYear: {
//         color: '#000',
//         fontSize: hp('2.2%'),
//         fontWeight: '500',
//         top: hp('4%'),
//     },
//     amountText: {
       
//         marginVertical:  hp('0.5%'),
//         height: hp('5%'),
//         width:wp('70%'),
//         borderWidth: 1,
//         borderColor: '#6c47ff',
//         borderRadius:  wp('2%'),
//         padding: wp('2%'),
//         backgroundColor: '#fff',
//         fontSize: hp('2.1%'),
//     },
//     overviewRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         borderBottomWidth: 1,
//         borderBottomColor: '#f1f1f1',
//         paddingVertical: hp('1%'),
//          // Adjust the spacing between rows
//     },
//     TextOverview: {
//         flex: 1, // Ensure that each item in the row takes equal space
//         textAlign: 'center', // Align text to center within each column
//         fontSize: hp('2.1%'),
//         fontWeight: '400',
//         color: '#000',
        
//     },
//     paidStatus: {
//         color: 'green',
//         fontWeight: 'bold',
//     },
//     notPaidStatus: {
//         color: 'red',
//         fontWeight: 'bold',
//     },
//     button: {
//         backgroundColor: '#007BFF',
//         padding: hp('1.5%'),
//         borderRadius: 15,
//         alignItems: 'center',
//         marginTop: hp('3%'),
//         width: wp('75%'),
//         justifyContent: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.5,
//         shadowRadius: 3.84,
//         left: wp('3%'),
//         right: wp('3%'),
        
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: hp('2.2%'),
//         fontWeight: '600',
//     },
//     dropdown: {
//         height: hp('6%'),
//         width: wp('45%'),
//         backgroundColor: '#EEEEEE',
//         borderRadius: wp('4%'),
//         paddingHorizontal: 8,
//         marginTop: -hp('2.5%'),
//         left: wp('38%'),
//         borderWidth: 1,
//         borderColor: '#6c47ff',
//     },
//     placeholderStyle: {
//         fontSize: hp('2%'),
//         color: '#b3b3b3',
//     },
//     selectedTextStyle: {
//         fontSize: hp('2%'),
//         color: '#333',
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0,0,0,0.5)',
//     },
//     modalContent: {
//         width: '90%',
//         height: '70%',
//         marginTop: '9%',
//         backgroundColor: '#fff',
//         borderRadius: wp('8%'),
//         padding: 20,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.5,
//         shadowRadius: 3.84,
//         elevation: 5,
        
//     },
//     headerText: {
//         fontSize: hp('3%'),
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: '#333',
//         textAlign: 'center',
//     },
//     cardFieldContainer: {
//         marginVertical:  hp('0.5%'),
//         height: hp('5%'),
//         width:wp('70%'),
//         borderWidth: 1,
//         borderColor: '#6c47ff',
//         borderRadius:  wp('2%'),
//         padding: wp('2%'),
//         backgroundColor: '#fff',
//         fontSize: hp('2.1%'),
//     },
 
//     welcome: {
//         height:hp('15%'),
//         marginTop: hp('2%'),
//       },
//       lottieAnimation: {
//         width: hp('20%'), 
//         height: hp('15%'), 
//         marginTop: -hp('3%')
//     },
// });