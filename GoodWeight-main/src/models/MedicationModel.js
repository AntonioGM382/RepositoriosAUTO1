import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, getDocs, deleteDoc, setDoc} from 'firebase/firestore';


class MedicationModel {

  constructor() {
    this.auth = getAuth();
    this.db = getFirestore();
  }
    /*async fetchMedications (petId, visitId){
        const user = getAuth().currentUser;
        const sanitizedEmail = user.email.toLowerCase().replace(/@/g, '_').replace(/\./g, '-');
        const this.db = getFirestore();
        const medicationsRef = collection(this.db, `users/${sanitizedEmail}/animals/${petId}/veterinaryVisits/${visitId}/medications`);
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
    }*/

  async fetchAllMedications(petId) {
      const user = this.auth.currentUser;
      if (user && petId) {
        const visitsRef = collection(this.db, 'users', user.uid, 'animals', petId, 'veterinaryVisits');
        let allMeds = [];
        const visitsSnapshot = await getDocs(visitsRef);
        for (const visitDoc of visitsSnapshot.docs) {
          const medsSnapshot = await getDocs(collection(visitDoc.ref, 'medications'));
          medsSnapshot.forEach(doc => {
            const medData = doc.data();
            const medDurationDate = new Date(medData.duration.seconds * 1000);
            allMeds.push({
              id: doc.id,
              ...medData,
              durationDate: medDurationDate,
            });
          });
        }
        return allMeds;
      }
  };
  async ensureMedicacionSinVisitaExists (petId) {
    const user = this.auth.currentUser;
    if (user && petId) {
      const visitRef = doc(this.db, `users/${user.uid}/animals/${petId}/veterinaryVisits/MedicacionSinVisita`);
      const docSnap = await getDoc(visitRef);
    
      if (!docSnap.exists()) {
        await setDoc(visitRef, {
          title: "MedicacionSinVisita",
          date: new Date(),
          description: "Medicaciones agregadas sin visita asociada."
        });
      }
    }
  };
  
  async saveMedicationData (medicationRef, medicationData) {
    try {
      await setDoc(medicationRef, {
        name: medicationData.name,
        dose: medicationData.dose,
        duration: medicationData.duration,
      });
      return true;
    } catch (error) {
      console.error('Error saving medication data:', error);
      throw new Error('Error guardando el tratamiento.');
    }
  };
  
  async checkMedicationExists (medicationRef) {
    try {
      const docSnap = await getDoc(medicationRef);
      return docSnap.exists();
    } catch (error) {
      console.error('Error checking medication data:', error);
      throw new Error('Error comprobando los datos del tratamiento.');
    }
  };
}

export default MedicationModel