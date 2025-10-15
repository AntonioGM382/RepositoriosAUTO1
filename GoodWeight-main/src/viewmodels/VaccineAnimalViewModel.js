// VaccineViewModel.js
import { useState} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import VaccineModel from '../models/VaccineModel';  // Import Model
import React from 'react';

export const useVaccineViewModel = (petId) => {
    const [vaccines, setVaccines] = useState([]);
    const vaccineModel = new VaccineModel();

    const fetchVaccines = async () => {
    const vaccinesList = await vaccineModel.fetchVaccinesFromFirestore(petId);
    setVaccines(vaccinesList);
    };

    const auth = getAuth();

    useFocusEffect(
      React.useCallback(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (petId) {
            fetchVaccines(petId);
          }
        });
    
        return () => unsubscribe();
      }, [petId])
    );

    return {
        vaccines,
    };
};
