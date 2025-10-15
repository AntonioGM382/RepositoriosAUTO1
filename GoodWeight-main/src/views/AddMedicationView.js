import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Switch, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { handleSaveMedication } from '../viewmodels/AddMedicationViewModel';

const AddMedication = ({ navigation, route }) => {
  const { petId, visitId, edit, name, dose, durationDate } = route.params;

  const [medicationData, setMedicationData] = useState({
    name: name,
    dose: dose,
    duration: durationDate == ''? '':new Date(durationDate),
  });

  const [isChronic, setIsChronic] = useState(  durationDate == new Date(2000,11,31).toISOString()? true: false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const handleToggleChronic = () => {
    setIsChronic(prevState => !prevState);
    if (!isChronic) {
      const chronicDate = new Date(2000, 11, 31);
      setMedicationData({ ...medicationData, duration: chronicDate });
    } else {
      setMedicationData({ ...medicationData, duration: '' });
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
      setTempDate(selectedDate);
      if (Platform.OS === 'ios') {
        setMedicationData({ ...medicationData, duration: selectedDate });
      }
    }
  };

  const handleSave = () => {
    handleSaveMedication(medicationData, petId, visitId, navigation, edit);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{edit ? "Editar Tratamiento": "Añadir Tratamiento"}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre del tratamiento"
        value={medicationData.name}
        onChangeText={(text) => setMedicationData({ ...medicationData, name: text })}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Dosis del tratamiento"
        value={medicationData.dose}
        onChangeText={(text) => setMedicationData({ ...medicationData, dose: text })}
        placeholderTextColor="#999"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Tratamiento Crónico</Text>
        <Switch
          onValueChange={handleToggleChronic}
          value={isChronic}
          thumbColor={isChronic ? '#007AFF' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>

      {!isChronic && (
        <View style={styles.datePickerContainer}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>
              {medicationData.duration
                ? `Duración del tratamiento: ${formatDate(medicationData.duration)}`
                : 'Selecciona la duración del tratamiento'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {showDatePicker && (
        <View>
          {Platform.OS === 'ios' && (
            <Button title="Confirmar fecha" onPress={() => setShowDatePicker(false)} />
          )}
          <DateTimePicker
            value={tempDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={handleDateChange}
          />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Añadir tratamiento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFA',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#C6C6C8',
    marginBottom: 20,
    fontSize: 18,
    paddingVertical: 8,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  datePickerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  dateButton: {
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  dateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default AddMedication;
