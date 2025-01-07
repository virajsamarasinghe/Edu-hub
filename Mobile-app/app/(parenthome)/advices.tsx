import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const TutorsAdvices = () => {
  const [messages, setMessages] = useState<{ id: string; text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');
  const conversationId = '12345'; // Replace with actual conversation ID

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://169.254.14.132:5001/api/chat/${conversationId}`);
        setMessages(response.data.messages || []); // Assuming backend returns messages in a `messages` array
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        sender: 'user',
        conversationId,
      };

      try {
        const response = await axios.post(`http://169.254.14.132:5001/api/chat/send`, newMessage);
        setMessages((prevMessages) => [...prevMessages, response.data]); // Append new message from backend response
        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const renderMessage = ({ item }: { item: { id: string; text: string; sender: string } }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.tutorMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient colors={['#8C78F0', '#D1C4F7']} style={styles.gradientBackground}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tutor's Advice</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContainer}
        />

        {/* Input Section */}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera-outline" size={24} color="#ffffff" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              placeholderTextColor="#888"
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Ionicons name="send" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  chatContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  messageContainer: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: '#8C78F0',
    alignSelf: 'flex-end',
  },
  tutorMessage: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    borderColor: '#8C78F0',
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cameraButton: {
    padding: 10,
    backgroundColor: '#8C78F0',
    borderRadius: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: '#000',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#8C78F0',
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default TutorsAdvices;