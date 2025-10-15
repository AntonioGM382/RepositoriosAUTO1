import React, { useState} from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import ProfileViewModel from '../viewmodels/ProfileViewModel';
import { uploadImage } from '../components/UploadImage';
import { Timestamp } from 'firebase/firestore';


const ProfileView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = getAuth().currentUser;
  const otherUserData = route.params?.userData || null;
  const [selectedTab, setSelectedTab] = useState('Información'); // Controla la pestaña seleccionada
  const { userData, announcements,loading, error} = ProfileViewModel(otherUserData, user);


  const handleContactPress = () => {
    navigation.navigate('ChatView', { contactId: otherUserData.userId });
  };

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
  const renderAnnouncement = ({ item }) => {
    return (
      <View style={styles.announcementCard}>
        <Text style={styles.priceText}>{item.price}€</Text>
        <Text style={styles.announcementDescription}>{item.description}</Text>
        <View style={styles.announcementDetails}>
          <Text style={styles.detailText}>📅 Fecha: {formatDate(item.date)}</Text>
          <Text style={styles.detailText}>🕒 Inicio: {formatTime(item.startTime)} - Fin: {formatTime(item.endTime)}</Text>
          <Text style={styles.detailText}>🐾 Número de mascotas: {item.petNumber}</Text>
        </View>

        <TouchableOpacity style={styles.profileButton} onPress={() => viewProfile(item.userId)}>
          <Text style={styles.profileButtonText}>Ver perfil</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const DetailButton = ({ label, onPress }) => (
    <TouchableOpacity style={styles.detailButtonContainer} onPress={onPress}>
      <Text style={styles.detailButtonText}>{label}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <View><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  if (error) {
    return <View><Text>{error}</Text></View>;
  }

  if (!userData) {
    return <View><Text>No se encontraron datos de perfil</Text></View>;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={40} color={'black'} />
          </TouchableOpacity>
          {!otherUserData && (
            <TouchableOpacity style={styles.cameraButton} onPress={() => uploadImage(user.uid, 'user')}>
              <Ionicons name="camera-outline" size={40} color={'black'} />
            </TouchableOpacity>
          )}
        </View>

        {/* Pestañas de navegación */}
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setSelectedTab('Información')} style={[styles.tab, selectedTab === 'Información' && styles.activeTab]}>
            <Text style={styles.tabText}>Información</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab('Anuncios')} style={[styles.tab, selectedTab === 'Anuncios' && styles.activeTab]}>
            <Text style={styles.tabText}>Anuncios</Text>
          </TouchableOpacity>
        </View>

        {/* Contenido de la pestaña seleccionada */}
        {selectedTab === 'Información' ? (
        <ScrollView>
          
              <View style={styles.midContainer}>
                {userData.imageUrl ? (
                  <Image source={{ uri: userData.imageUrl }} style={styles.profileImage} />
                ) : (
                  <Image source={require('../../assets/default_profile.png')} style={styles.defaultImage} />
                )}
              </View>
              <View style={styles.botContainer}>
              <View style={styles.profileData}>
                <Text style={styles.profileName}>{userData.name} {userData.surname}</Text>
                <Text style={styles.profileBiography}>{userData.biography}</Text>
                <Text style={styles.title}>Sobre ti</Text>
                <Text style={styles.aboutYou}>{userData.aboutYou}</Text>
                <Text style={styles.title}>Habilidades</Text>
                {userData.skills ? (
                  userData.skills.map((item, index) => (
                    <View key={item + index} style={styles.skillRow}>
                      <Ionicons name="checkmark-circle-outline" size={20} />
                      <Text style={styles.skillText}>{item}</Text>
                    </View>
                  ))
                ) : (
                  <Text>No hay habilidades</Text>
                )}
              </View>
            </View>
            {!otherUserData  &&
            <View style={styles.buttonGrid}>
              <DetailButton
                iconName="editProfile"
                label="Editar Perfil"
                onPress={() => navigation.navigate('EditProfile', { profileData: userData })}
              />
              <DetailButton
                iconName="settings"
                label="Configuración"
                onPress={() => navigation.navigate('Settings')}
              />
            </View>}  
          
        </ScrollView>
        ) : (
          <FlatList
            data={announcements}
            renderItem={renderAnnouncement}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            ListEmptyComponent={<Text style={styles.emptyText}>No tienes anuncios todavía.</Text>}
          />
        )}
      </SafeAreaView>
      
      {otherUserData && (
        <View style={styles.contactContainer}>
          <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
            <Text style={styles.contactButtonText}>Habla con {userData.name}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  
  tab: {
    paddingVertical: 10,
    width: '50%',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#044389',
  },
  tabText: {
    fontSize: 18,
    color: '#7D7D7D',
  },
  container: {
    backgroundColor: '#FFFFFA', // Light background for a modern feel
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%'
  },

  midContainer: {
    alignItems: 'center',
    marginTop:'10%'
  },
  defaultImage: {
    height: 225,
    width: 225,
    borderRadius: 180,
    borderWidth: 5,
    borderColor: '#044389',
  },
  profileImage: {
    height: 225,
    width: 225,
    borderRadius: 180,
    borderWidth: 5,
    borderColor: '#044389',
  },

  botContainer: {
    margin: '5%',
  },
  profileName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#044389',
  },
  profileBiography: {
    fontSize: 16,
    color: '#7D7D7D', // Lighter color for secondary information
    marginVertical: 5,
    fontWeight: 'bold'
  },
  aboutYou: {
    fontSize: 16,
    color: '#7D7D7D', // Lighter color for secondary information
    marginVertical: 5,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 22,
    color: '#044389',
    fontWeight: 'bold',
    marginVertical: 10
  },
  skillRow: {
    flexDirection: 'row',
    marginVertical:'2%'
  },
  skillText: {
    fontSize: 16,
    color: '#FC9E4F',
    marginLeft: '5%',
    fontWeight: 'bold',

  },
  selectedSkillText: {
    color: '#FFFFFF',
  },

  buttonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    
    marginBottom: '20%',
  },
  detailButtonContainer: {
    backgroundColor: '#6EC1F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12, // Softer rounded corners for buttons
    height: '50%',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4, // Added shadow for a lifted button effect
  },

  detailButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight:'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contactButton: {
    backgroundColor: '#6EC1F2',
    padding: '4%',
    paddingBottom: '7%',
    borderRadius: 30,
    position: 'relative'
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight:'bold'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  list: {
    marginTop: 20,
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
    position: 'relative', // Necesario para el posicionamiento absoluto
  },
  priceText: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 22,
    color: '#E74C3C',
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
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  emptyText: {
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },

});
export default ProfileView;
