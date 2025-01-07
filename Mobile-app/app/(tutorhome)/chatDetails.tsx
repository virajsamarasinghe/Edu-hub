import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  sender: string; // 'user' or 'owner'
}

interface Profile {
  name: string;
  profileImage: string;
  role: 'student' | 'parent'; // Role of the chat owner
}

const ChatDetails = ({ conversationId, userRole }: { conversationId: string; userRole: 'student' | 'parent' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [chatOwner, setChatOwner] = useState<Profile | null>(null);

  // Fetch chat details and messages on component mount
  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.8.153t:5001/api/chat/${conversationId}`);
        setMessages(response.data.messages);
        setChatOwner(response.data.chatOwner);
      } catch (error) {
        console.error('Error fetching chat details:', error);
      }
    };

    fetchChatDetails();
  }, [conversationId]);

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        sender: userRole,
        conversationId,
      };

      try {
        const response = await axios.post(`http://192.168.8.153:5001/api/chat/send`, newMessage);
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === userRole ? styles.userMessage : styles.ownerMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  if (!chatOwner) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading chat details...</Text>
      </View>
    );
  }

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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => console.log('Back pressed')}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Chat Details</Text>
        </View>

        {/* Chat Owner Profile */}
        <View style={styles.profileContainer}>
          <View style={styles.profileWrapper}>
            <Image source={{ uri: chatOwner.profileImage }} style={styles.profileImage} />
            <View style={styles.iconOverlay}>
              <Ionicons
                name={chatOwner.role === 'student' ? 'school-outline' : 'people-outline'}
                size={20}
                color="#fff"
              />
            </View>
          </View>
          <Text style={styles.profileName}>{chatOwner.name}</Text>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatContainer}
        />

        {/* Input Section */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              placeholderTextColor="#888"
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Ionicons name="send" size={20} color="#fff" />
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileWrapper: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  iconOverlay: {
    position: 'absolute',
    top: 55,
    right: -6,
    backgroundColor: '#8C78F0',
    borderRadius: 18,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  chatContainer: {
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
  ownerMessage: {
    backgroundColor: '#D1C4F7',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
});

export default ChatDetails;