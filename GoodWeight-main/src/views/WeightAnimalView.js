import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import WeightAnimalViewModel from '../viewmodels/WeightAnimalViewModel';
import { Picker } from '@react-native-picker/picker';

const COLORS = {
  background: '#FFFFFA',
  white: '#6ec1f2',
  inputBackground: '#F4F4F6',
  inputText: '#333333',
  borderColor: '#6ec1f2',
  primaryButton: '#FF6F61',
  secondaryButton: '#2196F3',
  chartLine: '#044389',
  shadowColor: 'rgba(0, 0, 0, 0.2)',
};

const SIZES = {
  borderRadius: 12,
  padding: 16,
  margin: 12,
  fontSize: 16,
  buttonFontSize: 18,
  inputHeight: 50,
};

const WeightAnimal = ({ route }) => {
  const { petId } = route.params;
  const { animal, lifestyleOptions, selectedLifestyle, updateLifestyle, setSelectedLifestyle, addWeight, toggleRewards } = WeightAnimalViewModel(petId);
  const [newWeight, setNewWeight] = useState('');

  const handleWeightInput = (text) => {
    let sanitizedText = text.replace(/,/g, '.').replace(/[^0-9.]/g, '').match(/^[0-9]*\.?[0-9]{0,2}/g)[0];
    setNewWeight(sanitizedText);
  };

  const handleLifestyleChange = (newLifestyle) => { 
    setSelectedLifestyle(newLifestyle);
    updateLifestyle(newLifestyle);
  };

  console.log(animal.weights);
  const currentWeight = animal.weights.length > 0 ? animal.weights[animal.weights.length - 1] : animal.weight;

  return (
    
    <View style={styles.container}>
      <Text style={styles.currentWeightText}>Actual: {currentWeight} Kg</Text>
      {animal.weights.length > 0 && (
        <LineChart
          data={{
            labels: animal.weights.map((_, index) => `#${index + 1}`),
            datasets: [{ data: animal.weights }],
          }}
          width={Dimensions.get('window').width - 32}
          height={220}
          chartConfig={{
            backgroundColor: COLORS.background,
            backgroundGradientFrom: COLORS.background,
            backgroundGradientTo: COLORS.background,
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: SIZES.borderRadius },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#6ec1f2',
            },
          }}
          bezier
          style={styles.chart}
        />
      )}


      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newWeight}
          onChangeText={handleWeightInput}
          placeholder="Ej: 8.0 Kg"
          keyboardType="numeric"
          placeholderTextColor="grey"
        />
        <TouchableOpacity onPress={() => addWeight(newWeight)} style={styles.buttonAdd}>
          <Text style={styles.buttonText}>Añadir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Comida Actual: {animal.currentFood}</Text>
        <Text style={styles.detailTitle}>Estilo de Vida: {animal.lifestyle}</Text>
        <Text style={styles.detailTitle}>Editar estilo de Vida:</Text>
        <View style={styles.selectorContainer}>
        {lifestyleOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              selectedLifestyle === option.value && styles.selectedOptionButton,  // Aplica el estilo seleccionado si coincide
            ]}
            onPress={() => handleLifestyleChange(option.value)}
          >
            <Text
              style={[
                styles.optionText,
                selectedLifestyle === option.value && styles.selectedOptionText,  // Aplica el estilo de texto si está seleccionado
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
    backgroundColor: '#FFFFFA',
  },
  chart: {
    borderRadius: SIZES.borderRadius,
    borderWidth: 2,
    /*borderColor: COLORS.white,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,*/
  },
  currentWeightText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginVertical: SIZES.margin,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.margin,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    flex: 1,
    padding: SIZES.padding / 2,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.inputBackground,
    color: COLORS.inputText,
    marginRight: SIZES.margin,
    height: SIZES.inputHeight,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonAdd: {
    backgroundColor: COLORS.primaryButton,
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.borderRadius,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.buttonFontSize,
  },
  detailsContainer: {
    padding: SIZES.padding,
    alignItems: 'center',
    borderRadius: SIZES.borderRadius,
    backgroundColor: '#2A3A59',
    marginTop: SIZES.margin,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  detailTitle: {
    fontSize: 18,
    color: COLORS.white,
    marginVertical: SIZES.margin / 2,
  },
  button: {
    paddingVertical: SIZES.padding / 2,
    width: '100%',
    borderRadius: SIZES.borderRadius,
    marginTop: SIZES.margin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectorContainer: {
    flexDirection: 'row',  // Coloca las opciones en fila
    flexWrap: 'wrap',  // Permite que las opciones se distribuyan en varias filas si es necesario
    justifyContent: 'center',
    marginTop: SIZES.margin,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,  // Color de fondo para las opciones
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.borderColor,  // Borde ligero para las opciones
    margin: 5,  // Espacio entre las opciones
  },
  selectedOptionButton: {
    backgroundColor: COLORS.primaryButton,  // Fondo diferente si está seleccionada
    borderColor: COLORS.primaryButton,  // Borde destacado si está seleccionada
  },
  optionText: {
    color: COLORS.white,  // Color del texto para las opciones
    fontSize: SIZES.fontSize,
  },
  selectedOptionText: {
    color: COLORS.white,  // Color del texto si está seleccionado
    fontWeight: 'bold',  // Negrita si está seleccionada
  },
});

export default WeightAnimal;
