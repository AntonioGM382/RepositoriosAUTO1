import { useState, useEffect } from 'react';
import PetModel from '../models/PetModel'; 
import BBDDModel from '../models/BBDDModel'; 

const WeightAnimalViewModel = (petId) => {
    
    const petModel = new PetModel();  
    const dbModel = new BBDDModel();

    // Estado del animal
    const [animal, setAnimal] = useState({
        weights: [0],
        currentFood: '',
        lifestyle: '',
        rewards: false,
    });
    
    const [lifestyleOptions, setLifestyleOptions] = useState([]); // Estado para las opciones de estilo de vida
    const [selectedLifestyle, setSelectedLifestyle] = useState(animal.lifestyle); // Estado para el estilo de vida seleccionado

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await petModel.getAnimal(petId);
                if (data) {
                    console.log('Datos animal desde base de datos:', data);
                    console.log('Peso animal:', data.weight);
                    const myArray = [data.weight];
                    console.log(myArray[0])
                    setAnimal({
                        weights: Array.isArray(data.weight) ? data.weight.map(Number) : myArray ,  // Si no es un array, dejamos un array vacío
                        currentFood: data.currentFood || '',
                        lifestyle: data.lifestyle || '',
                        rewards: data.rewards || false,
                    });
                }
                const lifestyleOptions = await dbModel.fetchLifestyleOptions();
                setLifestyleOptions(lifestyleOptions);
            } catch (error) {
                console.error('Error fetching animal details:', error);
            }
        };

        // Llamamos a fetchDetails para cargar los datos del animal
        if (petId) {
            fetchDetails();
        }
    }, [petId]);  // Dependencia del useEffect, se ejecutará cada vez que petId cambie

    const updateLifestyle = async (newLifestyle) => {
        console.log('hola');
        await petModel.updateLifeStyle(petId, newLifestyle);  // Llamada al modelo para actualizar en Firestore
        setAnimal((prevAnimal) => ({
            ...prevAnimal,
            lifestyle: newLifestyle,  // Actualiza el estado local del animal con el nuevo estilo de vida
        }));
    };
    // Agregar un nuevo peso desde el modelo
    const addWeight = async (newWeight) => {
        await petModel.addWeight(petId, newWeight);
        setAnimal((prevAnimal) => ({
        ...prevAnimal,
        weights: [...prevAnimal.weights.slice(-4), Number(newWeight.trim())],
        }));
    };

    // Alternar estado de premios desde el modelo
    const toggleRewards = async () => {
        await petModel.toggleRewards(petId, animal.rewards);
        setAnimal((prevAnimal) => ({
        ...prevAnimal,
        rewards: !prevAnimal.rewards,
        }));
        
    };
    return {
        animal,
        lifestyleOptions,
        selectedLifestyle,
        updateLifestyle,
        setSelectedLifestyle,
        addWeight,
        toggleRewards,
    };
};

export default WeightAnimalViewModel;
