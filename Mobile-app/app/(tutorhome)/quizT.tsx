import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, ScrollView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Modalize } from 'react-native-modalize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

const { width } = Dimensions.get('window');

const Quiz = () => {
    const router = useRouter();
    const modalizeRef = useRef<Modalize>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: 0 }]);
    const [hash, setHash] = useState('');

    const quizData = [
        { id: '1', title: 'Coming Soon', subtitle: 'Statistics', isComingSoon: true },
        { id: '2', title: 'Maths', subtitle: 'Statistics' },
        { id: '3', title: 'Maths', subtitle: 'Statistics' },
    ];

    const handleQuizDetailsPress = () => {
        // router.push('/quizDetails');
    };

    const openBottomSheet = () => {
        modalizeRef.current?.open();
    };

    useEffect(() => {
        checkLocalStorage();
    }, []);

    const checkLocalStorage = async () => {
        const storedHash = await AsyncStorage.getItem('quizKey');
        if (storedHash) {
            setHash(storedHash);
        }
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: 0 }]);
    };

    const handleQuestionChange = (index: number, text: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = text;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex: number, optionIndex: number, text: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = text;
        setQuestions(updatedQuestions);
    };

    const answerChange = (questionIndex: number, value: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].answer = value;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async () => {
        const quizData = {
            name,
            description,
            allQuestions: questions,
            uploader: hash,
        };

        try {
            const response = await axios.post('http://localhost:5000/quizzes', quizData);
            console.log('Quiz saved:', response.data);
            modalizeRef.current?.close();
            
            // Clear form fields after successful submission
            setName('');
            setDescription('');
            setQuestions([{ question: '', options: ['', '', '', ''], answer: 0 }]);
        } catch (error) {
            console.error('Error saving quiz:', error);
        }
    };

    const renderItem = ({ item }: { item: { id: string; title: string; subtitle: string; isComingSoon?: boolean } }) => (
        <TouchableOpacity
            style={[
                styles.card,
                item.isComingSoon && styles.comingSoonCard,
                { width: width * 0.9 },
            ]}
            onPress={item.isComingSoon ? undefined : handleQuizDetailsPress}
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
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Quiz</Text>
                <TouchableOpacity onPress={openBottomSheet}>
                    <FontAwesome name="plus" size={30} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <View style={styles.dividerSpacer} />

            <FlatList
                data={quizData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />

            <Modalize
                ref={modalizeRef}
                snapPoint={800}
                modalHeight={800}
                modalStyle={styles.modal}
                handleStyle={styles.modalHandle}
                scrollViewProps={{
                    bounces: false,
                    onTouchStart: (e) => {
                        e.stopPropagation();
                    },
                    scrollEventThrottle: 16,
                    decelerationRate: "fast",
                    showsVerticalScrollIndicator: true,
                }}
                withHandle={true}
                handlePosition="inside"
                HeaderComponent={
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Add New Quiz</Text>
                    </View>
                }
            >
                <ScrollView 
                    style={styles.container1}
                    contentContainerStyle={styles.scrollContent}
                    nestedScrollEnabled={true}
                    bounces={false}
                    overScrollMode="never"
                >
                    <TextInput
                        style={styles.input1}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="#555353"
                    />
                    <TextInput
                        style={styles.input1}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        placeholderTextColor="#555353"
                        multiline={true}
                        numberOfLines={3}
                    />
                    {questions.map((q, questionIndex) => (
                        <View key={questionIndex} style={styles.questionContainer}>
                            <Text style={styles.questionLabel}>Question {questionIndex + 1}</Text>
                            <TextInput
                                style={styles.questionInput}
                                placeholder="Enter your question"
                                placeholderTextColor="#555353"
                                value={q.question}
                                onChangeText={(text) => handleQuestionChange(questionIndex, text)}
                                multiline={true}
                            />
                            {q.options.map((option, optionIndex) => (
                                <TextInput
                                    key={`${questionIndex}-${optionIndex}`}
                                    style={styles.optionInput}
                                    placeholder={`Option ${optionIndex + 1}`}
                                    placeholderTextColor="#555353"
                                    value={option}
                                    onChangeText={(text) => handleOptionChange(questionIndex, optionIndex, text)}
                                />
                            ))}
                            <View style={styles.answerPickerContainer}>
                                <Text style={styles.answerLabel}>Correct Answer:</Text>
                                <RNPickerSelect
                                    onValueChange={(value) => answerChange(questionIndex, value)}
                                    items={[
                                        { label: 'Option 1', value: 0 },
                                        { label: 'Option 2', value: 1 },
                                        { label: 'Option 3', value: 2 },
                                        { label: 'Option 4', value: 3 },
                                    ]}
                                    style={pickerSelectStyles}
                                    placeholder={{ label: 'Select correct answer', value: null }}
                                />
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.addButton} onPress={handleAddQuestion}>
                        <Text style={styles.addButtonText}>+ Add Question</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit Quiz</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomPadding} />
                </ScrollView>
            </Modalize>
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
    },
    dividerSpacer: {
        height: 41,
    },
    listContainer: {
        alignItems: 'center',
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
        fontSize: width > 350 ? 18 : 16,
        fontWeight: 'bold',
        color: '#000',
    },
    cardSubtitle: {
        fontSize: width > 350 ? 14 : 12,
        color: '#888',
    },
    modal: {
        backgroundColor: '#f8f9fa',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalHandle: {
        backgroundColor: '#E0E0E0',
        width: 40,
        height: 4,
        borderRadius: 2,
        marginTop: 8,
    },
    modalHeader: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    container1: {
        flexGrow: 0,
        maxHeight: '100%',
    },
    scrollContent: {
        padding: 20,
    },
    input1: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        backgroundColor: '#fff',
        color: "#333",
        fontSize: 16,
    },
    questionContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    questionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    questionInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        backgroundColor: '#fff',
        color: "#333",
        fontSize: 16,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    optionInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        backgroundColor: '#fff',
        color: "#333",
        fontSize: 16,
    },
    answerPickerContainer: {
        marginTop: 10,
    },
    answerLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    addButton: {
        backgroundColor: '#8C78F0',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginBottom: 15,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#49f5c6',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
    },
    bottomPadding: {
        height: 40,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        color: '#333',
        backgroundColor: '#fff',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        color: '#333',
        backgroundColor: '#fff',
        paddingRight: 30,
    },
});

export default Quiz;