// ProfileModel.js
import { getFirestore, doc, getDoc, updateDoc, setDoc} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FIRESTORE_DB } from '../firebase/firebaseConfig';

class ProfileModel {
  constructor() {
    this.auth = getAuth();
    this.db = getFirestore();
  }
  async fetchProfileData(userId) {
    try {
      
      const userRef = doc(FIRESTORE_DB, "users", userId);
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData; // Devuelve los datos del usuario
      } else {
        console.log("No such document!");
        return null; // Devuelve null si no existe el documento
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  }

  async updateProfileData(updatedData) {
    try {
      const user = this.auth.currentUser;
      const userRef = doc(FIRESTORE_DB, "users", user.uid);
      
      // Actualizar solo los campos proporcionados en `updatedData`
      await updateDoc(userRef, updatedData);
      console.log("User data updated successfully");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  }
}

export default ProfileModel;
