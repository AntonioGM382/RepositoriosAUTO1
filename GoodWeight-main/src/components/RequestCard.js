import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RequestCard = ({ request, onAccept, onDeny }) => {
  const { sender, announcement, status } = request;
  const formattedDate = announcement.date.toDate().toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long'
  });
  const startTime = announcement.startTime.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const endTime = announcement.endTime.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const recieved = true ? onAccept : false;
  return (
    <View style={styles.card}>
      <View style ={styles.topCard}>
        <View style={styles.leftCard}>
          <View>
            <Image source={{ uri: sender.imageUrl }} style={styles.profileImage} />
          </View>
          <View style={styles.info}>
              {!recieved?
                (<Text style={styles.name}>Tu paseo</Text>)
                :(<Text style={styles.name}> Pasea con {sender.name}</Text>)
              }
              <Text style={styles.description}>{announcement.description}</Text>
          </View>
        </View>
        <View  style={styles.rightCard}>
          {(status === 'pendiente' && recieved) && (
            <View>
              <TouchableOpacity 
                style={[styles.acceptButton, styles.button]} 
                onPress={onAccept}
                activeOpacity={0.1}
              >
                <Ionicons name="checkmark-circle" size={40} color="#23C552" shadowOpacity={0.2}/>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.denyButton, styles.button]} 
                onPress={onDeny}
                activeOpacity={0.1}
              >
                <Ionicons name="close-circle" size={40} color="#F44336" shadowOpacity={0.2}/>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={styles.botCard} >
        <View>
          <Text style={styles.textPrice} >{announcement.price}€</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.time}>{startTime} - {endTime}</Text>
        </View>
      </View>        
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: '5%',
    paddingHorizontal: '2%',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'column',
    marginVertical: 10,
  },
  topCard: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Asegura alineación en la parte superior
    marginBottom: 10,
  },
  leftCard: {
    flexDirection: 'row',
    flex: 1,
  },
  rightCard: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: '10%',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#044389',
  },
  info: {
    flex: 1,
    flexShrink: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#044389',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#6A6A6A',
    marginVertical: 5,
    flexShrink: 1,
    textAlign: 'justify',
  },
  botCard: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribuye espacio entre los elementos
    alignItems: 'center',
  },
  textPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#23C552',
    marginLeft: '6%'
  },
  timeContainer: {
    flex: 1,
  },
  date: {
    fontSize: 16,
    color: '#044389',
  },
  time: {
    fontSize:16,
    color: '#044389',
  },
  button: {
    borderRadius: 20,
    marginVertical: 5,
    alignSelf: 'flex-end', // Asegura que los botones no ocupen espacio en la fila
  },
  acceptButton: {
    backgroundColor: '#E0F7E1',
  },
  denyButton: {
    backgroundColor: '#FFEBEE',
  },
});


export default RequestCard;
