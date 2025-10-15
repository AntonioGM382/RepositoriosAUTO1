import { useState, useEffect } from 'react';
import ProfileModel from '../models/ProfileModel';
import { doc, onSnapshot } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebase/firebaseConfig';
import WalkingModel from '../models/WalkingModel';


const ProfileViewModel = (otherUserData = null, user) => {
  const [userData, setProfileData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  
  const fetchUserAnnouncements = async (id) => {
    const walkingModel = new WalkingModel();
    const userAnnouncements = await walkingModel.getUserAnnouncements(id);
    setAnnouncements(userAnnouncements);
  };
  
  useEffect(() => {
    if (otherUserData) {
      setProfileData(otherUserData);
      fetchUserAnnouncements(otherUserData.userId);
      setLoading(false);
      return;
    }
    const profileDocRef = doc(FIRESTORE_DB, 'users', user.uid);
    const unsubscribe = onSnapshot(profileDocRef, (doc) => {
      if (doc.exists()) {
        setProfileData(doc.data());
        fetchUserAnnouncements(user.uid);
        setLoading(false);
      } else {
        setError('No se encontraron datos de perfil');
      }
    }, (error) => {
      setError(error.message);
    });

    return () => unsubscribe(); // Cleanup del listener

  }, []);

  return {userData, loading, error, announcements };
};
export default ProfileViewModel;
