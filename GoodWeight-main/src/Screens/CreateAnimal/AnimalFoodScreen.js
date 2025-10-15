import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Switch, ScrollView, Modal } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebase/firebaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth } from '@firebase/auth';
import { fetchFoodOptions, saveAlimentationData, saveAnimal } from './CreateAnimalServer';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Asegúrate de importar Ionicons



const AnimalFoodScreen = () => {
  const [currentFood, setCurrentFood] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [weight, setWeight] = useState('');
  const [microchip, setMicrochip] = useState('');
  const [dietType, setDietType] = useState('');
  const [passport, setPassport] = useState('');
  const [lifestyleOptions, setLifestyleOptions] = useState([]);
  const [dietTypes, setDietTypes] = useState([]);
  const [foodOptions, setFoodOptions] = useState([]);
  const [isLifestylePickerOpen, setIsLifestylePickerOpen] = useState(false);
  const [isDietTypePickerOpen, setIsDietTypePickerOpen] = useState(false);
  const [isFoodListVisible, setIsFoodListVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false); // Estado para el modal


  
  const navigation = useNavigation();
  const route = useRoute();
  const { animalData } = route.params;


  useEffect(() => {
    const fetchLifestyleOptions = async () => {
      const lifestyleCollectionRef = collection(FIRESTORE_DB, 'lifestyle');
      const querySnapshot = await getDocs(lifestyleCollectionRef);
      const options = querySnapshot.docs.map((doc) => ({
        label: doc.id,
        value: doc.id,
      })).sort((a, b) => a.label.localeCompare(b.label));
      setLifestyleOptions(options);
    };
    fetchLifestyleOptions();
  }, []);

  useEffect(() => {
    const fetchDietTypes = async () => {
      try {
        const dietTypesCollectionRef = collection(FIRESTORE_DB, 'diets');
        const dietTypesSnapshot = await getDocs(dietTypesCollectionRef);
        const dietTypesData = dietTypesSnapshot.docs.map(doc => doc.data().name);
        setDietTypes(dietTypesData);
      } catch (error) {
        console.error('Error fetching diet types:', error);
      }
    };
    fetchDietTypes();
  }, []);

  useEffect(() => {
    if (animalData.selectedSpecies) {
      const fetchFoodOptionsBySpecies = async () => {
        const foodOptionsList = await fetchFoodOptions(animalData.selectedSpecies);
        setFoodOptions(foodOptionsList);
      };
      fetchFoodOptionsBySpecies();
    }
  }, [animalData.selectedSpecies]);

  const capitalizeWords = (string) => {
    return string
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleSave = async () => {
    const { animalName, selectedSpecies, selectedBreed, sterilized, age, gender } = animalData;
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const sanitizedEmail = user.email.toLowerCase().replace(/@/g, '_').replace(/\./g, '-');
      const animalDataToSave = {
        name: animalName,
        weight: parseFloat(weight), // Peso agregado
        microchip: parseInt(microchip, 10), // Microchip agregado
        passport: parseInt(passport, 10),
        age: new Date(age),
        species: selectedSpecies,
        breed: selectedBreed,
        sterilised: sterilized,
        gender: gender,
        currentFood: currentFood,
        dietType: dietType,
        lifestyle: lifestyle,
      };

      try {
        const docPath = await saveAnimal(sanitizedEmail, animalDataToSave);
        const animalId = docPath.split('/').pop(); // Extraer el ID del animal
        await saveAlimentationData(sanitizedEmail, animalId, { lifestyle, currentFood, dietType });
        alert('¡Animal guardado con éxito!');
        navigation.navigate('Home'); // Navega a la pantalla Home después de guardar
      } catch (e) {
        console.error('Error al guardar el animal: ', e);
        alert('Error al guardar el animal.');
      }
    } else {
      alert('Por favor, inicia sesión para guardar un animal.');
    }
  };

    // Función para gestionar el cambio en la búsqueda de raza
  const handleFoodInputChange = (text) => {
    setCurrentFood(capitalizeWords(text));
    if (text.length > 0) {
      setIsFoodListVisible(true);
    } else {
      setIsFoodListVisible(false);
    }
  };


  const toggleInfoModal = () => {
    setIsInfoModalVisible(!isInfoModalVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
      <Text style={styles.title}>Datos Adicionales</Text>

      {/* Peso del animal */}
      <TextInput
        value={weight}
        onChangeText={text => setWeight(text)}
        placeholder="Peso del animal (kg)"
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Microchip */}
      <TextInput
        value={microchip}
        onChangeText={text => setMicrochip(text)}
        placeholder="Número de Microchip"
        keyboardType="numeric"
        style={styles.input}
      />
      
      {/* Microchip */}
      <TextInput
        value={passport}
        onChangeText={text => setPassport(text)}
        placeholder="Número de Pasaporte"
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Estilo de vida con botón de información */}
      <View style={styles.lifestyleRow}>
        <TouchableOpacity onPress={() => setIsLifestylePickerOpen(!isLifestylePickerOpen)} style={styles.dropdownButtonFullWidth}>
          <Text style={styles.dropdownButtonText}>{lifestyle || 'Estilo de Vida'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleInfoModal} style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={30} color="#044389" />
        </TouchableOpacity>
      </View>


      {isLifestylePickerOpen && (
        <View style={styles.dropdown}>
          {lifestyleOptions.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={styles.dropdownItem}
              onPress={() => {
                setLifestyle(item.value);
                setIsLifestylePickerOpen(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Modal para mostrar información del estilo de vida */}
      <Modal
        visible={isInfoModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleInfoModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Estilos de Vida del Animal</Text>
            <Text style={styles.modalText}>- Activo: Animales con alta energía y actividad diaria.</Text>
            <Text style={styles.modalText}>- Moderado: Animales con un nivel de actividad intermedio.</Text>
            <Text style={styles.modalText}>- Sedentario: Animales con poca actividad física diaria.</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={toggleInfoModal}>
              <Text style={styles.modalCloseButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Tipo de dieta */}
      <TouchableOpacity onPress={() => setIsDietTypePickerOpen(!isDietTypePickerOpen)} style={styles.dropdownButton}>
        <Text style={styles.dropdownButtonText}>{dietType || 'Tipo de Dieta'}</Text>
      </TouchableOpacity>
      {isDietTypePickerOpen && (
        <View style={styles.dropdown}>
          {dietTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => {
                setDietType(type);
                setIsDietTypePickerOpen(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Alimento actual */}
      {dietType.includes("pienso") ? (
        <>
      <TextInput
        value={capitalizeWords(currentFood)}
        onChangeText={handleFoodInputChange} // Cambiar a la nueva función
        placeholder="Introduce el alimento actual"
        style={styles.input}
      />
      {isFoodListVisible && (
        <ScrollView style={styles.breedList}>
          {foodOptions
            .filter(item => item.label.toLowerCase().includes(currentFood.toLowerCase()))
            .map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.dropdownItem}
                onPress={() => {
                  setCurrentFood(capitalizeWords(item.label));
                  setIsFoodListVisible(false); // Ocultar la lista después de seleccionar
                }}
              >
                <Text style={styles.dropdownItemText}>{capitalizeWords(item.label)}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      )}
      </>
      ) : null}


      {/* Botón de guardar */}
      <TouchableOpacity style={styles.continueButton} onPress={handleSave}>
        <Text style={styles.continueButtonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: '20%',
    paddingHorizontal: '5%',
    backgroundColor: '#FFFFFA',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#044389',
    marginBottom: 20,
    textAlign: 'center',
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
  dropdownButton: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#044389',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  dropdownButtonText: {
    fontSize: 18,
    color: '#044389',
  },
  lifestyleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dropdownButtonFullWidth: {
    flex: 1, // Ocupa el mayor espacio posible
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#044389',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
  },
  infoButton: {
    marginLeft: 10, // Espacio entre los botones
  },

  dropdown: {
    borderWidth: 1,
    borderColor: '#044389',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#044389',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  breedList: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  lifestyleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#044389',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#044389',
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});



export default AnimalFoodScreen;
