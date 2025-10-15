import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Button, ScrollView, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AddVaccineViewModel from '../viewmodels/AddVaccineViewModel';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'; // DateTimePicker import


const AddVaccine = () => {
    const navigation = useNavigation();
    const { petId, visitId, species, edit } = useRoute().params;
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [vaccinePickerVisible, setVaccinePickerVisible] = useState(false);
    const [vaccinationDateModalVisible, setVaccinationDateModalVisible] = useState(false);
    const [nextVaccinationDateModalVisible, setNextVaccinationDateModalVisible] = useState(false);
    const [selectedVaccinationDate, setSelectedVaccinationDate] = useState(new Date());
    const [selectedNextVaccinationDate, setSelectedNextVaccinationDate] = useState(new Date());
    const [selectedVaccineInfo, setSelectedVaccineInfo] = useState(null);
    const [showDatePickerActual, setShowDatePickerActual] = useState(false); // Controla la visibilidad del DateTimePicker
    const [showDatePickerNext, setShowDatePickerNext] = useState(false); // Controla la visibilidad del DateTimePicker
    const [tempDate, setTempDate] = useState(new Date()); // Fecha temporal para confirmación


    const { vaccineData, setVaccineData, handleSave } = AddVaccineViewModel(navigation, petId, edit);

    const availableDogVaccines = [
        "Rabia", "Leishmaniasis", "Tos de las Perreras", "Tetravalente/DHPPi"
    ];
    const availableCatVaccines = [
        "Multiple CRP", "Leucemia felina", "Rabia", "PIF (Peritonitis infecciosa felina)"
    ];
    const availableVaccines = species === 'Perro' ? availableDogVaccines : availableCatVaccines;

    const vaccineInfo = {
        "Tetravalente/DHPPi": {
            title: "Tetravalente/DHPPi",
            essential: "Vacuna **esencial no obligatoria**",
            protects: "Protege frente a Moquillo, Hepatitis infecciosa canina, Parvovirus y algunos virus causantes de la Tos de las perreras.",
            details: [
                {
                    subtitle: "Moquillo canino",
                    description: "Afecta principalmente a perros y hurones no vacunados. Es altamente contagiosa, potencialmente mortal y puede dejar graves secuelas.",
                    symptoms: "Síntomas: fiebre, síntomas digestivos, respiratorios y nerviosos."
                },
                {
                    subtitle: "Hepatitis infecciosa canina",
                    description: "Afecta principalmente a perros no vacunados. Es potencialmente mortal y puede dejar secuelas.",
                    symptoms: "Síntomas: fiebre, vasculitis y hepatitis, entre otros."
                },
                {
                    subtitle: "Parvovirus canino",
                    description: "Afecta principalmente a perros jóvenes no vacunados. Es altamente contagiosa y mortal.",
                    symptoms: "Síntomas: vómitos y diarreas graves, entre otros."
                }
            ]
        },
        "Rabia": {
            title: "Rabia",
            essential: "Vacuna **obligatoria** en la mayoría de CCAA de España",
            protects: "Afecta a casi todos los mamíferos, incluyendo perros, gatos, hurones, caballos y humanos.",
            details: [
                {
                    subtitle: "Síntomas",
                    description: "Cambio drástico de comportamiento (anorexia, nerviosismo, excitabilidad o agresividad), parálisis o salivación excesiva."
                }
            ]
        },
        "Leishmaniasis": {
            title: "Leishmaniasis",
            essential: "No es esencial ni obligatoria.",
            protects: "Afecta principalmente a perros y humanos en zonas endémicas.",
            details: [
                {
                    subtitle: "Síntomas",
                    description: "Lesiones cutáneas, anomalías oculares o sangrado nasal.",
                }
            ]
        },
        "Tos de las Perreras": {
            title: "Tos de las Perreras",
            essential: "No es esencial ni obligatoria.",
            protects: "Protege frente a virus y bacterias que producen la tos de las perreras.",
            details: [
                {
                    subtitle: "Síntomas",
                    description: "Tos seca, fiebre, secreciones nasales y pérdida de apetito.",
                }
            ]
        },
        "Multiple CRP": {
        title: "Multiple CRP",
        essential: "Vacuna **esencial no obligatoria**",
        protects: "Protege frente al complejo respiratorio felino y la panleucopenia felina.",
        details: [
            {
                subtitle: "Complejo respiratorio felino",
                description: "Afecta a **gatos** de todas las edades.",
                symptoms: "Síntomas: fiebre, estornudos, conjuntivitis y rinitis, entre otros.",
            },
            {
                subtitle: "Panleucopenia felina",
                description: "Afecta a **gatos**, pudiendo ser muy grave en gatos jóvenes. Es altamente contagiosa.",
                symptoms: "Síntomas: fiebre, vómitos y diarrea con o sin sangre, entre otros."
            }
        ]
    },
    "Leucemia felina": {
        title: "Leucemia felina",
        essential: "No es esencial ni obligatoria.",
        protects: "Recomendada si el gato puede estar en contacto con otros gatos que podrían tener esta enfermedad.",
        details: [
            {
                subtitle: "Síntomas",
                description: "Inmunosupresión que predispone al gato a muchas otras enfermedades infecciosas, tumores e inflamaciones de la boca.",
            }
        ]
    },
    "PIF (Peritonitis infecciosa felina)": {
        title: "PIF (Peritonitis infecciosa felina)",
        essential: "No es esencial ni obligatoria.",
        protects: "Recomendada en colectividades endémicas.",
        details: [
            {
                subtitle: "Síntomas",
                description: "Fiebre, pérdida de peso y acumulación de líquido en abdomen o tórax.",
            }
        ]
    },
    };

    const handleSelectVaccine = (vaccine) => {
        setVaccineData({ ...vaccineData, name: vaccine });
        setSelectedVaccineInfo(vaccineInfo[vaccine]);
        setVaccinePickerVisible(false);
        
    };


    const onDayPressVaccination = (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
            setSelectedVaccinationDate(selectedDate);
            setVaccineData({ ...vaccineData, date: selectedDate });
        }
    };

    const onDayPressNextVaccination = (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
            setSelectedNextVaccinationDate(selectedDate);
            setVaccineData({ ...vaccineData, nextDate: selectedDate });
        }
    };
      // Manejo de la selección de fecha
    const handleDateChange = (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) { // Confirmar la selección de fecha
        setTempDate(selectedDate); // Actualiza la fecha temporal antes de confirmar
        if (Platform.OS === 'ios') {
        }
        }
    };

    const renderVaccineInfo = () => {
        if (!selectedVaccineInfo) return null;

        return (
            <ScrollView style={styles.scrollView}>
                <Text style={styles.modalTitle}>{selectedVaccineInfo.title}</Text>
                <Text style={styles.modalText}>{selectedVaccineInfo.essential}</Text>
                <Text style={styles.modalText}>{selectedVaccineInfo.protects}</Text>
                {selectedVaccineInfo.details.map((detail, index) => (
                    <View key={index}>
                        <Text style={styles.subTitle}>{detail.subtitle}</Text>
                        <Text style={styles.modalText}>{detail.description}</Text>
                        {detail.symptoms && <Text style={styles.modalText}>{detail.symptoms}</Text>}
                    </View>
                ))}
            </ScrollView>
        );
    };
    return (
        <View style={styles.container}>
        {/* Vaccine Selector */}
            <View style={styles.pickerContainer}>
                <TouchableOpacity onPress={() => setVaccinePickerVisible(true)} style={styles.pickerButton}>
                    <Text style={styles.pickerButtonText}>
                        {vaccineData.name ? vaccineData.name : 'Seleccione una vacuna...'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setInfoModalVisible(true)} style={styles.infoButton}>
                    <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
                </TouchableOpacity>
            </View>

            {/* Date Selectors */}

            <View style={styles.datePickerContainer}>
                <TouchableOpacity onPress={() => setShowDatePickerActual(true)}>
                    <Text style={styles.dateButton}>
                        {selectedVaccinationDate ? `Fecha de Vacunación: ${selectedVaccinationDate.toLocaleDateString()}` : 'Selecciona la Fecha de Vacunación'}
                    </Text>
                </TouchableOpacity>
            </View>

            {showDatePickerActual && (
            <View>
                {Platform.OS === 'ios' && (
                <Button title="Confirmar fecha" onPress={() => setShowDatePickerActual(false)} />
                )}
                <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'} // Spinner en iOS, calendario en Android
                    onChange={onDayPressVaccination}
                />
            </View>
            )}

            <View style={styles.datePickerContainer}>
                <TouchableOpacity onPress={() => setShowDatePickerNext(true)}>
                    <Text style={styles.dateButton}>
                        {selectedNextVaccinationDate ? `Próxima Fecha de Vacunación: ${selectedNextVaccinationDate.toLocaleDateString()}` : 'Selecciona la Próxima Fecha de Vacunación'}
                    </Text>
                </TouchableOpacity>
            </View>
            {showDatePickerNext && (
                <View>
                    {Platform.OS === 'ios' && (
                    <Button title="Confirmar fecha" onPress={() => setShowDatePickerNext(false)} />
                    )}
                    <DateTimePicker
                        value={tempDate}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'calendar'} // Spinner en iOS, calendario en Android
                        onChange={onDayPressNextVaccination}
                    />
                </View>
            )}

            {/* Modal for Vaccine Picker */}

            <Modal visible={vaccinePickerVisible} transparent={true} animationType="slide">
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainerVaccines}>
                        <FlatList
                            data={availableVaccines}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.listItem} onPress={() => handleSelectVaccine(item)}>
                                    <Text style={styles.listItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Button title="Cancelar" onPress={() => setVaccinePickerVisible(false)} />
                    </View>
                </View>
            </Modal>

            <Modal visible={infoModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainerInfo}>
                        {renderVaccineInfo()}
                        <Button title="Cerrar" onPress={() => setInfoModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Añadir Vacuna</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFA',
        padding: 16,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    pickerButton: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#C6C6C8',
        paddingVertical: 10,
    },
    pickerButtonText: {
        fontSize: 18,
        color: '#000',
    },
    infoButton: {
        marginRight: 10,
    },
    dateButton: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    dateButtonText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainerInfo: {
        width: 300,
        maxHeight: '80%', // Altura máxima del modal
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalContainerVaccines: {
      width: 300,
      maxHeight: 400, // Altura máxima del modal
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
  },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        //textAlign: 'justify', // Justificado
    },
    scrollView: {
        width: '100%',
    },
    listItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    listItemText: {
        fontSize: 18,
        textAlign: 'center',
    },
    datePickerContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    dateButton: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        textAlign: 'center',
      },
});

export default AddVaccine;
