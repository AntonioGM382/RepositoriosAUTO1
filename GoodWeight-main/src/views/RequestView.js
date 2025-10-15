import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import WalkingModel from '../models/WalkingModel';


const RequestView = ({ route, navigation }) => {
  const { announcement } = route.params;
  const user = getAuth().currentUser;

  const handleSendRequest = async () => {
    
    const request = {
        announcementId: announcement.id,
        senderId: user.uid, 
        receiverId: announcement.userData.userId,
        status: "pendiente",
        createdAt: new Date()
    };
    const walkingModel = new WalkingModel();
    const result = await walkingModel.sendRequest(request);
    if (!result.success) {
        console.log("Error al enviar la solicitud:", result.error); // Log error
        alert("Hubo un error al enviar la solicitud. Inténtalo de nuevo.");
    } else {
        console.log("Solicitud enviada exitosamente:", result.id); // Log success
        alert("Solicitud enviada exitosamente.");
    }
};


  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long'});
  };

  const formatTime = (timestamp) => {
    const time = timestamp.toDate();
    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
           
        <View style={styles.topContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={40} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.date}>{formatDate(announcement.date)}</Text>
        </View>
        <ScrollView>
        <View style={styles.infoSection}>
            <View style={styles.route}>
            <Text style={styles.time}>{formatTime(announcement.startTime)}</Text>
            {/*<Text style={styles.location}>{announcement.startLocation}</Text>*/}
            </View>
            <View style={styles.route}>
            <Text style={styles.time}>{formatTime(announcement.endTime)}</Text>
            {/*<Text style={styles.location}>{announcement.endLocation}</Text>*/}
            </View>
            <Text style={styles.price}>{announcement.price}€</Text>
        </View>

        <Text style={styles.user}>Usuario</Text>

        <View style={styles.userProfile}>
            <Image source={{ uri: announcement.userData.imageUrl }} style={styles.profileImage} />
            <View>
                <Text style={styles.userName}>{announcement.userData.name}</Text>
                <Text style={styles.userRating}>⭐ {/*{announcement.userData.rating} - {announcement.userData.reviews}*/} opiniones</Text>
                <Text style={styles.userBio}>{announcement.userData.biography}</Text>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={()=>navigation.navigate('ProfileView', { userData: announcement.userData })}>
                <Ionicons name="chevron-forward-outline" size={30} color={'black'} marginLeft={10}/>
            </TouchableOpacity>
        </View>
        <View style={styles.userInfo}>
            <Text style={styles.announcementDescription}>{announcement.description}</Text>
            {announcement.userData.skills ? (
                announcement.userData.skills.map((item, index) => (
                <View key={item + index} style={styles.skillRow}>
                    <Ionicons name="checkmark-circle-outline" size={20} />
                    <Text style={styles.skillText}>{item}</Text>
                </View>
                ))
                ) : (
                <Text>Este Usuario no tiene habilidades</Text>
            )}
        </View>
        </ScrollView>
            <TouchableOpacity style={styles.requestButton} onPress={handleSendRequest}>
              <Text style={styles.buttonText}>Enviar solicitud</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFA',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingTop:'15%'
  },
  date: {
    color: '#044389',
    fontSize: 26,
    fontWeight: 'bold',
  },
  infoSection: {
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    borderBottomWidth: 20,
    borderBottomColor: '#FFFFDA'
  },
  route: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  time: {
    color: '#044389',
    fontSize: 20,
    fontWeight: 'bold'
  },
  location: {
    color: '#AAAAAA',
    fontSize: 16,
  },
  price: {
    color: '#23C552',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  user: {
    paddingVertical: '5%',
    textAlign: 'center',
    color: '#044389',
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 20,
    borderBottomColor: '#FFFFDA',
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: '15',
  },
  userName: {
    color: '#0000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userRating: {
    color: '#0000000',
    fontSize: 14,
  },
  userBio: {
    color: '#000',
    fontSize: 16,
  },
  userInfo: {
    marginBottom: 20,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },

  announcementDescription:{
    color: '#000',
    fontSize: 18,
    paddingVertical: '5%'
  },

  skillRow: {
    flexDirection: 'row',
    marginVertical:'2%'
  },
  skillText: {
    fontSize: 18,
    color: '#044389',
    marginLeft: '5%',
    fontWeight: 'bold',

  },
  requestContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  requestButton: {
    backgroundColor: '#6EC1F2',
    padding: '4%',
    paddingBottom: '7%',
    borderRadius: 30,
    position: 'relative'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight:'bold'
  },
});

export default RequestView;
