import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PaseoTabBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const getIcon = (routeName, focused) => {
    switch (routeName) { 
      case 'Mapa de Paseadores':
        return focused ? require('../../assets/map_focused.png') : require('../../assets/map.png');
      case 'Foro':
        return focused ? require('../../assets/announcement_focused.png') : require('../../assets/announcement_focused.png');
      case 'Anuncios':
        return focused ? require('../../assets/publish_focused.png') : require('../../assets/publish.png');
      case 'Chats':
        return focused ? require('../../assets/chat_focused.png') : require('../../assets/chat.png');
      default:
        return null;
    }
  };

  const tabItems = [
    { route: 'Mapa de Paseadores', label: 'Mapa' },
    { route: 'Foro', label: 'Foro' },
    { route: 'Anuncios', label: 'Anuncios' },
    { route: 'Chats', label: 'Chats' },
  ];

  return (
    <View style = {styles.headerContainer}>
      {tabItems.map((item) => {
          const focused = route.name === item.route;
          return (
          <TouchableOpacity 
              key={item.route} 
              style={styles.tabButton} 
              onPress={() => navigation.navigate(item.route)}
          >
              <Image 
              source={getIcon(item.route, focused)} 
              style={focused ? styles.tabIconFocused : styles.tabIcon} 
              />
          </TouchableOpacity>
          );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#6EC1F2',  // Azul oscuro, color principal
        flexDirection: 'row',
        paddingTop: '15%',
        paddingBottom: '5%',
    },  
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabIcon: {
        width: 35,
        height: 35,

    },
    tabIconFocused: {
        width: 30,
        height: 30,
    },
    
});

export default PaseoTabBar;
