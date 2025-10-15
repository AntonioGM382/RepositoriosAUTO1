import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, getDocs, deleteDoc} from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebase/firebaseConfig';

class BBDDModel {
  constructor() {
    this.auth = getAuth();
    this.db = getFirestore();
  }
  
  async fetchLifestyleOptions() {
    const lifestyleCollectionRef = collection(FIRESTORE_DB, 'lifestyle');
    const querySnapshot = await getDocs(lifestyleCollectionRef);
    const options = querySnapshot.docs.map((doc) => ({
      label: doc.id,
      value: doc.id,
    })).sort((a, b) => a.label.localeCompare(b.label));
    return options;
  };
}

export default BBDDModel
