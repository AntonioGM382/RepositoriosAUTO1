// FoodScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Button, TextInput, ActivityIndicator } from 'react-native';
import FoodCard from './FoodCard';
import { fetchFoodOptions } from '../CreateAnimal/CreateAnimalServer';
import { useNavigation, useRoute } from '@react-navigation/native';


const FoodScreen = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [animalType, setAnimalType] = useState('Perro');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const getButtonStyle = (type) => ({
    ...styles.filterButton,
    backgroundColor: animalType === type ? '#044389' : '#fff', // Blue color for selected
  });

  const getTextStyle = (type) => ({
    ...styles.filterText,
    color: animalType === type ? '#fff' : '#044389', // White text for selected, blue for unselected
  });

  useEffect(() => {
    const initFetch = async () => {
      setIsLoading(true);
      const foods = await fetchFoodOptions(animalType);
      setFoodItems(foods);
      setFilteredItems(foods); // Initialize with all items
      setIsLoading(false);
    };

    initFetch();
  }, [animalType]);

  useEffect(() => {
    // Filter items on search query change
    const filtered = foodItems.filter((item) =>
      item.label && item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);

  }, [searchQuery, foodItems]);
  

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
      {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar alimento..."
          placeholderTextColor="#888" // Stylish placeholder text color
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.filterContainer}>
          <TouchableOpacity style={getButtonStyle('Perro')} onPress={() => setAnimalType('Perro')}>
            <Text style={getTextStyle('Perro')}>Perro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={getButtonStyle('Gato')} onPress={() => setAnimalType('Gato')}>
            <Text style={getTextStyle('Gato')}>Gato</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.botContainer}>
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={({ item }) => (
            <FoodCard
              title={item.label}
              imageUrl={item.imageUrl}
              onPress={() => navigation.navigate('FoodDetailScreen', { foodItem: item })}
            />
          )}
          keyExtractor={(item) => item.value}
          numColumns={2}
          key={'_' + animalType}
      />
      )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFFFFA',
  },
  topContainer:{
    marginTop: '20%',

  },
  botContainer:{
    borderTopWidth: 2,
    paddingHorizontal: '2%',
    borderColor: '#044389', // Stylish blue border
  },
  searchBar: {
    height: 40,
    width: '90%',
    alignSelf: 'center',
    borderColor: '#303656', // Stylish blue border
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
    marginBottom: 10,
  },
  filterButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#303656',
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  filterText: {
    fontSize: 16,
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default FoodScreen;
