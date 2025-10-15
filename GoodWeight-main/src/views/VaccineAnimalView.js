// VaccineAnimal.js (View)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useVaccineViewModel } from '../viewmodels/VaccineAnimalViewModel'; // Import ViewModel
import { formatDate } from '../Screens/AnimalScreen/Server';  // Función de formato de fecha

const VaccineAnimal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { petId, species } = route.params;

  // Obtener datos desde el ViewModel
  const { vaccines } = useVaccineViewModel(petId);
  console.log(route.params);

  const navigateToAddVaccine = (edit) => {
    navigation.navigate('AddVaccine', {
      petId: petId,
      visitId: "MedicacionSinVisita",
      species: species,
      edit: edit
    });
  };

  const renderItem = ({ item }) => {
    const { name, date, nextDate } = item;

    const formattedDate = date?.toDate ? formatDate(date.toDate()) : 'N/A';
    const formattedNextDate = nextDate?.toDate ? formatDate(nextDate.toDate()) : 'N/A';

    return (
      <TouchableOpacity onPress={() => navigateToAddVaccine(true)} style={styles.editButton}>
      <View style={styles.vaccineItem}>
        <Text style={styles.vaccineName}>{name}</Text>
        <Text style={styles.vaccineDate}>{formattedDate}</Text>
        <Text style={styles.vaccineNextDue}>{formattedNextDate}</Text>       
      </View>
      </TouchableOpacity>

    );
  };

  const VaccinesHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Nombre</Text>
      <Text style={styles.header}>Vacunado Día</Text>
      <Text style={styles.header}>Próxima Vacuna</Text>
    </View>
  );

  return (
    
    <View style={styles.container}>
      <VaccinesHeader/>
      <FlatList
        data={vaccines}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />
      <TouchableOpacity style={styles.addButton} onPress={()=>navigateToAddVaccine(false)}>
        <Text style={styles.addButtonText}>Añadir nueva vacuna...</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFA',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#303656',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  vaccineItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: '#007AFF',
    padding: 12,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  list: {
    backgroundColor: '#fff',
  },
  vaccineName: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
  vaccineDate: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
  vaccineNextDue: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: 'black', 
  },
  
});

export default VaccineAnimal;
