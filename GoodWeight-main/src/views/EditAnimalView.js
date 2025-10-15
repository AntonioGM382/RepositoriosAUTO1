import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, ScrollView, Switch, Modal, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import EditAnimalViewModel from '../viewmodels/EditAnimalViewModel';
import { styles } from '../styles/EditAnimalStyles';  

const EditAnimalView = () => {
  const { petId } = useRoute().params;  // petId will be null for new animals
  const navigation = useNavigation();
  const {
    animalData,
    setName,
    setColor,
    setMicrochipNumber,
    setWeight,
    setSterilized,
    setGender,
    setAge,
    saveAnimal,
    loading,
  } = EditAnimalViewModel(petId);

  const [vaccinationDateModalVisible, setVaccinationDateModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (day) => {
    setSelectedDate(day.dateString);
    const currentDate = new Date(day.dateString);

    const dayFormatted = currentDate.getDate().toString().padStart(2, '0');
    const monthFormatted = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const yearFormatted = currentDate.getFullYear().toString();
    const formattedDate = `${dayFormatted}${monthFormatted}${yearFormatted}`;

    setAge(formattedDate);  // Store formatted date as a string
    setVaccinationDateModalVisible(false);
  };

  const handleSave = async () => {
    const success = await saveAnimal();
    if (success) {
      Alert.alert('Éxito', 'Datos del animal guardados.');
      navigation.navigate('HomeAnimal', { petId: success });
    } else {
      Alert.alert('Error', 'No se pudieron guardar los datos.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Introduce el nombre de tu mascota:</Text>
      <TextInput
        style={styles.input}
        value={animalData.name}
        onChangeText={setName}
        placeholder="Nombre de tu mascota"
      />

      <Text style={styles.text}>Tipo Animal:</Text>
      <TextInput
        style={[styles.input, { color: 'grey', backgroundColor: '#e0e0e0' }]}
        value={animalData.species}
        editable={false}
        placeholder="Tipo Animal"
        placeholderTextColor="grey"
      />

      <Text style={styles.text}>Raza:</Text>
      <TextInput
        style={[styles.input, { color: 'grey', backgroundColor: '#e0e0e0' }]}
        value={animalData.breed}
        editable={false}
        placeholder="Raza"
        placeholderTextColor="grey"
      />

      <Text style={styles.text}>Color:</Text>
      <TextInput
        style={styles.input}
        value={animalData.color}
        onChangeText={setColor}
        placeholder="Color del animal"
      />

      <Text style={styles.text}>Peso (Kg):</Text>
      <TextInput
        style={styles.input}
        value={animalData.weight}
        onChangeText={setWeight}
        placeholder="Peso (Kg)"
        keyboardType="decimal-pad"
      />

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>¿Está esterilizado?</Text>
        <Switch value={animalData.isSterilized} onValueChange={setSterilized} />
      </View>

      <Text style={styles.text}>Número de microchip:</Text>
      <TextInput
        style={styles.input}
        value={animalData.microchip}
        onChangeText={setMicrochipNumber}
        placeholder="Número de microchip"
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={() => setVaccinationDateModalVisible(true)} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>
          {selectedDate ? `Fecha de nacimiento: ${selectedDate}` : 'Selecciona la fecha de nacimiento'}
        </Text>
      </TouchableOpacity>

      <Modal visible={vaccinationDateModalVisible} transparent={true} animationType="slide">
        <View style={modalStyles.modalBackground}>
          <View style={modalStyles.modalContainer}>
            <Calendar
              onDayPress={handleDateChange}
              markingType={'single'}
              markedDates={{
                [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
              }}
            />
            <Button title="Cancelar" onPress={() => setVaccinationDateModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const modalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
});

export default EditAnimalView;
