import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './CreateAnimalStyles';

const CreateAnimalScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu mascota</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('AnimalDataScreen')}
      >
        <Text style={styles.startButtonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAnimalScreen;
