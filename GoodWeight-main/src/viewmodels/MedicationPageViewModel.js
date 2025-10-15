import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import MedicationModel from '../models/MedicationModel';

const MedicationsPageViewModel = (petId, visitId) => {
  const [medications, setMedications] = useState([]);
  const medicationModel = new MedicationModel();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchMedications = async () => {
        if (petId && visitId) {
          try {
            const meds = await medicationModel.fetchMedications(petId, visitId);
            if (isActive) {
              setMedications(meds);
            }
          } catch (error) {
            console.error("Error al recuperar los tratamientos.", error);
          }
        }
      };

      fetchMedications();

      return () => {
        isActive = false;
      };
    }, [petId, visitId])
  );

  return { medications };
};

export default MedicationsPageViewModel;
