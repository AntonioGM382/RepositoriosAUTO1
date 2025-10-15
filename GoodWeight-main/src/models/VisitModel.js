import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


class VisitModel {
    constructor() {
        this.db = getFirestore();
        this.auth = getAuth();
    }

    async fetchVisits(petId) {
        const user = this.auth.currentUser;

        const visitsRef = collection(this.db, 'users', user.uid, 'animals', petId, 'veterinaryVisits');
        
        try {
        const querySnapshot = await getDocs(visitsRef);
        let visitsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date.toDate(), // Convierte Firestore Timestamp a JS Date
        }));
        
        visitsData = visitsData.filter(visit => visit.title !== 'MedicacionSinVisita');
        visitsData.sort((a, b) => b.date - a.date);

        return visitsData;
        } catch (error) {
        console.error('Error fetching visits:', error);
        throw error;
        }
    }

    async fetchVisitDetails(petId, visitId) {
        const user = this.auth.currentUser;
        try {
        const medicationsRef = collection(this.db, 'users', user.uid, 'animals', petId, 'veterinaryVisits', visitId, 'medications');
        const medsSnapshot = await getDocs(medicationsRef);
        const medications = medsSnapshot.docs.map(medDoc => medDoc.data());

        const vaccineRef = collection(this.db, 'users', user.uid, 'animals', petId, 'veterinaryVisits', visitId, 'vaccines');
        const vaccineSnapshot = await getDocs(vaccineRef);
        const vaccines = vaccineSnapshot.docs.map(doc => doc.data().name);

        return {
            medications: medications.length > 0 ? medications : null,
            vaccine: vaccines.length > 0 ? vaccines[0] : null,
        };
        } catch (error) {
        console.error('Error fetching visit details:', error);
        throw error;
        }
    }
};

export default VisitModel
