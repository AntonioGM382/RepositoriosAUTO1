// VaccineModel.js
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

class VaccineModel {
  constructor() {
    this.db = getFirestore();
    this.auth = getAuth();  // Inicializa 'auth' aquí
  }

  getUser() {
    return this.auth.currentUser;  // Usa 'this.auth'
  }

  async ensureVaccinationRecordExists(petId) {
    const user = this.getUser();  // Usa 'this.getUser()'
    if (!user) {
      throw new Error("No user logged in.");
    }

    const visitRef = doc(this.db, `users/${user.uid}/animals/${petId}/veterinaryVisits/VacunacionSinVisita`);
    const docSnap = await getDoc(visitRef);
    if (!docSnap.exists()) {
      await setDoc(visitRef, {
        title: "VacunacionSinVisita",
        date: new Date(),
        description: "Vacunas agregadas sin visita asociada."
      });
    }
  }

  async checkVaccineExists(petId, vaccineName) {
    const user = this.getUser();
    if (!user) {
        throw new Error("No user logged in.");
    }

    // Asegúrate de que 'vaccineName' esté correctamente sanitizado para evitar problemas de referencia
    const sanitizedVaccineName = vaccineName.trim().replace(/\//g, '_'); // Reemplaza caracteres no válidos

    const vaccineRef = doc(this.db, `users/${user.uid}/animals/${petId}/veterinaryVisits/VacunacionSinVisita/vaccines/${sanitizedVaccineName}`);
    const docSnap = await getDoc(vaccineRef);
    return { exists: docSnap.exists(), vaccineRef };
  }


  async saveVaccineData(vaccineRef, vaccineData) {
    await setDoc(vaccineRef, vaccineData);
  }


  async fetchVaccinesFromFirestore (petId) {
    const vaccinesList = [];
    const user = this.getUser();  // Usa 'this.getUser()'

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
    } catch (error) {
      console.error('Error fetching vaccines:', error);
    }

    return vaccinesList;
  }

}

export default VaccineModel;
