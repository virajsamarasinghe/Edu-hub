import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Keyboard, Platform, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const TutorsAdvices = () => {
  const [messages, setMessages] = useState<{ id: string; text: string; sender: string }[]>([
    { id: '1', text: 'Hello Student , how are you ? This is your teacher , how can I help you ?. I heard you have experience in marketing. I would like to hear more about it. We need to focus more on promoting our products.', sender: 'tutor' },
    { id: '2', text: 'All good here. We wash hands and stay home.', sender: 'user' },
    { id: '3', text: 'Hello everybody! I’m Ola.', sender: 'tutor' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: input,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  const renderItem = ({ item }: { item: { id: string; text: string; sender: string } }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.tutorMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={['#8C78F0', '#D1C4F7']}
        locations={[0, 1]}
        style={styles.gradientBackground}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Chat</Text>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="notifications-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContainer}
        />

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
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    padding: 5,
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
