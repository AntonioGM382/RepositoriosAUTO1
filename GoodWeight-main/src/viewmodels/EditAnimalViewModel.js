import { useState, useEffect } from 'react';
import PetModel from '../models/PetModel'; 

const EditAnimalViewModel = (petId) => {
  const [animalData, setAnimalData] = useState({
    name: '',
    color: '',
    microchip: '',
    species: '',
    breed: '',
    weight: '',
    isSterilized: false,
    gender: 'Macho',
    age: 1,
  });

  const [loading, setLoading] = useState(true);
  const petModel = new PetModel();

  useEffect(() => {
    const fetchAnimalData = async () => {
      if (petId) {
        const data = await petModel.getAnimal(petId);
        if (data) {
          setAnimalData({
            name: data.name || '',
            color: data.color || '',
            microchip: data.microchip || '',
            species: data.species || '',
            breed: data.breed || '',
            weight: data.weight || '',
            isSterilized: data.isSterilized || false,
            gender: data.gender || 'Macho',
            age: data.age || 1,
          });
        }
      }
      setLoading(false);
    };

    fetchAnimalData();
  }, [petId]);

  const setName = (name) => setAnimalData((prev) => ({ ...prev, name }));
  const setColor = (color) => setAnimalData((prev) => ({ ...prev, color }));
  const setMicrochipNumber = (microchip) => setAnimalData((prev) => ({ ...prev, microchip }));
  const setSpecies = (species) => setAnimalData((prev) => ({ ...prev, species }));
  const setBreed = (breed) => setAnimalData((prev) => ({ ...prev, breed }));
  const setWeight = (weight) => setAnimalData((prev) => ({ ...prev, weight }));
  const setSterilized = (isSterilized) => setAnimalData((prev) => ({ ...prev, isSterilized }));
  const setGender = (gender) => setAnimalData((prev) => ({ ...prev, gender }));
  const setAge = (age) => setAnimalData((prev) => ({ ...prev, age }));

  const saveAnimal = async () => {
    try {
      const animalId = await petModel.updateAnimal({ ...animalData, id: petId });
      return animalId;
    } catch (error) {
      console.error('Error saving animal:', error);
      return false;
    }
  };

  return {
    animalData,
    setName,
    setColor,
    setMicrochipNumber,
    setSpecies,
    setBreed,
    setWeight,
    setSterilized,
    setGender,
    setAge,
    saveAnimal,
    loading,
  };
};

export default EditAnimalViewModel;
