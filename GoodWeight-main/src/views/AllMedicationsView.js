import React from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../styles/MedicationsStyle'; // Asegúrate de ajustar la ruta correcta
import { formatDate } from '../Screens/AnimalScreen/Server'; // Asegúrate de ajustar la ruta correcta
import AllMedicationsViewModel from '../viewmodels/AllMedicationsViewModel';  // Importamos el ViewModel

const AllMedications = () => {
  const navigation = useNavigation();
  const {petId} = useRoute().params;
  // Usamos el ViewModel para manejar la lógica de la vista
  const {
    medications,
    filter,
    searchQuery,
    setSearchQuery,
    toggleFilter
  } = AllMedicationsViewModel(petId);

  const renderItem = ({ item }) => {
  // Convertimos durationDate a un objeto Date si es necesario
  const durationDate = new Date(item.durationDate);
  const isIndefinido = durationDate.getDate() === 31 && durationDate.getMonth() === 11 && durationDate.getFullYear() === 2000;
  const isExpired = !isIndefinido && durationDate < new Date();
  const itemStyle = isExpired ? { ...styles.medicationItem, ...styles.expiredItem } : styles.medicationItem;
  const displayDate = isIndefinido ? 'Indefinido' : formatDate(durationDate);
    
    return (
      <TouchableOpacity onPress={()=>addMedication(true, item)}>
      <View style={itemStyle}>
        <Text style={styles.medicationName}>{item.name}</Text>
        <Text style={styles.medicationText}>{item.dose}</Text>
        <Text style={styles.medicationExpiryDate}>{displayDate}</Text>
      </View>
      </TouchableOpacity>
    );
  };
  
  const addMedication = (edit, item) => {
    if(edit == false){
      navigation.navigate('AddMedication', {
        petId: petId,
        visitId: "MedicacionSinVisita",
        edit: edit,
        name: '',
        dose: '',
        durationDate: ''
      });
    }
    else{
      navigation.navigate('AddMedication', {
        petId: petId,
        visitId: "MedicacionSinVisita",
        edit: edit,
        name: item.name,
        dose: item.dose,
        durationDate: item.durationDate.toISOString()
      });
    }
  };

  const FilterSegmentedControl = () => (
    <View style={styles.segmentedControlContainer}>
      {[
        { label: 'Todos', value: 'all' },
        { label: 'Actuales', value: 'current' },
        { label: 'Caducados', value: 'expired' }
      ].map((filterOption) => {
        const isActive = filter === filterOption.value;
        return (
          <TouchableOpacity
            key={filterOption.label}
            style={[styles.segmentedControlButton, isActive && styles.segmentedControlButtonActive]}
            onPress={() => toggleFilter(filterOption.value)}
          >
            <Text style={[styles.segmentedControlButtonText, isActive && styles.segmentedControlButtonTextActive]}>
              {filterOption.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar medicamento..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FilterSegmentedControl />
      <View style={styles.headerContainer}>
            <Text style={styles.header}>Nombre</Text>
            <Text style={styles.header}>Dosis</Text>
            <Text style={styles.header}>Hasta..</Text>
      </View>
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={()=>addMedication(false, null)}>
        <Text style={styles.addButtonText}>Añadir nuevo medicamento...</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AllMedications;
