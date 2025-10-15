// addMedicationViewModel.js
import { getAuth } from 'firebase/auth';
import { Alert } from 'react-native';
import { getFirestore, doc } from 'firebase/firestore';
import MedicationModel from '../models/MedicationModel';

export const handleSaveMedication = async (medicationData, petId, visitId, navigation, edit) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const medicationModel = new MedicationModel();

  if (!user) {
    Alert.alert('Error', 'Inicia sesión primero!');
    return;
  }

  const medicationName = medicationData.name.trim().length > 0 ? medicationData.name.trim() : null;

  if (!medicationName) {
    Alert.alert('Error', 'Por favor introduce el nombre del tratamiento.');
    return;
  }

  const db = getFirestore();
  await medicationModel.ensureMedicacionSinVisitaExists(petId);

  const medicationRef = doc(db, `/users/${user.uid}/animals/${petId}/veterinaryVisits/${visitId}/medications/${medicationName}`);

  try {
    const exists = await medicationModel.checkMedicationExists(medicationRef);
    if (exists && !edit) {
      Alert.alert(
        "El tratamiento ya existe",
        "Ya hay un tratamiento con este nombre, quieres sobreescribirla?",
        [
          { text: "No", style: "cancel" },
          { text: "Yes", onPress: async () => await saveAndNavigate(medicationRef, medicationData, navigation) }
        ]
      );
    } else {
      await saveAndNavigate(medicationRef, medicationData, navigation);
    }
  } catch (error) {
    Alert.alert('Error', 'Error comprobando los datos del tratamiento.');
  }
};

const saveAndNavigate = async (medicationRef, medicationData, navigation) => {
  try {
    const medicationModel = new MedicationModel();
    
    // Verificamos si es un tratamiento crónico y guardamos "31/12/2000" en lugar de "Indefinido"
    const medicationDuration = medicationData.duration;
    console.log(medicationData.duration);
    if (medicationDuration != ''){
      await medicationModel.saveMedicationData(medicationRef, {
        ...medicationData,
        duration: medicationDuration  // Guardamos "31/12/2000" si es crónico
      });
      navigation.goBack();
    }
    else {
      Alert.alert('Error', 'Por favor, especifique la fecha de inicio del tratamiento.');
    }
  } catch (error) {
      Alert.alert('Error', error.message);
  }
};