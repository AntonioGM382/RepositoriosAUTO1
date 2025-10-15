import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Pressable, } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import icons from '../Screens/AnimalScreen/icons';
import HomeAnimalViewModel from '../viewmodels/HomeAnimalViewModel';
import styles from '../styles/HomeAnimalStyles';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { uploadImage } from '../components/UploadImage';


const HomeAnimal = () => {
  const dogImage = require('../../assets/dog.png');
  const catImage = require('../../assets/cat.png');

  const { petId } = useRoute().params;
  const navigation = useNavigation();

  const dataScrollViewRef = useRef(null); // Añadir la referencia para el scroll
  const infoScrollViewRef = useRef(null); // Añadir la referencia para el scroll


  const {
    petData,
    petAge,
    openActionSheet,
  } = HomeAnimalViewModel(petId);

  if (!petData) {
    return <View><Text>Loading...</Text></View>;
  }

  const DetailButton = ({ iconName, label, onPress }) => (
    <TouchableOpacity style={styles.detailButtonContainer} onPress={onPress}>
      <Image source={icons[iconName]} style={styles.detailButtonIcon} />
      <Text style={styles.detailButtonText}>{label}</Text>
    </TouchableOpacity>
  );

  // Función para manejar el scroll al presionar "Más información"
  const handleContinue = () => {

  };

  const weights =  Array.isArray(petData.weight) ? petData.weight.map(Number) : [];

  const currentWeight = weights.length > 0 ? weights[weights.length - 1] : petData.weight;
  return (
    
    <SafeAreaView style={styles.container} >
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={40} color={'black'} />
        </TouchableOpacity>
         <TouchableOpacity style={styles.cameraButton} onPress={() => uploadImage(petId, 'pet')}>
            <Ionicons name="camera-outline" size={50} color={'black'} />
          </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={openActionSheet}>
            <Ionicons name="menu-outline" size={50} color={'black'}></Ionicons>
        </TouchableOpacity>
      </View>

      <View style={styles.midContainer}>
        {petData.imageUrl ? (
          <Image source={{ uri: petData.imageUrl }} style={styles.selectedImage} />
        ) : (
          <Image
            source={petData.species === 'Perro' ? dogImage : catImage}
            style={petData.species === 'Perro' ? styles.roundedTopImageDog : styles.roundedTopImageCat}
          />
        )}

      </View>
      
      <View style={styles.botContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{petData.name}</Text>
          {petData.gender === 'Macho' ? <Ionicons name="male-outline" size={30} color={'blue'}></Ionicons> : <Ionicons name="female-outline" size={30} color={'pink'}></Ionicons>}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>{petData.breed.toUpperCase()}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <View style={styles.infoRow}>
              <Image source={icons.birthday} style={styles.icon} />
              <Text style={styles.infoText}>{petAge} {petData.age === 1 ? 'año' : 'años'}</Text>
            </View>
          </View>
          
          <View style={styles.infoColumn}>
            <View style={styles.infoRow}>
                <Image source={icons.weight} style={styles.icon} />
                <Text style={styles.infoText}>{currentWeight} Kg</Text>
              </View>
          </View>
        </View>
        
        <View style={styles.buttonGrid}>
          <View style = {styles.buttonRow}>
            <DetailButton
              iconName="detailVeterinary"
              label="Veterinario"
              onPress={() => navigation.navigate('VeterinaryAnimal', { petId: petId, species: petData.species })}
            />
            <DetailButton
              iconName="detailWeight"
              label="Peso"
              onPress={() => navigation.navigate('WeightAnimal', { petId: petId, species: petData.species })}
            />
          </View>
          <View style = {styles.buttonRow}>
            <DetailButton
              iconName="detailMedication"
              label="Tratamientos"
              onPress={() => navigation.navigate('AllMedications', { petId: petId, species: petData.species })}
            />
            <DetailButton
              iconName="detailVaccine"
              label="Vacunas"
              onPress={() => navigation.navigate('VaccineAnimal', { petId: petId, species: petData.species })}
            />
          </View>
        </View>
      </View>

      {/* Botón "Continuar" que desplaza la pantalla hacia abajo */}
        
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Más información</Text>
      </TouchableOpacity>
                  {/* Sección de información adicional */}
      <View ref={infoScrollViewRef} style={styles.additionalInfoContainer}>
        <Text style={styles.additionalInfoTitle}>Información Adicional</Text>
      <Text style={styles.additionalInfoText}>Aquí puedes incluir más información sobre el animal.</Text>
      {/* Agrega más información aquí según sea necesario */}
      </View>
    </SafeAreaView>
    
  );
};

export default HomeAnimal;