// createAnimalServer.js

import { doc, getFirestore, setDoc, getDocs, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebase/firebaseConfig'; // Adjust the import path as needed
import { getAuth } from '@firebase/auth';
import { storage } from 'firebase/storage';

export const fetchSpecies = async () => {
  const speciesCollectionRef = collection(FIRESTORE_DB, 'species');
  const speciesSnapshot = await getDocs(speciesCollectionRef);
  return speciesSnapshot.docs.map(doc => ({
    label: doc.data().name,
    value: doc.id,
  })).sort((a, b) => a.label.localeCompare(b.label));
};

export const fetchBreeds = async (speciesId) => {
  const user = getAuth().currentUser;
  const breedsCollectionRef = collection(FIRESTORE_DB, 'species', speciesId, 'breeds');
  const breedsSnapshot = await getDocs(breedsCollectionRef);
  return breedsSnapshot.docs.map(doc => {
    const breedData = doc.data();
    return {
      label: breedData.name, // Assuming the breed's name is stored under a 'name' field
      value: doc.id,
      size: breedData.size, // Make sure 'size' is the correct field name in your Firestore
    };
  }).sort((a, b) => a.label.localeCompare(b.label));
};

export const fetchFoodOptions = async (speciesId) => {
  const foodCollectionRef = collection(FIRESTORE_DB, 'species', speciesId, 'food');
  try {
    const querySnapshot = await getDocs(foodCollectionRef);
    return querySnapshot.docs.map((doc) => {
      const foodData = doc.data();
      return {
        // Use the correct field name 'Title' from your Firestore documents
        label: foodData.title, // Changed from 'name' to 'Title'
        value: doc.id,
        description: foodData.description,
        ingredients: foodData.ingredients,
        nutritionalAdditives: foodData.nutritionalAdditives,
        imageUrl: foodData.imageUrl,
        
      };
    }).sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    console.error("Error fetching food options: ", error);
    return [];
  }
};


export const saveAlimentationData = async (sanitizedEmail, animalId, { lifestyle, currentFood, dietType }) => {
  if (!animalId) {
    console.error('No animalId provided to saveAlimentationData');
    return;
  }
  const user = getAuth().currentUser;
  const db = getFirestore();
  const animalRef = doc(db, 'users', user.uid, 'animals', animalId);

  try {
    await setDoc(animalRef, { lifestyle, currentFood, dietType }, { merge: true });
    console.log('Alimentation data saved successfully.');
  } catch (error) {
    console.error('Error saving alimentation data: ', error);
  }
};


export const saveAnimal = async (sanitizedEmail, animalData) => {
  const user = getAuth().currentUser;
  const db = getFirestore();
  const userDocRef = doc(db, 'users', user.uid);
  const validAnimalName = animalData.name.replace(/[^a-zA-Z0-9]/g, '_');
  
  const animalCollectionRef = collection(userDocRef, 'animals');
  const animalDocRef = doc(animalCollectionRef, validAnimalName); // This should add to the existing 'animals' collection

  await setDoc(animalDocRef, animalData);
  return animalDocRef.path;

};

export const uploadImage = async (uri) => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const storageRef = storage().ref(`users/${filename}`);
    
    try {
        await storageRef.putFile(uploadUri);
        const url = await storageRef.getDownloadURL();
        console.log('Image uploaded!', url);
        return url;
    } catch (e) {
        console.error(e);
        return null;
    }
};
