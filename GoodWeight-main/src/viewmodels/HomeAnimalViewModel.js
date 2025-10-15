import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import PetModel from '../models/PetModel'; // Cargar el modelo
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { FIRESTORE_DB } from '../firebase/firebaseConfig';
import {doc, onSnapshot} from 'firebase/firestore';
import { Alert } from 'react-native';


const HomeAnimalViewModel = (petId) => {
  const navigation = useNavigation();
  const [petData, setPetData] = useState(null);
  const [weightStatus, setWeightStatus] = useState('normal');
  const [weightModalVisible, setWeightModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [petAge, setPetAge] = useState();
  const [imageUrl, setImageUrl] = useState();
  
  const { showActionSheetWithOptions } = useActionSheet();
  const petModel = new PetModel(); // Modelo para manejar datos
  const user = getAuth().currentUser;
  
  useEffect(() => {
    // Listener en tiempo real para obtener datos actualizados automáticamente
    const unsubscribe = onSnapshot(doc(FIRESTORE_DB, 'users', user.uid, 'animals', petId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        
        // Actualiza el estado con los datos de la mascota
        setPetData(data);
        setWeightStatus(data.weightStatus);
        setPetAge(petModel.calculateAge(data.age));
      }
    });
  
    // Cleanup: desuscribir el listener cuando el componente se desmonta
    return () => unsubscribe();
  
  }, [petId, user]);
  

  const toggleWeightModal = () => {
    setWeightModalVisible(!weightModalVisible);
  };

  const openActionSheet = () => {
    const options = ['Editar animal', 'Borrar animal', 'Cancelar'];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          navigation.navigate('EditAnimal', { petId });
        } else if (buttonIndex === 1) {
          handleDeleteConfirmation();
        }
      }
    );
  };

  const handleDeleteAnimal = async () => {
    setMenuVisible(false);
    try {
      await petModel.deleteAnimal(petId);
      return true; // Indica éxito
    } catch (error) {
      console.error('Error al eliminar el animal:', error);
      return false; // Indica fracaso
    }
  };

  const handleDeleteConfirmation = () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que quieres borrar a la mascota?", [
          { text: "Cancelar", style: "cancel" },
          { text: "Borrar", onPress: async () => {
            const success = await handleDeleteAnimal();
            if (success) {
              Alert.alert('Mascota eliminada correctamente.');
              navigation.navigate('Home'); // Navega al menú principal después de la eliminación
            } else {
              Alert.alert('Error', 'No se pudo eliminar la mascota.');
            }
          }, }
      ]
    );
  };

  const selectImage = async () => {
    const hasPermission = await requestPermissions(); // Comprobar permisos
      
    if (!hasPermission) {
      return; // Si no se otorgaron los permisos, salir de la función
    }
  
    // Mostrar opciones al usuario para elegir entre cámara o galería
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.2,
    });
    
    console.log(result);

    // Verificar si el usuario canceló la selección de la imagen
    if (result.cancelled) {
      console.log("Selección de imagen cancelada");
      return; // Si se cancela, sal de la función
    }
  
    // Comprobar si result.assets existe y tiene al menos un elemento
    if (!result.assets || result.assets.length === 0) {
      console.log("No se encontró ninguna imagen seleccionada");
      return;
    }

    // Acceder a la URI de la primera imagen seleccionada
    const imageUri = result.assets[0].uri;

    // Guardar la imagen seleccionada
    console.log("Imagen seleccionada URI:", imageUri); // Imprimir la URI seleccionada para depuración
    
    // Subir la imagen a Firebase
    petModel.uploadImage(imageUri, petId);
  };

  const requestPermissions = async () => {
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    return galleryStatus === 'granted' && cameraStatus === 'granted';
  };

  return {
    petData,
    petAge,
    weightStatus,
    weightModalVisible,
    menuVisible,
    toggleWeightModal,
    openActionSheet,
    selectImage,
  };
};

export default HomeAnimalViewModel;
