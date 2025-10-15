import { useState, useEffect } from 'react';
import ProfileModel from '../models/ProfileModel';
import { getAuth } from 'firebase/auth';

const EditProfileViewModel = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    surname: '',
    email: '',
    veterinary: '',
    password: '',
    skills: [],
  });
  const [selectedSkills, setSelectedSkills] = useState(profileData.skills || []);  // Almacenar las habilidades como cadenas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const profileModel = new ProfileModel();
  const user = getAuth().currentUser;

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const data = await profileModel.fetchProfileData(user.uid);  // Usamos el UID
          setProfileData(data);
          if (data.skills){
            setSelectedSkills(data.skills);
          }
          console.log("Data Obtained",data);
        } catch (err) {
          setError("Error al obtener datos del perfil.");
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, []);

  const handleProfileUpdate = async (updatedData) => {
    if (user) {
      try {
        console.log(updatedData)
        await profileModel.updateProfileData(updatedData);  // Usamos el UID para actualizar
        setProfileData(updatedData); // Actualiza la vista
      } catch (err) {
        setError("Error al actualizar datos del perfil.");
      }
    }
  };

  return {
    profileData,
    selectedSkills,
    loading,
    error,
    setProfileData,
    setSelectedSkills,
    handleProfileUpdate
  };
};

export default EditProfileViewModel;
