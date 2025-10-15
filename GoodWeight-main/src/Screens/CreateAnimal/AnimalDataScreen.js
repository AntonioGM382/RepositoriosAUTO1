import React, { useState, useEffect } from 'react'; 
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Modal, Alert, Image, ScrollView, checkbox } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchBreeds } from './CreateAnimalServer';
import { useNavigation } from '@react-navigation/native';

const AnimalDataScreen = () => {
  const [animalName, setAnimalName] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [isMixed, setIsMixed] = useState(false);
  const [gender, setGender] = useState('');
  const [sterilized, setSterilized] = useState(false);
  const [age, setage] = useState(new Date());
  const [breeds, setBreeds] = useState([]);
  const [breedQuery, setBreedQuery] = useState('');
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [showDateModal, setShowDateModal] = useState(false);
  const navigation = useNavigation();
  const dog_cat = require('../../../assets/dog_cat_create.png');


  // Nueva función de actualización de las razas
  useEffect(() => {
    const initFetchBreeds = async () => {
      if (selectedSpecies) {
        const breedsList = await fetchBreeds(selectedSpecies);
        setBreeds(breedsList);
        setFilteredBreeds(breedsList);
      }
    };

    if (selectedSpecies) {
      initFetchBreeds();
    }
  }, [selectedSpecies]);

  // Función para gestionar el cambio en la búsqueda de raza
  const handleBreedInputChange = (input) => {
    setBreedQuery(input);
    if (input === '') {
      setFilteredBreeds(breeds);
    } else {
      const newFilteredBreeds = breeds.filter(breed => breed.label.toLowerCase().includes(input.toLowerCase()));
      setFilteredBreeds(newFilteredBreeds);
    }
  };


  // Función para seleccionar la raza
  const handleSelectBreed = (breed) => {
    setSelectedBreed(breed.label);
    setBreedQuery(breed.label);
    setFilteredBreeds([]);
  };

  const handleContinue = () => {
    if (animalName && selectedSpecies && (selectedBreed || isMixed)  && gender) {
      const animalData = {
        animalName,
        selectedSpecies,
        selectedBreed,
        age: age.toISOString(), // Serializamos la fecha antes de enviarla
        sterilized,
        gender,
      };
      navigation.navigate('AnimalFoodScreen', { animalData });
    } else {
      alert('Por favor complete todos los campos');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
      setage(selectedDate); // Actualiza la fecha seleccionada
    }
  };

  const showDatePickerHandler = () => {
    setShowDateModal(true); // Muestra el modal de selección de fecha
  };

  const formattedDate = age.toLocaleDateString(); // Convertir la fecha a un formato legible

  return (
    <ScrollView alwaysBounceVertical={false} scrollEnabled={true}>
      <View style={styles.container}>
        {/* Imagen del animal con icono de cámara */}
        <View style={styles.profilePicContainer}>
          <Image
            source={dog_cat} // Imagen de perfil
            style={styles.profilePic}
          />
        </View>

        {/* Nombre del animal */}
        <TextInput
          style={styles.input}
          value={animalName}
          onChangeText={setAnimalName}
          placeholder="Introduce el nombre del animal"
        />

        {/* Selector de especie */}
        <Text style={styles.label}>Especie</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, selectedSpecies === 'Perro' && styles.toggleButtonSelected]}
            onPress={() => setSelectedSpecies('Perro')}
          >
            <Text style={styles.toggleButtonText}>Perro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, selectedSpecies === 'Gato' && styles.toggleButtonSelected]}
            onPress={() => setSelectedSpecies('Gato')}
          >
            <Text style={styles.toggleButtonText}>Gato</Text>
          </TouchableOpacity>
        </View>

        {/* Buscador de raza */}
        {selectedSpecies && !isMixed ? (
          <>
            <Text style={styles.label}>Raza</Text>
            <TextInput
              style={styles.input}
              value={breedQuery}
              onChangeText={handleBreedInputChange}
              placeholder="Introduce la raza del animal"
            />

            {/* Mostrar lista filtrada de razas */}
            {filteredBreeds.length > 0 && (
              <ScrollView style={styles.breedList}>
                {filteredBreeds.map((breed, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleSelectBreed(breed)}
                  >
                    <Text style={styles.dropdownItemText}>{breed.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </>
        ) : null}

        {/* Casilla de mezcla */}

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, isMixed === true && styles.toggleButtonSelected]}
            onPress={() => setIsMixed(!isMixed)}
          >
            <Text style={styles.toggleButtonText}>Mezcla | N/D</Text>
          </TouchableOpacity>
        </View>

        {/* Género */}
        <Text style={styles.label}>Sexo</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, gender === 'Macho' && styles.toggleButtonSelected]}
            onPress={() => setGender('Macho')}
          >
            <Text style={styles.toggleButtonText}>Macho</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, gender === 'Hembra' && styles.toggleButtonSelected]}
            onPress={() => setGender('Hembra')}
          >
            <Text style={styles.toggleButtonText}>Hembra</Text>
          </TouchableOpacity>
        </View>

        {/* Esterilizado/Castrado */}

        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Esterilizado</Text>
          <TouchableOpacity
            style={[styles.checkbox, sterilized && styles.checkboxChecked]}
            onPress={() => setSterilized(!sterilized)}
          >
            {sterilized ? <Text style={styles.checkboxText}>✓</Text> : null}
          </TouchableOpacity>
        </View>
        
        {/* Botón de selección de fecha */}
        <Text style={styles.label}>Fecha de nacimiento</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={showDatePickerHandler}
        >
          <Text style={styles.dateButtonText}>{formattedDate}</Text>
        </TouchableOpacity>
        
        {/* Modal para mostrar el DateTimePicker */}
        <Modal
          visible={showDateModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowDateModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Selector de fecha */}
              <DateTimePicker
                value={age}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
              />
              {/* Botón para cerrar el modal */}
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setShowDateModal(false)}
              >
                <Text style={styles.closeModalButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Botón de continuar */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '17.5%',
    paddingHorizontal: '5%',
    backgroundColor: '#FFFFFA',
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  label: {
    fontSize: 20,
    color: '#044389',
    marginBottom: 10,
  },
  input: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#044389',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 18,
  },
  breedList: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#044389',
    borderRadius: 10,
    marginBottom: 20,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#044389',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6EC1F2',
  },
  checkboxText: {
    color: '#fff',
    fontSize: 18,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#044389',
    marginRight: 5,
    height: '90%'
  },
  toggleButtonSelected: {
    backgroundColor: '#6EC1F2',
  },
  toggleButtonText: {
    textAlign: 'center',
    color: '#044389',
    fontSize: 18,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '10%',
  },
  continueButton: {
    backgroundColor: '#044389',
    padding: 15,
    borderRadius: 10,
    marginBottom: '20%'
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
    
  },
  modalContent: {
    backgroundColor: '#044389',
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
  },
});

export default AnimalDataScreen;
