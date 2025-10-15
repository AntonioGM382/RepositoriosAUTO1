import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';


const SettingsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [isAppearanceEnabled, setIsAppearanceEnabled] = useState(false);
  const navigation = useNavigation();


  const toggleSwitch = (settingName) => {
    if (settingName === 'notifications') {
      setIsNotificationsEnabled(previousState => !previousState);
    } else if (settingName === 'location') {
      setIsLocationEnabled(previousState => !previousState);
    } else if (settingName === 'appearance') {
      setIsAppearanceEnabled(previousState => !previousState);
    }
  };

  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      // Sign-out successful.
      Alert.alert("Logged Out", "You have been successfully logged out.");
      // Optionally, navigate the user to the login screen or perform other actions
    }).catch((error) => {
      // An error happened.
      console.error("Logout error:", error);
      Alert.alert("Logout Error", "An error occurred while trying to log out.");
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View style = {styles.topContainer}>
        <Text style={styles.title}>Ajustes</Text>
      </View>
      <View style = {styles.botContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Notificaciones</Text>
          <Switch
            onValueChange={() => toggleSwitch('notifications')}
            value={isNotificationsEnabled}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Localización</Text>
          <Switch
            onValueChange={() => toggleSwitch('location')}
            value={isLocationEnabled}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Apariencia</Text>
          <Switch
            onValueChange={() => toggleSwitch('appearance')}
            value={isAppearanceEnabled}
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('QAScreen')} style={styles.settingItem}>
            <Text style={styles.settingText}>Preguntas Frecuentes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.settingItem}>
            <Text style={styles.settingText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFA',
  },
  topContainer:{
    marginTop: '20%',
  },
  botContainer:{
    borderTopWidth: 2,
    paddingHorizontal: '2%',
    borderColor: '#044389', // Stylish blue border
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  settingText: {
    fontSize: 18,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF5733', // A bright color for visibility, change as needed
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15, // To align with the title's margin
  },
  logoutButtonText: {
    color: '#FFFFFF', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Add more styles as needed
});

export default SettingsScreen;
