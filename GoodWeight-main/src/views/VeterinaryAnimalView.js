import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions,ActivityIndicator  } from 'react-native';
import VeterinaryAnimalViewModel from '../viewmodels/VeterinaryAnimalViewModel';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../Screens/AnimalScreen/Server';
import { WebView } from 'react-native-webview';


const VeterinaryAnimal = ({ route }) => {
  const { petId } = route.params;
  const { visits, expandedVisitId, toggleExpand } = VeterinaryAnimalViewModel(petId);
  const navigation = useNavigation();
  const dropdownIcon = require('../../assets/dropdown.png');
  const dropdownDeployedIcon = require('../../assets/dropdown-deployed.png');

  const renderItem = ({ item }) => (
    <View style={styles.accordionItem}>
      <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleExpand(item.id)}>
        <Text style={styles.accordionDate}>{formatDate(item.date)}</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.accordionTitle}>{item.title}</Text>
          <Image source={expandedVisitId === item.id ? dropdownDeployedIcon : dropdownIcon} style={styles.accordionIcon} />
        </View>
      </TouchableOpacity>

      {expandedVisitId === item.id && (
        <View style={styles.accordionContent}>
          <Text style={styles.veterinary}>Descripción: {item.description}</Text>
          {item.vaccine && <Text style={styles.veterinary}>Vacuna: {item.vaccine}</Text>}
          <Text style={styles.veterinary}>Veterinario: {item.veterinary}</Text>
          {item.pdfUrl ? (
            <>
              <View style={styles.pdfViwer}>
              <WebView
                source={{ uri: item.pdfUrl }}
                style={styles.pdf}
                startInLoadingState={true}
                renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
              />
              </View>
            </>
          ) : null }
          {item.medications ? (
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('MedicationsPage', { petId, visitId: item.id })}>
              <Text style={styles.addButtonText}>Ver tratamientos</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddMedication', { petId, visitId: item.id })}>
              <Text style={styles.addButtonText}>Añadir tratamiento</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={visits} keyExtractor={(item) => item.id} renderItem={renderItem} style={styles.list} />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddVisitAnimal', { petId })}>
        <Text style={styles.addButtonText}>Añadir Nueva Visita</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  detailContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  date: {
    fontWeight: 'bold',
  },
  title: {
    color: 'blue',
  },
  veterinary: {
    fontStyle: 'italic',
  },
  medicationButton: {
    backgroundColor: '#6BE7E4',
    padding: 5,
    marginTop: 5,
    borderRadius: 5,
  },
  medicationButtonText: {
    color: '#6BE7E4',
    fontSize: 12,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  accordionItem: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#F7F7F7',
  },
  accordionDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2A2A2A',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: '#007AFF',
    marginRight: 5,
  },
  accordionIcon: {
    width: 24,
    height: 24,
  },
  accordionContent: {
    padding: 15,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
  },
  description: {
    fontSize: 14,
    color: '#2A2A2A',
    marginBottom: 4,
  },
  veterinary: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555555',
    marginBottom: 10,
  },
  medicationButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  medicationButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  pdfViwer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default VeterinaryAnimal;
