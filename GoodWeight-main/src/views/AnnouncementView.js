import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import ProfileModel from '../models/ProfileModel';
import { Timestamp } from 'firebase/firestore';


const AnnouncementView = ({ navigation }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) setCurrentUserId(user.uid);

    const fetchAnnouncements = async () => {
      try {
        let announcementQuery;
        if (filterType === 'paseador') {
          announcementQuery = query(
            collection(FIRESTORE_DB, 'announcements'),
            where('type', '==', 'paseador')
          );
        } else if (filterType === 'dueño') {
          announcementQuery = query(
            collection(FIRESTORE_DB, 'announcements'),
            where('type', '==', 'dueño')
          );
        } else {
          announcementQuery = query(collection(FIRESTORE_DB, 'announcements'), where('userId', '!=', user.uid));
        }

        const announcementSnapshot = await getDocs(announcementQuery);
        let announcementsData = announcementSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (currentUserId) {
          announcementsData = announcementsData.filter(announcement => announcement.userId !== currentUserId);
        }

        const announcementsWithProfiles = await Promise.all(
          announcementsData.map(async (announcement) => {
            const profileModel = new ProfileModel();
            const userData = await profileModel.fetchProfileData(announcement.userId);
            return { ...announcement, userData };
          })
        );

        setAnnouncements(announcementsWithProfiles);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, [currentUserId, filterType]);
  
  const formatDate = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      const date = timestamp.toDate();
      return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return '';
  };
  const formatTime = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      const time = timestamp.toDate();
      const hours = time.getHours();
      const minutes = time.getMinutes();
      return hours +":"+minutes;
    }
    return '';
  };
  
  const viewProfile = async (userId) => {
    try {
      const profileModel = new ProfileModel();
      const userData = await profileModel.fetchProfileData(userId);

      if (userData) {
        navigation.navigate('ProfileView', { userData });
      } else {
        Alert.alert('Error', 'El perfil del usuario no está disponible.');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const renderAnnouncement = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('RequestView', { announcement: item })}>
        <View style={styles.announcementCard}>
          <Text style={styles.priceText}>{item.price}€</Text>
          
          {item.userData && (
            <> 
              <Text style={styles.announcementName}>{item.userData.name}</Text>
              <Text style={styles.announcementBio}>{item.userData.biography}</Text>
            </>
          )}
          <Text style={styles.announcementDescription}>{item.description}</Text>
          <View style={styles.announcementDetails}>
            <Text style={styles.detailText}>📅 Fecha: {formatDate(item.date)}</Text>
            <Text style={styles.detailText}>🕒 Inicio: {formatTime(item.startTime)} - Fin: {formatTime(item.endTime)}</Text>
            <Text style={styles.detailText}>🐾 Número de mascotas: {item.petNumber}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={announcements}
        renderItem={renderAnnouncement}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay anuncios todavía.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFA',
    padding: 20,
    marginBottom: '15%'
  },
  announcementCard: {
    backgroundColor: '#FFFFE0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    position: 'relative',
  },
  priceText: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 22,
    color: 'green',
    fontWeight: 'bold',
  },
  announcementName: {
    fontSize: 20,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  announcementBio: {
    fontSize: 14,
    color: '#95A5A6',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  announcementDescription: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 15,
    lineHeight: 22,
  },
  announcementDetails: {
    marginTop: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  profileButton: {
    backgroundColor: '#3498DB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  profileButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default AnnouncementView;
