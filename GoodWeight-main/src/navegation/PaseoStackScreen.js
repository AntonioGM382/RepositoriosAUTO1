import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaseoTabBar from '../components/PaseoTabBar';  // Importamos el menú personalizado
import AllRequestsView from '../views/AllRequestsView';
import AnnouncementView from '../views/AnnouncementView';
import PublishAnnouncement from '../views/PublishAnnouncementView';
import ConversationsView from '../views/ConversationsView'


const PaseoStack = createNativeStackNavigator();

const PaseoStackScreen = () => {
  return (
    <View style={styles.container}>
        <PaseoTabBar />
        <PaseoStack.Navigator>
            <PaseoStack.Screen 
            name="Mapa de Paseadores" 
            component={AllRequestsView} 
            options={{ 
                headerTitle: 'Mapa de Paseadores',
                headerShown: false,  
                headerStyle: { backgroundColor: '#044389' }, 
                headerTintColor: '#fff',
            }}
            />
            <PaseoStack.Screen 
            name="Foro" 
            component={AnnouncementView} 
            options={{ 
                headerTitle: 'Foro de Paseadores',
                headerStyle: { backgroundColor: '#044389' },
                headerTintColor: '#fff',
                headerShown: false
            }}
            />
            <PaseoStack.Screen 
            name="Anuncios" 
            component={PublishAnnouncement} 
            options={{ 
                headerTitle: 'Anuncios de Paseadores',
                headerStyle: { backgroundColor: '#044389' },
                headerTintColor: '#fff',
                headerShown: false
            }}
            />

            <PaseoStack.Screen 
            name="Chats" 
            component={ConversationsView} 
            options={{ 
                headerTitle: 'Conversaciones',
                headerStyle: { backgroundColor: '#044389' },
                headerTintColor: '#fff',
                headerShown: false
            }}
            />
        </PaseoStack.Navigator>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#044389',  // Azul oscuro
    height: 70,
    borderRadius: 50,
    marginHorizontal: '5%',
    position: 'absolute',
    bottom: 10,  // Ajustar la posición para que esté al fondo
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default PaseoStackScreen;
