// Server.js
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, collection, query, getDoc, getDocs } from 'firebase/firestore';

export const fetchPetData = async (petId) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user || !petId) return null;

    const db = getFirestore();
    const petRef = doc(db, 'users', user.uid, 'animals', petId); // Directly using petId
    const petSnapshot = await getDoc(petRef);

    if (!petSnapshot.exists()) {
      console.log('No such pet!');
      return null;
    }
    return petSnapshot.data();
  } catch (error) {
    console.error("Error fetching pet data:", error);
    return null;
  }
  
};

export const formatDate = (timestamp) => {
  if (!timestamp) {
    return 'N/A';
  }

  let date;
  
  if (typeof timestamp.toDate === 'function') {
    date = timestamp.toDate();
  } else if (typeof timestamp === 'number') {
    date = new Date(timestamp);
  } else {
    date = new Date(timestamp);
  }

  if (isNaN(date)) {
    return 'Invalid date';
  }

  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};



export const fetchMedications = async ( petId, visitId) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();
  const medicationsRef = collection(db, `users/${user.uid}/animals/${petId}/veterinaryVisits/${visitId}/medications`);
  const q = query(medicationsRef);
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const medData = doc.data();
      medData.id = doc.id;
      
      // Check if `duration` exists and is an object with a `toDate` method
      if (medData.duration && typeof medData.duration.toDate === 'function') {
        medData.expiryDateFormatted = formatDate(medData.duration.toDate());
      } else {
        medData.expiryDateFormatted = 'N/A';
      }
      
      return medData;
    });
  } catch (error) {
    console.error("Error fetching medications: ", error);
    throw error; 
  }
};
