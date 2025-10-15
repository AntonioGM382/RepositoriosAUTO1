
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { doc, setDoc} from 'firebase/firestore';
import { FIRESTORE_DB, storage } from '../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Alert } from 'react-native';

const requestPermissions = async () => {
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    return galleryStatus === 'granted' && cameraStatus === 'granted';
};

const upload = async (uri, id, profileType) => {
    try {
        const user = getAuth().currentUser;
        if (!user) throw new Error('Usuario no autenticado');
        
        const response = await fetch(uri);
        const blob = await response.blob();
    
        // Define la referencia de la imagen en Firebase Storage
        const imagePath = profileType === 'user' 
            ? `userProfiles/${user.uid}.jpg` 
            : `profileFotos/${user.uid}_${id}.jpg`;
    
        const imageRef = ref(storage, imagePath);
        await uploadBytes(imageRef, blob);
        const imageUrl = await getDownloadURL(imageRef);
    
        // Actualiza el documento correspondiente en Firestore
        const docRef = profileType === 'user' 
            ? doc(FIRESTORE_DB, 'users', user.uid)
            : doc(FIRESTORE_DB, 'users', user.uid, 'animals', id);
    
        await setDoc(docRef, { imageUrl }, { merge: true });
        console.log('URL de la imagen actualizada correctamente');
    
    } catch (error) {
        console.error('Error al subir imagen:', error);
        Alert.alert('Error', 'Hubo un problema al subir la imagen.');
    }
};
  
export const uploadImage = async (id, type) => {
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
    await upload(imageUri, id, type);
};
