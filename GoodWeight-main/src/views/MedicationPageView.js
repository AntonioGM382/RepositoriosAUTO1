import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MedicationsPageViewModel from '../viewmodels/MedicationPageViewModel'; // Asegúrate de que la ruta del archivo sea correcta
import { styles } from '../styles/MedicationsStyle';

const MedicationsPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { petId, visitId } = route.params;

  // Uso del ViewModel para obtener los medicamentos
  const { medications } = MedicationsPageViewModel(petId, visitId);

  const MedicationsHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Nombre</Text>
      <Text style={styles.header}>Dosis</Text>
      <Text style={styles.header}>Hasta..</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <MedicationsHeader/>
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.medicationItem}>
            <Text style={styles.medicationName}>{item.name}</Text>
            <Text style={styles.medicationText}>{item.dose}</Text>
            <Text style={styles.medicationExpiryDate}>{item.expiryDateFormatted}</Text>
          </View>
        )}
        style={styles.container}
      />
      <TouchableOpacity style={styles.addButton} onPress={
        () => navigation.navigate('AddMedication', {
            petId: petId,
            visitId: "Otro",
          })
      }>
        <Text style={styles.addButtonText}>Añadir nuevo tratamiento...</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MedicationsPage;
