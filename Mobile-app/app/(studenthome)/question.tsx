import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Question = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(10); // Countdown timer in seconds
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = [
    {
      question: "Who is making the Web standards?",
      image: "https://via.placeholder.com/150", // Image for this question
      options: ["Microsoft", "Mozilla", "Google", "The World Wide Web Consortium"],
      correctAnswer: "The World Wide Web Consortium",
    },
    {
      question: "What is the capital of France?",
      image: null, // No image for this question
      options: ["London", "Paris", "Berlin", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      question: "Which language is used for web development?",
      image: "https://via.placeholder.com/150", // Image for this question
      options: ["Java", "JavaScript", "C#", "Python"],
      correctAnswer: "JavaScript",
    },
    {
      question: "What does CSS stand for?",
      image: null, // No image for this question
      options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Cascading Simple Sheets"],
      correctAnswer: "Cascading Style Sheets",
    },
  ];

  // Start countdown when question is shown
  useEffect(() => {
    if (quizFinished) return;

    // Reset timer if we move to a new question
    setTimeLeft(10); // Always reset to 10 seconds when we enter a new question

    const timer = timeLeft > 0 && !quizFinished ? setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000) : null;

    return () => {
      if (timer) clearInterval(timer); // Cleanup interval on component unmount or when timer resets
    };
  }, [currentQuestion, quizFinished]); // Use `currentQuestion` dependency to reset timer on next question

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option); // Select the option
  };

  const handleNext = () => {
    // Prevent moving to the next question if no option is selected
    if (!selectedOption) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1); // Move to the next question
      setSelectedOption(null); // Reset the selected option for the next question
    } else {
      setQuizFinished(true); // End the quiz when all questions are done
    }
  };

  const handlePreview = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null); // Reset the selected option for the previous question
    }
  };

  const handleSubmit = () => {
    setQuizFinished(true); // Mark the quiz as finished
    alert("Quiz Submitted!"); // Handle quiz submission logic here
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <LinearGradient colors={['#8C78F0', '#D1C4F7']} style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#fff" onPress={() => alert("Go back")} />
        <Text style={styles.headerText}>Question {currentQuestion + 1}</Text>
      </View>

      <View style={styles.card}>
        {/* Conditionally Render Image or Question Text */}
        {currentQuestionData.image ? (
          <Image source={{ uri: currentQuestionData.image }} style={styles.questionImage} />
        ) : null}

        {/* Question Text */}
        <Text style={styles.question}>{currentQuestionData.question}</Text>

        {/* Options */}
        {currentQuestionData.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedOption === option ? styles.selectedOption : {},
              selectedOption !== null && option !== selectedOption ? styles.disabledOption : {},
            ]}
            onPress={() => handleOptionSelect(option)}
            disabled={selectedOption !== null} // Disable other options after selection
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

        {/* Countdown Timer */}
        {!quizFinished && (
          <Text style={styles.timerText}>{timeLeft} seconds remaining</Text>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {/* Preview Button */}
        <TouchableOpacity
          style={styles.previewButton}
          onPress={handlePreview}
          disabled={currentQuestion === 0 || quizFinished} // Disable if at the first question or quiz is finished
        >
          <Text style={styles.buttonText}>Preview</Text>
        </TouchableOpacity>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          disabled={!selectedOption || quizFinished} // Disable if no option is selected or quiz is finished
        >
          <Text style={styles.buttonText}>
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>

        {/* Submit Button appears only after clicking Finish */}
        {quizFinished && (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Quiz</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  questionImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8C78F0',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#8C78F0',
  },
  disabledOption: {
    backgroundColor: '#e0e0e0',
  },
  optionText: {
    color: '#333',
    fontSize: 16,
  },
  timerText: {
    color: '#8C78F0',
    fontSize: 16,
    marginTop: 10,
  },
  actionButtons: {
    marginTop: 20,
    alignItems: 'center',
  },
  previewButton: {
    backgroundColor: '#8C78F0',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#8C78F0',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Question;
