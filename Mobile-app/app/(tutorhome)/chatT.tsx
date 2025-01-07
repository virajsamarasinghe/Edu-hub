import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ChatDetails from './chatDetails';
import axios from 'axios';

const ChatApp = () => {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  interface Message {
    text: string;
    sender: string;
    conversationId: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  interface Chat {
    id: string;
    name: string;
    category: string;
    unread: number;
    profileImage: string;
    date: string;
    message: string;
  }

  const [chats, setChats] = useState<Chat[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch all chats from the backend
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://192.168.8.153:5001/api/chats'); // Update the endpoint if needed
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  // Fetch messages for a specific chat
  const fetchMessages = async (chatId: string) => {
    try {
      const response = await axios.get(`http://192.168.8.153:5001/api/chat/${chatId}`);
      setMessages(response.data.messages);
      setCurrentChatId(chatId);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Filter chats based on search and selected category
  const filteredChats = chats.filter((chat) => {
    const matchesCategory = selectedCategory === 'All' || chat.category === selectedCategory;
    const matchesSearch = search === '' || chat.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Count unread chats for the given category
  const unreadChatsCount = (category: string) => {
    if (category === 'All') {
      return chats.filter((chat) => chat.unread > 0).length;
    }
    return chats.filter((chat: any) => chat.unread > 0 && chat.category === category).length;
  };

  // Render a single chat item
  const renderChat = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.chatContainer}
      onPress={() => fetchMessages(item.id)}
    >
      <View style={styles.chatContent}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
          {item.unread > 0 && (
            <View style={styles.unreadBadgeProfile}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
          <View style={styles.iconOverlay}>
            {item.category === 'Student' ? (
              <Ionicons name="school-outline" size={16} color="#fff" />
            ) : (
              <Ionicons name="people-outline" size={16} color="#fff" />
            )}
          </View>
        </View>

        <View style={styles.chatDetails}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName}>{item.name}</Text>
            <Text style={styles.chatDate}>{new Date(item.date).toLocaleString()}</Text>
          </View>
          <Text style={styles.chatMessage}>{item.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render the chat details screen if a chat is selected
  if (currentChatId) {
    return (
      <ChatDetails
        messages={messages}
        onSend={async (text: string) => {
          const newMessage = { text, sender: 'tutor', conversationId: currentChatId };
          try {
            const response = await axios.post(`http://localhost:5001/api/chat/send`, newMessage);
            setMessages((prev) => [...prev, response.data]);
          } catch (error) {
            console.error('Error sending message:', error);
          }
        }}
        onBack={() => setCurrentChatId(null)}
      />
    );
  }

  // Main chat list UI
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <LinearGradient colors={['#8C78F0', '#D1C4F7']} style={styles.gradientBackground}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chats</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or student number"
            placeholderTextColor="#ccc"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.categoryFilter}>
          {['Student', 'Parent', 'All'].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                selectedCategory === category && styles.activeFilterButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === category && styles.activeFilterText,
                ]}
              >
                {category} ({unreadChatsCount(category)})
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredChats}
          renderItem={renderChat}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatsList}
        />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradientBackground: { flex: 1, paddingHorizontal: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 10 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 16 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 25, paddingHorizontal: 16 },
  searchInput: { flex: 1, fontSize: 16, height: 40, marginRight: 10 },
  categoryFilter: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  filterButton: { flex: 1, alignItems: 'center', padding: 10, marginHorizontal: 5, borderRadius: 20, backgroundColor: '#fff' },
  activeFilterButton: { backgroundColor: '#8C78F0' },
  filterText: { fontSize: 14, color: '#555' },
  activeFilterText: { color: '#fff', fontWeight: 'bold' },
  chatContainer: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, alignItems: 'center', position: 'relative' },
  chatContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  profileImageContainer: { position: 'relative' },
  profileImage: { width: 50, height: 50, borderRadius: 25 },
  iconOverlay: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#8C78F0', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  unreadBadgeProfile: { position: 'absolute', top: -5, right: -5, backgroundColor: '#FF4500', borderRadius: 12, paddingHorizontal: 6, paddingVertical: 2 },
  unreadText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  chatDetails: { flex: 1, marginLeft: 12 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  chatName: { fontSize: 16, fontWeight: 'bold' },
  chatDate: { fontSize: 12, color: '#aaa' },
  chatMessage: { fontSize: 14, color: '#555' },
  chatsList: { paddingBottom: 20 },
});

export default ChatApp;