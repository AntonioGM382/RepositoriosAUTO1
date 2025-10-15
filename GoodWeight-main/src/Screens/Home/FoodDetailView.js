// FoodDetailView.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const FoodDetailView = ({ route }) => {
  const { foodItem } = route.params; // Recibe el item de comida a través de params

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: foodItem.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{foodItem.label}</Text>

      {/* Muestra los ingredientes y los aditivos nutricionales */}
      <Text style={styles.subtitle}>Ingredientes:</Text>
      <Text style={styles.description}>{foodItem.ingredients}</Text>

      <Text style={styles.subtitle}>Aditivos Nutricionales:</Text>
      <Text style={styles.description}>{foodItem.nutritionalAdditives}</Text>

      <Text style={styles.subtitle}>Componentes Analíticos:</Text>
      <Text style={styles.description}>{foodItem.analyticalComponents}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});

export default FoodDetailView;
