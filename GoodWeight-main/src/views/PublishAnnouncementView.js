import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, Keyboard, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import WalkingModel from '../models/WalkingModel';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';


const PublishAnnouncementView = () => {
  const userId = getAuth().currentUser?.uid;
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false); // Estado de apertura del Dropdown
  const [numMascotas, setNumMascotas] = useState('0');
  const [price, setPrice] = useState();
  const [showDateModal, setShowDateModal] = useState(false);
  const [showStartTimeModal, setShowStartTimeModal] = useState(false);
  const [showEndTimepModal, setShowEndTimeModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [numMascotasItems, setNumMascotasItems] = useState([
    { label: 'Nº Mascotas', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: 'Indiferente', value: 'Indiferente' },
  ]);
 
  const addAnnouncement = async () => {
    if (!description ||  numMascotas == 0 || !price || date < new Date()) {
        Alert.alert('Error', 'Por favor completa todos los campos.');
        return;      
    }
    else{
      if (endTime.getHours() - startTime.getHours() < 0){
        Alert.alert('La hora de fin no puede ser menor que la de inicio');
        return;
      }
      else if (endTime.getHours() - startTime.getHours() == 0){
        if (endTime.getMinutes() - startTime.getMinutes() < 30){
          Alert.alert('El paseo debe durar minimo 30 minutos');
          return;
        }
      }
      else if (endTime.getHours() - startTime.getHours() == 1){
        if ((60 - startTime.getMinutes()) + endTime.getMinutes() < 30){
          Alert.alert('El paseo debe durar minimo 30 minutos');
          return;
        }
      }
    }

    const newAnnouncement = {
      userId,
      description,
      petNumber: numMascotas,
      price,
      date,
      startTime,
      endTime,
      createdAt: new Date(),
    };

    const walkingModel = new WalkingModel();
    const result = await walkingModel.addAnnouncement(newAnnouncement);

    if (result.success) {
      setDescription('');
      setNumMascotas('0');
      setPrice(0)
      Alert.alert('Éxito', '¡Anuncio publicado con éxito!');
    } else {
      Alert.alert('Error', 'Hubo un problema al publicar el anuncio.');
    }
  }


  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
      if (selectedDate < new Date()){
        Alert.alert('La fecha seleccionada es inferior a la actual');
      }
      else {
        setDate(selectedDate); // Actualiza la fecha seleccionada
      }
    }
  };
  const handleStartTimeChange = (event, selectedTime) => {
    if (event.type === 'set' && selectedTime) {
      setStartTime(selectedTime); // Actualiza la fecha seleccionada
    }
  };
  
  const handleEndTimeChange = (event, selectedTime) => {
    if (event.type === 'set' && selectedTime) {
      if (selectedTime.getHours() - startTime.getHours() < 0){
        Alert.alert('La hora de fin no puede ser menor que la de inicio');
      }
      else if (selectedTime.getHours() - startTime.getHours() == 0){
        if (selectedTime.getMinutes() - startTime.getMinutes() < 30){
          Alert.alert('El paseo debe durar minimo 30 minutos');
        }
        else{
          setEndTime(selectedTime); // Actualiza la fecha seleccionada
        }
        
      }
      else if (selectedTime.getHours() - startTime.getHours() == 1){
        if ((60 - startTime.getMinutes()) + selectedTime.getMinutes() < 30){
          console.log(selectedTime.getMinutes())
          Alert.alert('El paseo debe durar minimo 30 minutos');
        }
        else{
          setEndTime(selectedTime); // Actualiza la fecha seleccionada
        }
      }
      else{
        setEndTime(selectedTime); // Actualiza la fecha seleccionada
      }
      
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publica tu Anuncio</Text>

      <View style={styles.form}>

        <TextInput
          style={styles.descriptionInput}
          placeholder="Descripción del anuncio..."
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <View style={styles.infoRow}>
          <DropDownPicker
            open={open}
            value={numMascotas}
            items={numMascotasItems}
            setOpen={setOpen}
            setValue={setNumMascotas}
            setItems={setNumMascotasItems}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            onClose={() => Keyboard.dismiss()} // Close the keyboard when scrolling

          />
          <TextInput
            style={styles.priceInput}
            placeholder="Precio"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"

          />
        </View>
          <Text style={styles.subtitle}>Fecha del Paseo</Text>
          <TouchableOpacity style={styles.dateButton} onPress={()=>setShowDateModal(true)}>
            <Text style={styles.dateButtonText}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <Modal
            visible={showDateModal}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {/* Selector de fecha */}
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  textColor='#000'
                  
                />
                {/* Botón para cerrar el modal */}
                <TouchableOpacity
                  style={styles.closeModalButton}
                  onPress={() => setShowDateModal(false)}
                >
                  <Text style={styles.closeModalButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.timesContainer}>

            <View>
              <Text style={styles.timeSubtitle}>Hora de Inicio</Text>
              <TouchableOpacity style={styles.timeButton} onPress={()=> setShowStartTimeModal(true)}>
                <Text style={styles.dateButtonText}>{startTime.getHours()}:{startTime.getMinutes()}</Text>
              </TouchableOpacity>
              <Modal
                visible={showStartTimeModal}
                transparent={true}
                animationType="slide"
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    {/* Selector de fecha */}
                    <DateTimePicker
                      value={startTime}
                      mode="time"
                      display="spinner"
                      onChange={handleStartTimeChange}
                      textColor='#000'
                      minuteInterval={10}
                    />
                    {/* Botón para cerrar el modal */}
                    <TouchableOpacity
                      style={styles.closeModalButton}
                      onPress={() => setShowStartTimeModal(false)}
                    >
                      <Text style={styles.closeModalButtonText}>Confirmar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            <View>
              <Text style={styles.timeSubtitle}>Hora de Fin</Text>
              <TouchableOpacity style={styles.timeButton} onPress={()=>setShowEndTimeModal(true)}>
                <Text style={styles.dateButtonText}>{endTime.getHours()}:{endTime.getMinutes()}</Text>
              </TouchableOpacity>
              <Modal
                visible={showEndTimepModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowEndTimeModal(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    {/* Selector de fecha */}
                    <DateTimePicker
                      value={endTime}
                      mode="time"
                      display="spinner"
                      onChange={handleEndTimeChange}
                      textColor='#000'
                      minuteInterval={10}
                    />
                    {/* Botón para cerrar el modal */}
                    <TouchableOpacity
                      style={styles.closeModalButton}
                      onPress={() => setShowEndTimeModal(false)}
                    >
                      <Text style={styles.closeModalButtonText}>Confirmar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            
          </View>
        <TouchableOpacity style={styles.submitButton} onPress={addAnnouncement}>
          <Text style={styles.submitButtonText}>Publicar Anuncio</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default PublishAnnouncementView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFA',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#044389',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#044389',
    fontWeight: 'bold',
    marginBottom: '2%',
  },

  form: {
    zIndex: 1, // Añade un zIndex aquí si es necesario
  },
  descriptionInput: {
    borderColor: '#6EC1F2',
    height: '20%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    fontWeight: 'bold',
    marginBottom: '10%'
  },

  infoRow:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 2, 
    marginBottom: '5%'
  },

  dropdown: {
    borderColor: '#6EC1F2',
    marginLeft:'48%',
    width: '48%',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  dropdownContainer: {
    borderColor: '#6EC1F2',
    marginLeft:'48%',
    width: '48%',
  },
  
  priceInput:{
    borderColor: '#6EC1F2',
    width: '48%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  submitButton: {
    backgroundColor: '#044389',
    padding: '5%',
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 20,
  },

 
  dateButton: {
    backgroundColor: '#6EC1F2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  dateButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fondo semi-transparente
    
  },
  modalContent: {
    backgroundColor: '#ffffff',
    
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: '#6EC1F2',
    padding: 10,
    borderRadius: 10,
    
  },
  closeModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  timesContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'center',
    marginBottom: '20%'
  },
  timeButton: {
    backgroundColor: '#6EC1F2',
    paddingHorizontal: '17.5%',
    paddingVertical: '10%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  timeSubtitle: {
    fontSize: 18,
    color: '#044389',
    fontWeight: 'bold',
    marginBottom: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

