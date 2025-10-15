import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, updateDoc,deleteDoc, arrayUnion} from 'firebase/firestore';
import { FIRESTORE_DB, storage } from '../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';



class PetModel {
  constructor() {
    this.auth = getAuth();
    this.db = FIRESTORE_DB;
  }


  async fetchPetData(petId) {
    const user = this.auth.currentUser;
    if (user && petId) {
      const petRef = doc(this.db, 'users', 'animals', petId);
      const petSnapshot = await getDoc(petRef);
      if (petSnapshot.exists()) {
        return petSnapshot.data();
      }
    }
    return null;
  }

  async checkVaccinationStatus(petId) {
    const user = this.auth.currentUser;
    if (user && petId) {
      const veterinaryVisitsRef = collection(this.db, 'users', user.uid, 'animals', petId, 'veterinaryVisits');
      const querySnapshot = await getDocs(veterinaryVisitsRef);
      return !querySnapshot.empty;
    }
    return false;
  }

  async deleteAnimal (petId){
    const user = this.auth.currentUser;
    if (user && petId) {
      const petRef = doc(this.db, 'users', user.uid, 'animals', petId);
      await deleteDoc(petRef);
    }
  }

  // Obtiene los datos de un animal
  async getAnimal(petId) {
    const user = this.auth.currentUser;
    if (user) {
      const petRef = doc(this.db, `/users/${user.uid}/animals/${petId}`);
      const petSnapshot = await getDoc(petRef);
      if (petSnapshot.exists()) {
        return petSnapshot.data();
      }
    }
    return null;
  }

  // Actualiza el peso del animal
  async addWeight(petId, newWeight) {
    const user = this.auth.currentUser;
    if (user && newWeight.trim()) {
      const petRef = doc(this.db, `/users/${user.uid}/animals/${petId}`);
      console.log("Añadiendo peso desde addweight model: ", newWeight);
      await updateDoc(petRef, {
        weight: arrayUnion(newWeight.trim()),
      });
    }
  }

  async fetchVaccines(petId){
    const vaccinesList = [];
    const user = this.auth.currentUser;

    try {
        const visitsRef = collection(this.db, 'users', user.uid, 'animals', petId, 'veterinaryVisits');
        const visitsSnapshot = await getDocs(visitsRef);

        for (const visitDoc of visitsSnapshot.docs) {
        const vaccinesRef = collection(this.db, 'users', user.uid, 'animals', petId, 'veterinaryVisits', visitDoc.id, 'vaccines');
        const vaccinesSnapshot = await getDocs(vaccinesRef);

        for (const vaccineDoc of vaccinesSnapshot.docs) {
            const vaccineData = vaccineDoc.data();
            vaccineData.id = vaccineDoc.id;
            vaccinesList.push(vaccineData);
        }
        }

        return vaccinesList;
    } catch (error) {
        console.error('Error fetching vaccines:', error);
        return vaccinesList;
    }
  }

  // Actualiza el estilo de vida del animal
  async updateLifeStyle(petId, lifestyle) {
    const user = this.auth.currentUser;
    if (user && lifestyle) {
      const petRef = doc(FIRESTORE_DB, `/users/${user.uid}/animals/${petId}`);
      try {
        await updateDoc(petRef, {
          lifestyle: lifestyle,  // Actualiza el campo de estilo de vida
        });
        console.log('Estilo de vida actualizado correctamente');
      } catch (error) {
        console.error('Error al actualizar el estilo de vida:', error);
      }
    }
  }

  async updateAnimal(animal) {
    const user = this.auth.currentUser;
    if (user) {
      const animalId = animal.id || doc(collection(this.db, `/users/${user.uid}/animals`)).id;
      const petRef = doc(this.db, `/users/${user.uid}/animals/${animalId}`);

      try {
        await setDoc(petRef, {
          name: animal.name,
          species: animal.species,
          breed: animal.breed,
          color: animal.color,
          weight: animal.weight,
          microchip: animal.microchip,
          isSterilized: animal.isSterilized,
          gender: animal.gender,
          age: animal.age,
        }, { merge: true });
        return animalId;
      } catch (error) {
        console.error('Error updating animal:', error);
        throw error;
      }
    }
  }
  calculateAge(birthTimestamp) { 
    // Asegurarse de que se reciba un objeto con "seconds" y "nanoseconds"
    if (!birthTimestamp || !birthTimestamp.seconds) {
      console.error("Marca de tiempo no válida: ", birthTimestamp);
      return "Fecha no válida";
    }
    // Convertir los segundos a milisegundos
    const birthDate = new Date(birthTimestamp.seconds * 1000);
    // Obtener la fecha actual
    const today = new Date();
    
    // Obtener el año, mes y día actuales
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
  
    // Obtener el año, mes y día de nacimiento
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
  
    // Calcular la edad
    let age = currentYear - birthYear;
  
    // Ajustar si el cumpleaños de este año no ha ocurrido aún
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age--;
    }
  
    return age;
  }

  async fetchPetData(petId) {
    const user = this.auth.currentUser;
    if (user && petId) {
      const petRef = doc(FIRESTORE_DB, 'users', user.uid, 'animals', petId);
      const petSnapshot = await getDoc(petRef);
      if (petSnapshot.exists()) {
        return petSnapshot.data();
      }
    }
    return null;
  }

  async uploadImage(uri,petId) {
    
    try {
      const user = this.auth.currentUser;
      if (!user) throw new Error('Usuario no autenticado');
      const response = await fetch(uri);
      const blob = await response.blob();

      // Definir la referencia de la imagen en Firebase Storage (usa una ruta única para cada imagen)
      const imageRef = ref(storage, `profileFotos/${user.uid}_${petId}.jpg`);

      // Subir la imagen a Firebase Storage
      await uploadBytes(imageRef, blob);

      // Obtener la URL de descarga de la imagen subida
      const imageUrl = await getDownloadURL(imageRef);

      if (user && imageUrl) {
        const petRef = doc(this.db, 'users', user.uid, 'animals', petId);
        try {
          await setDoc(petRef, {
            imageUrl: imageUrl,  // Actualiza el campo de la URL de la imagen
          },{ merge: true });
          console.log('URL de la imagen actualizada correctamente');
          
        } catch (error) {
          console.error('Error al actualizar la URL de la imagen:', error);
        }
      } else {
        console.log('Usuario o URL de imagen no definidos');
      }
      
    } catch (error) {
      console.error('Error al subir imagen:', error);
      Alert.alert('Error', 'Hubo un problema al subir la imagen.');
    }
    finally{
    }
  }
}

export default PetModel
