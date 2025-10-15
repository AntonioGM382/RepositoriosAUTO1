import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import MedicationModel from '../models/MedicationModel';  // Importamos el modelo

const AllMedicationsViewModel = (petId) => {
  const [medications, setMedications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const medicationModel = new MedicationModel();

  // Reemplazamos useEffect con useFocusEffect para que la lógica se ejecute cada vez que la pantalla gane foco.
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const meds = await getAllMedicationData();
          setMedications(meds);
        } catch (error) {
          console.error("Error fetching medications:", error);
        }
      };

      fetchData();

      // No hace falta una limpieza especial aquí, pero podrías agregarla si fuera necesario.
    }, [petId]) // Solo se vuelve a ejecutar cuando cambia el petId
  );

  const toggleFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const getAllMedicationData = async () => {
    console.log(petId);
    return medicationModel.fetchAllMedications(petId);
  }

  const getFilteredMedications = () => {
    return medications.filter((med) => {
      const lowerCaseName = med.name.toLowerCase();
      const lowerCaseQuery = searchQuery.toLowerCase();
      
      // Convertir la fecha a objeto Date y verificar si es "Indefinido"
      const durationDate = new Date(med.durationDate);
      const isIndefinido = durationDate.getDate() === 31 && durationDate.getMonth() === 11 && durationDate.getFullYear() === 2000;
      
      // Medicamento caducado solo si no es indefinido y la fecha es anterior a hoy
      const isExpired = !isIndefinido && durationDate < new Date();

      const matchesSearch = lowerCaseName.includes(lowerCaseQuery);

      switch (filter) {
        case 'all':
          return matchesSearch;  // Mostrar todos
        case 'current':
          return matchesSearch && !isExpired;  // Mostrar solo los actuales (no caducados ni indefinidos)
        case 'expired':
          return matchesSearch && isExpired;  // Mostrar solo los caducados (excluir indefinidos)
        default:
          return matchesSearch;
      }
    });
  };

  return {
    medications: getFilteredMedications(),
    filter,
    searchQuery,
    setSearchQuery,
    toggleFilter
  };
};

export default AllMedicationsViewModel;
 