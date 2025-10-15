import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { FIRESTORE_DB } from '../firebase/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import ProfileModel from '../models/ProfileModel';
import { Ionicons } from '@expo/vector-icons';


const ConversationsView = () => {
  const navigation = useNavigation();
  const user = getAuth().currentUser;
  const userId = user?.uid;
  const [conversations, setConversations] = useState([]);
  const [otherUserNames, setOtherUserNames] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const chatsRef = collection(FIRESTORE_DB, 'users', userId, 'chats');
    const q = query(chatsRef, orderBy('lastMessageTimestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedConversations = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      loadOtherUserNames(loadedConversations);
      setConversations(loadedConversations);
    });

    return () => unsubscribe();
  }, [userId]);

  const loadOtherUserNames = async (conversations) => {
    const profileModel = new ProfileModel();
    const userNames = {};

    for (const conversation of conversations) {
      const otherUserId = conversation.id;
      const otherUserData = await profileModel.fetchProfileData(otherUserId);
      userNames[otherUserId] = otherUserData?.name || "Usuario desconocido";
    }
    setOtherUserNames(userNames);
  };

  const handleContactPress = (id) => {
    navigation.navigate('ChatView', { contactId: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
      </View>
      {otherUserNames ? (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleContactPress(item.id)}>
              <View style={styles.conversationContainer}>
                <Text style={styles.conversationText}>{otherUserNames[item.id]}</Text>
                <View  style={styles.rowMessage}>
                  <Ionicons name="checkmark-done-outline" size={16} color="darkblue"/>
                  <Text style={styles.lastMessageText}>{item.lastMessage}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#6EC1F2"/>
        </View>
      )}
    </View>
  );
};

export default ConversationsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFA',
  },
  header: {
    backgroundColor: '#FFFFFA',
    padding: '5%',
    borderBottomWidth: 2,
    borderColor: '#6EC1F2',
    shadowColor: '#00000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    color: '#044389',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  conversationContainer: {
    padding: '3%',
    borderBottomWidth: 2,
    borderColor: '#6EC1F2',
    shadowColor: '#00000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  conversationText: {
    fontSize: 18,
    color: '#044389', // Azul oscuro para el nombre
    fontWeight: 'bold',
  },
  rowMessage:{
    flexDirection: 'row',
    marginTop: 5,
  },
  lastMessageText: {
    fontSize: 14,
    color: '#6EC1F2',
    marginLeft: '1%'
  },
  authMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#044389',
    fontWeight: '500',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
