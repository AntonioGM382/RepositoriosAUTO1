import React, { useState } from 'react';
import { View, Text, Alert, TextInput, Button, Platform, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import * as DocumentPicker from 'expo-document-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Añade esto al import de Firebase


const AddVisitAnimal = ({ navigation, route }) => {
  const { petId, visit } = route.params;
  const [tempDate, setTempDate] = useState(new Date());
  const [showDatePickerActual, setShowDatePickerActual] = useState(false);
  const [showDatePickerNext, setShowDatePickerNext] = useState(false);
  const [selectedVaccinationDate, setSelectedVaccinationDate] = useState(new Date());
  const [selectedNextVaccinationDate, setSelectedNextVaccinationDate] = useState(new Date());
  const [visitData, setVisitData] = useState({
    title: '',
    veterinary: '',
    description: '',
    date: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isVaccination, setIsVaccination] = useState(false);
  const [vaccineData, setVaccineData] = useState({
    vaccine: '',
    vaccineDate: new Date(),
    nextVaccineDate: new Date(),
  });
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [uploading, setUploading] = useState(false); 
  const db = getFirestore();

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
      setTempDate(selectedDate);
      setVisitData({ ...visitData, date: selectedDate });
    }
  };

  const onDayPressNextVaccination = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
      setSelectedNextVaccinationDate(selectedDate);
      setVaccineData({ ...vaccineData, nextVaccineDate: selectedDate });
    }
  };

  const toggleSwitch = () => setIsVaccination(prevState => !prevState);

  const saveVaccinationDetails = async (petId, sanitizedTitle) => {
    const user = getAuth().currentUser;
    if (isVaccination && vaccineData.vaccine) {
      const vaccineRef = doc(db, `/users/${user.uid}/animals/${petId}/veterinaryVisits/${sanitizedTitle}/vaccines/${vaccineData.vaccine}`);
      await setDoc(vaccineRef, {
        name: vaccineData.vaccine,
        date: vaccineData.vaccineDate,
        nextDate: vaccineData.nextVaccineDate,
      });
    }
  };

  // Seleccionar archivo PDF
  const selectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
      console.log(result);
      if (!result.assets || result.assets.length === 0) {
        console.log("No se encontró el documento seleccionado");
        return;
      }
      else {
        const pdfUri = result.assets[0].uri;
        setSelectedPdf(pdfUri);
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };
  
  // Subir PDF a Firebase Storage
const uploadPdfToFirebase = async (petId, sanitizedTitle) => {
  const user = getAuth().currentUser;
  if (!selectedPdf) {
    Alert.alert("No se ha seleccionado un PDF");
    return;
  }
  const storage = getStorage();
  const storageRef = ref(storage, `pdfs/${petId}/${sanitizedTitle+'_'+petId}.pdf`);

  const response = await fetch(selectedPdf);
  const blob = await response.blob(); // Convertir el archivo en un blob

  const uploadTask = uploadBytesResumable(storageRef, blob);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, 
    (error) => {
      console.error("Error subiendo el PDF:", error);
    }, 
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log('File available at', downloadURL);
      // Guarda la URL en Firestore para recuperarla luego
      const visitRef = doc(db, `/users/${user.uid}/animals/${petId}/veterinaryVisits/${sanitizedTitle}`);
      await setDoc(visitRef, { pdfUrl: downloadURL }, { merge: true });
    }
  );
  };
  
  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error('No user logged in');
      return;
    }

    const sanitizedTitle = visitData.title.replace(/\s+/g, '').toLowerCase();
    await uploadPdfToFirebase(petId, sanitizedTitle);
    const visitRef = doc(db, `/users/${user.uid}/animals/${petId}/veterinaryVisits/${sanitizedTitle}`);

    const docSnap = await getDoc(visitRef);
    if (docSnap.exists()) {
      Alert.alert(
        "La visita ya existe",
        "Ya hay una visita con este nombre, quieres sobreescribirla?",
        [
          { text: "No", onPress: () => console.log("Sobreescritura cancelada"), style: "cancel" },
          {
            text: "Si",
            onPress: async () => {
              try {
                const visitPayload = {
                  title: visitData.title,
                  date: visitData.date,
                  description: visitData.description,
                  veterinary: visitData.veterinary,
                };
                await setDoc(visitRef, visitPayload);
                if (route.params?.onGoBack) {
                  route.params.onGoBack();
                }
                navigation.goBack();
              } catch (error) {
                console.error('Error overwriting visit data:', error);
              }
            }
          },
        ],
        { cancelable: false }
      );
    } else {
      try {
        const visitPayload = {
          title: visitData.title,
          date: visitData.date,
          description: visitData.description,
          veterinary: visitData.veterinary,
        };
        await saveVaccinationDetails(petId, sanitizedTitle);
        await setDoc(visitRef, visitPayload);
        if (route.params?.onGoBack) {
          route.params.onGoBack();
        }
        navigation.goBack();
      } catch (error) {
        console.error('Error saving visit data:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título de la visita"
        value={visitData.title}
        onChangeText={(text) => setVisitData({ ...visitData, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Veterinario"
        value={visitData.veterinary}
        onChangeText={(text) => setVisitData({ ...visitData, veterinary: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={visitData.description}
        onChangeText={(text) => setVisitData({ ...visitData, description: text })}
      />
      <TouchableOpacity onPress={selectFile} style={styles.button}>
        <Text style={styles.buttonText}>
          {selectedPdf ? selectedPdf.name : 'Seleccionar archivo PDF'}
        </Text>
      </TouchableOpacity>

      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateButton}>
            {tempDate ? `Fecha de Visita: ${tempDate.toLocaleDateString()}` : 'Selecciona la Fecha de Visita'}
          </Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <View>
          {Platform.OS === 'ios' && <Button title="Confirmar fecha" onPress={() => setShowDatePicker(false)} />}
          <DateTimePicker
            value={tempDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={handleDateChange}
          />
        </View>
      )}

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>¿Es una visita para vacunar?</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#4CD964" }}
          thumbColor={isVaccination ? "#FFFFFF" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isVaccination}
        />
      </View>

      {isVaccination && (
        <>
          <View style={styles.datePickerContainer}>
            <TouchableOpacity onPress={() => setShowDatePickerNext(true)}>
              <Text style={styles.dateButton}>
                {selectedNextVaccinationDate
                  ? `Próxima Fecha de Vacunación: ${selectedNextVaccinationDate.toLocaleDateString()}`
                  : 'Selecciona la Próxima Fecha de Vacunación'}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePickerNext && (
            <View>
              {Platform.OS === 'ios' && <Button title="Confirmar fecha" onPress={() => setShowDatePickerNext(false)} />}
              <DateTimePicker
                value={tempDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                onChange={onDayPressNextVaccination}
              />
            </View>
          )}
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar Visita</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFA',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#044389',
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 10,
    color: '#333',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  datePickerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#6EC1F2',
    borderRadius: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '10%'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#6EC1F2',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddVisitAnimal;
