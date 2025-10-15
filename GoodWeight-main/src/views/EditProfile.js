import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, FlatList, Modal } from 'react-native';
import EditProfileViewModel from '../viewmodels/EditProfileViewModel';

const ProfileScreen = () => {
  const { profileData, selectedSkills, loading, error, setProfileData, setSelectedSkills, handleProfileUpdate } = EditProfileViewModel();

  const skillsData = [
    'Administración de medicamentos orales',
    'Administración de medicamentos inyectables',
    'Experiencia con perros mayores',
    'Experiencia con gatos mayores',
    'Cuidado de cachorros',
    'Entrenamiento básico',
    'Entrenamiento avanzado',
    'Aseo y limpieza',
    'Corte de uñas',
    'Paseos largos',
    'Paseos cortos',
    'Socialización de mascotas',
    'Detección de problemas de salud',
    'Primeros auxilios para mascotas'
  ];

  const toggleSkill = (skillName) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(selectedSkills.filter((name) => name !== skillName));
    } else {
      setSelectedSkills([...selectedSkills, skillName]);
    }
  };

  const handleSave = async () => {
    try {
      await handleProfileUpdate({ ...profileData, skills: selectedSkills });
      Alert.alert('Perfil actualizado', 'Tus datos han sido actualizados correctamente.');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al actualizar tu perfil.');
    }
  };

  const [isModalVisibleBiography, setModalVisibleBiography] = useState(false);
  const [isModalVisibleAboutYou, setModalVisibleAboutYou] = useState(false);
  const [biographyText, setBiographyText] = useState(profileData.biography);
  const [aboutYouText, setAboutYouText] = useState(profileData.aboutYou);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#044389" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Editar Perfil</Text>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={profileData.name}
          onChangeText={(text) => setProfileData({ ...profileData, name: text })}
        />
        <Text style={styles.label}>Apellidos</Text>
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          value={profileData.surname}
          onChangeText={(text) => setProfileData({ ...profileData, surname: text })}
        />
        <Text style={styles.label}>Clínica Habitual</Text>
        <TextInput
          style={styles.input}
          placeholder="Clínica Habitual"
          value={profileData.veterinary}
          onChangeText={(text) => setProfileData({ ...profileData, veterinary: text })}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={profileData.email}
          onChangeText={(text) => setProfileData({ ...profileData, email: text })}
          keyboardType="email-address"
        />

        {/* Botón para abrir el modal de biografía */}
        <TouchableOpacity style={styles.buttonBiography} onPress={() => setModalVisibleBiography(true)}>
          <Text style={styles.label}>Biografía</Text>
          <Text style={styles.input}>{profileData.biography || 'Defínete con una frase'}</Text>
        </TouchableOpacity>

        {/* Botón para abrir el modal de sobre ti */}
        <TouchableOpacity style={styles.buttonDescription} onPress={() => setModalVisibleAboutYou(true)}>
          <Text style={styles.label}>Sobre Ti</Text>
          <Text style={styles.input}>{profileData.aboutYou || 'Cuéntanos algo sobre ti'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.midContainer}>
        <Text style={styles.skillsTitle}>Selecciona tus habilidades:</Text>
        <View style={styles.skillsContainer}>
          {skillsData.map((item, index) => (
            <TouchableOpacity
              key={item + index}
              style={[styles.skillCard, selectedSkills.includes(item) && styles.selectedSkillCard]}
              onPress={() => toggleSkill(item)}
            >
              <Text style={[styles.skillText, selectedSkills.includes(item) && styles.selectedSkillText]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.botContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Biografía */}
      <Modal
        visible={isModalVisibleBiography}
        animationType="slide"
        onRequestClose={() => setModalVisibleBiography(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Biografía</Text>
          <TextInput
            style={styles.modalInput}
            placeholder={"Definete en una frase" }
            value={profileData.biography}
            onChangeText={(text) => setProfileData({ ...profileData, biography: text })}
            multiline
          />
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalVisibleBiography(false);
            }}
          >
            <Text style={styles.modalButtonText}>Guardar</Text>
          </TouchableOpacity>
          
        </View>
      </Modal>

      {/* Modal de Sobre Ti */}
      <Modal
        visible={isModalVisibleAboutYou}
        animationType="slide"
        onRequestClose={() => setModalVisibleAboutYou(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Sobre Ti</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Cuéntanos algo sobre ti"
            value={profileData.aboutYou}
            onChangeText={(text) => setProfileData({ ...profileData, aboutYou: text })}
            multiline
          />
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalVisibleAboutYou(false);
            }}
          >
            <Text style={styles.modalButtonText}>Guardar</Text>
          </TouchableOpacity>
          
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFA',
  },
  label: {
    fontSize: 20,
    color: '#044389',
    marginBottom: 10,
  },
  topContainer: {
    marginLeft: '5%',
    marginTop: 20,
    marginBottom: '10%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#044389',
    marginBottom: '10%',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#044389',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    fontSize: 18,
    color: '#333',
    width: '90%',
  },
  midContainer: {
    marginBottom: '20%',
  },
  skillsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#044389',
    marginBottom: 10,
    textAlign: 'center',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  skillCard: {
    width: '45%',
    marginVertical: '2%',
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    borderWidth: 1,
    borderColor: '#044389',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#FFFFFA',
  },
  selectedSkillCard: {
    backgroundColor: '#044389',
  },
  skillText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#044389',
  },
  selectedSkillText: {
    color: '#FFF',
  },
  botContainer: {
    alignItems: 'center',
    marginBottom: '20%',

  },
  button: {
    backgroundColor: '#044389',
    paddingVertical: 15,
    width: '90%',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#044389',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#044389',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '90%',
    height: 150,
    fontSize: 18,
    color: '#333',
    backgroundColor: '#FFFFFA',
  },
  modalButton: {
    backgroundColor: '#044389',
    paddingVertical: 10,
    width: '90%',
    borderRadius: 10,
    marginTop: 10,
  },
  modalButtonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
  },
});

export default ProfileScreen;
