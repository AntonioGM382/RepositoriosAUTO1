import { doc, setDoc, getDocs, collection, addDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from './firebaseConfig'; // Adjust the import path as needed

// Fetch all species from Firestore
export const fetchSpecies = async () => {
  const speciesCollectionRef = collection(FIRESTORE_DB, 'species');
  const speciesSnapshot = await getDocs(speciesCollectionRef);
  return speciesSnapshot.docs.map(doc => ({
    label: doc.data().name,
    value: doc.id,
  })).sort((a, b) => a.label.localeCompare(b.label));
};

// Fetch breeds for a given species
export const fetchBreeds = async (speciesId) => {
  const breedsCollectionRef = collection(FIRESTORE_DB, 'species', speciesId, 'breeds');
  const breedsSnapshot = await getDocs(breedsCollectionRef);
  return breedsSnapshot.docs.map(doc => ({
    label: doc.data().name,
    value: doc.id,
  })).sort((a, b) => a.label.localeCompare(b.label));
};

// Save a new animal to Firestore
export const saveAnimal = async (animalData) => {
  const docRef = await addDoc(collection(FIRESTORE_DB, 'animals'), animalData);
  return docRef.id; // Return the new document's ID
};
