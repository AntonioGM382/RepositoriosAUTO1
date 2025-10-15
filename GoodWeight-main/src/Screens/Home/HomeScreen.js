import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, getDoc, doc } from 'firebase/firestore';
import PetModel from '../../models/PetModel';

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [pets, setPets] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const placeholderDogImage = require('../../../assets/null-dog.png');
  const placeholderCatImage = require('../../../assets/null-cat.png'); 
  const placeholderOtherImage = require('../../../assets/null-other.png');

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const window = Dimensions.get('window');
      setIsSmallScreen(window.width <= 375);

      const fetchAndUpdatePets = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userDocRef = doc(db, 'users', user.uid);
          try {
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              setUsername(userData.name);
            } else {
              console.log('No such document!');
            }
            await fetchPets(user.uid);
          } catch (error) {
            console.error("Error fetching user data: ", error);
          }
        }
      };
  
      fetchAndUpdatePets();
    }, [])
  );

  const fetchPets = async (id) => {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', id);
    const petsCollectionRef = collection(userDocRef, 'animals');
    const petsSnapshot = await getDocs(petsCollectionRef);
  
    const petModel = new PetModel();
  
    const fetchedPets = petsSnapshot.docs.map(doc => {
      const petData = doc.data();
      const petAge = petModel.calculateAge(petData.age);
      return {
        id: doc.id,
        name: petData.name,
        age: `${petAge} ${petAge === 1 ? 'año' : 'años'}`,
        image: petData.photo,
        species: petData.species,
      };
    });
    
    setPets(fetchedPets);
  };
  

  const renderPet = ({ item }) => {
    let petImage = placeholderOtherImage;
    
    if (item.photo) {
      petImage = { uri: item.photo };
    } else {
      switch (item.species) {
        case 'Perro': 
          petImage = placeholderDogImage;
          break;
        case 'Gato': 
          petImage = placeholderCatImage;
          break;
      }
    }
    return (
      <TouchableOpacity style={styles.petCard} onPress={() => navigation.navigate('HomeAnimal', { petId: item.id })}>
        <Image source={petImage} style={styles.petImage} />
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petAge}>{item.age}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation bar with Settings button */}


      <View style={styles.navBar}>

        <Text style={styles.sectionTitle}>Tus Mascotas</Text>

      </View>
      <View style={styles.navInfo}>
      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('ProfileView')}     hitSlop={{ top: 100, bottom: 100, left: 100, right: 100 }} // Aumenta el área de toque
        >
            <Image source={require('../../../assets/profile_icon.png')} style={styles.profileIcon} />
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Hola de nuevo, {username}!</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}     hitSlop={{ top: 100, bottom: 1, left: 1, right: 1 }} // Aumenta el área de toque
        >
            <Image source={require('../../../assets/settings-black-gears.png')} style={styles.settingsIcon}/>
          </TouchableOpacity>
      </View>
      
      
      <View style={styles.divider} />
      
      <FlatList
        data={pets}
        renderItem={renderPet}
        keyExtractor={item => item.id}
        style={styles.petsList}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: isSmallScreen ? 70 : 100 }}
        ListFooterComponent={<View style={{ height: isSmallScreen ? 70 : 100 }} />}
      />

      {/* Add Pet Button */}
      <TouchableOpacity
        style={styles.addPetButton}
        onPress={() => navigation.navigate('AnimalDataScreen')}
      >
        <Image
          source={require('../../../assets/add-icon.png')}
          style={styles.addPetIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFA',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    marginTop: '7%'
  },
  navInfo: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',

    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1, // Ocupa el espacio disponible para centrar
  },
  profileButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',

  },
  profileIcon: {
    width: '80%',
    height: '80%',
  },
  settingsButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',

  },
  settingsIcon: {
    width: '80%',
    height: '80%',
  },
  sectionTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  divider: {
    borderBottomColor: '#044389',
    borderBottomWidth: 3,
    borderRadius: 5,
    marginHorizontal: 20,
    opacity: 1,
  },
  petsList: {
    paddingHorizontal: 20,
    paddingBottom: 150,
  },
  petCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 15,
    margin: 11,
    alignItems: 'center',
    justifyContent: 'center',
    width: '44%',
    borderColor: '#6Ec1F2',
    borderWidth: 3,
  },
  petImage: {
    width: 100,
    height: 100,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  petAge: {
    fontSize: 16,
  },
  addPetButton: {
    position: 'absolute',
    bottom: '15%', // Ajusta para evitar que se superponga con el menú
    right: '5%',
    width: '13%',
    height: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#044389',
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addPetIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
});

export default HomeScreen;
