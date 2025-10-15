// ProfileViewModel.js
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebase/firebaseConfig';
import { Alert } from 'react-native';

class RegistrationViewModel {
  constructor(navigation) {
    this.navigation = navigation;
  }

  async createAccount(name, surname, email, veterinary, password) {
    const lowerCaseEmail = email.toLowerCase(); // Convertir email a minúsculas

    try {
      // Crear la cuenta de usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, lowerCaseEmail, password);
      const user = userCredential.user; // Obtenemos el usuario autenticado

      // Enviar correo de verificación
      await sendEmailVerification(user);

      // Crear una referencia al documento del usuario en Firestore utilizando el UID como ID
      const userRef = doc(FIRESTORE_DB, 'users', user.uid);

      // Guardar los datos del usuario en Firestore
      await setDoc(userRef, {
        name: name,
        surname: surname,
        veterinary: veterinary,
        email: lowerCaseEmail,
        createdAt: new Date(),
        userId: user.uid // Almacenar el UID del usuario para referencia
      });

      // Almacenar el nombre de usuario localmente en AsyncStorage
      await AsyncStorage.setItem('username', name);
      console.log('User details added to Firestore with UID');

      // Navegar a la pantalla de verificación
      this.navigation.navigate('Verification');
    } catch (error) {
      console.error('Error creating account: ', error);
      Alert.alert('Error', error.message);
    }
  }
}

export default RegistrationViewModel;
