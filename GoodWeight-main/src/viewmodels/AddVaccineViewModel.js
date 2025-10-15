// AddVaccineViewModel.js
import { useState } from 'react';
import { Alert } from 'react-native';
import VaccineModel from '../models/VaccineModel';

const AddVaccineViewModel = (navigation, petId, edit) => {
  const [vaccineData, setVaccineData] = useState({
    name: '',
    date: new Date(),
    nextDate: new Date(),
  });

  const [showVaccinationDatePicker, setShowVaccinationDatePicker] = useState(false);
  const [showNextVaccinationDatePicker, setShowNextVaccinationDatePicker] = useState(false);

  const vaccineModel = new VaccineModel();

  const handleSave = async () => {
    const user = vaccineModel.getUser();
    if (!user) {
      Alert.alert('Error', 'No user logged in.');
      return;
    }
    try {
      await vaccineModel.ensureVaccinationRecordExists(petId);
  
      const vaccineName = vaccineData.name.trim();
      if (!vaccineName) {
        Alert.alert('Error', 'Por favor introduce el nombre de la vacuna.');
        return;
      }
  
      const { exists, vaccineRef } = await vaccineModel.checkVaccineExists(petId, vaccineName);
      if (exists && edit == false) {
        Alert.alert(
            "La vacuna ya existe",
            "Ya hay una vacuna con este nombre, quieres sobreescribirla?",
            [
                { text: "No", style: "cancel" },
                { text: "Sí", onPress: async () => {
                    await vaccineModel.saveVaccineData(vaccineRef, vaccineData, edit);
                    Alert.alert('Éxito', 'La vacuna ha sido sobreescrita.', [
                        { text: 'OK', onPress: () => navigation.goBack() },
                    ]);
                } }
            ]
        );  
    } else {
        await vaccineModel.saveVaccineData(vaccineRef, vaccineData);
        Alert.alert('Éxito', 'La vacuna ha sido guardada.', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);
    }
    } catch (error) {
      console.error('Error checking vaccine data:', error);
      Alert.alert('Error', 'Error comprobando los datos de la vacuna.');
    }
  };
  

  return {
    vaccineData,
    setVaccineData,
    showVaccinationDatePicker,
    setShowVaccinationDatePicker,
    showNextVaccinationDatePicker,
    setShowNextVaccinationDatePicker,
    handleSave,
  };
};

export default AddVaccineViewModel;
