import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import ChatViewModel from '../viewmodels/ChatViewModel';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, getDocs, query, doc, getDoc, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebase/firebaseConfig';

const ChatView = () => {
  const navigation = useNavigation();
  const user = getAuth().currentUser;
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);
  const otherUserId = useRoute().params.contactId;
  const { messages, otherUserName, sendMessage } = ChatViewModel(user, otherUserId, flatListRef, input);

  const handleSend = async () => {
    if (input.trim()) {
      await sendMessage(input);
      setInput('');
    }
  };

  const viewProfile = async () => {
    try {
      const userRef = doc(FIRESTORE_DB, 'users', otherUserId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        navigation.navigate('ProfileView', { userData: userDoc.data() });
      } else {
        Alert.alert('Error', 'El perfil del usuario no está disponible.');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Header */}
      <View style={styles.header}>
      <Ionicons name="chevron-back-outline" size={40} color={'black'} marginRight={'7.5%'} onPress={onPress=() => navigation.goBack()}/>
        <TouchableOpacity onPress={viewProfile} style={styles.profileButton}>
          <Ionicons name="person-circle" size={50} color="white" />
          <Text style={styles.headerText}>{otherUserName}</Text>
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.senderId === user.uid ? styles.sentBubble : styles.receivedBubble,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.messagesContainer}
        contentInsetAdjustmentBehavior="automatic"
        onScrollBeginDrag={() => Keyboard.dismiss()}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Escribe un mensaje..."
          style={styles.input}
          placeholderTextColor="#A0A0A0"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFA', // Fondo claro y neutro
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '15%',
    paddingBottom: '5%',
    backgroundColor: '#6EC1F2',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D1E9FF',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
    marginLeft: 10,
    fontWeight: 'bold'
  },
  messagesContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#044389',
    borderBottomRightRadius: 5,
    marginRight: 10,
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#6EC1F2',
    borderBottomLeftRadius: 5,
    marginLeft: 10,
  },
  messageText: {
    color: '#ffffff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#D1E9FF',
    backgroundColor: '#ffffff',
    marginBottom:'3%'
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default ChatView;
