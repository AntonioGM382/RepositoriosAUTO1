import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import zxcvbn from 'zxcvbn'; // Importar zxcvbn para evaluar la seguridad de la contraseña
import RegistrationViewModel from '../viewmodels/RegistrationViewModel'; 

export default function RegistrationScreen() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [veterinary, setVeterinary] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0); // Guardar la fortaleza de la contraseña

  const navigation = useNavigation();
  const registrationViewModel = new RegistrationViewModel(navigation);

  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    registrationViewModel.createAccount(name, surname, email, veterinary, password);
  };

  // Función para evaluar la fortaleza de la contraseña
  const evaluatePasswordStrength = (password) => {
    const evaluation = zxcvbn(password); 
    setPasswordStrength(evaluation.score); // Guardar la fortaleza (0 a 4)
  };

  return (
    <View style={styles.container}>
      {/* ScrollView con evento onScroll */}
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        onScrollBeginDrag={() => Keyboard.dismiss()} // Ocultar teclado al hacer scroll
        keyboardShouldPersistTaps="handled" // Permitir que el scroll capture los taps para cerrar el teclado
        scrollEnabled={true}
      >
        <Text style={styles.title}>Comencemos!</Text>
        <Text style={styles.subtitle}>Rellena los datos para registrarte</Text>
        <TextInput
          onChangeText={setName}
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#a9a9a9"
        />
        <TextInput
          onChangeText={setSurname}
          style={styles.input}
          placeholder="Apellidos"
          placeholderTextColor="#a9a9a9"
        />
        <TextInput
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Correo"
          keyboardType="email-address"
          placeholderTextColor="#a9a9a9"
        />
        <TextInput
          onChangeText={setVeterinary}
          style={styles.input}
          placeholder="Centro Veterinario Habitual"
          placeholderTextColor="#a9a9a9"
        />
        
        <TextInput
          onChangeText={(password) => {
            setPassword(password);
            evaluatePasswordStrength(password); // Evaluar la fortaleza de la contraseña al escribir
          }}
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#a9a9a9"
          secureTextEntry={true}
          textContentType="none" // Esto evitará que iOS ofrezca sugerencias

        />
        {/* Mostrar la evaluación de la seguridad de la contraseña */}
        <View style={styles.passwordStrengthContainer}>
          <Text style={styles.passwordStrengthText}>
            Seguridad de la contraseña: {['Muy débil', 'Débil', 'Moderada', 'Fuerte', 'Muy fuerte'][passwordStrength]}
          </Text>
          <View style={[styles.strengthBar, { width: `${(passwordStrength + 1) * 20}%`, backgroundColor: getPasswordStrengthColor(passwordStrength) }]} />
        </View>
        <TextInput
          onChangeText={setConfirmPassword}
          style={styles.input}
          placeholder="Repetir Contraseña"
          secureTextEntry={true}
          placeholderTextColor="#a9a9a9"
        />
        <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.loginButton}
        >
          <Text style={styles.loginText}>Ya tengo cuenta, Iniciar Sesión.</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://example.com/terms')}>
          <Text style={styles.termsText}>
            Registrándome acepto los siguientes Términos de uso y política de privacidad.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// Función para obtener el color de la barra de seguridad según la fortaleza de la contraseña
const getPasswordStrengthColor = (score) => {
  switch (score) {
    case 0:
      return 'red';
    case 1:
      return 'orange';
    case 2:
      return 'yellow';
    case 3:
      return 'lightgreen';
    case 4:
      return 'green';
    default:
      return 'red';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#044389',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#A7A7A7',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    marginBottom: 20,
    paddingLeft: 20,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#044389',
  },
  passwordStrengthContainer: {
    marginBottom: 20,
  },
  passwordStrengthText: {
    fontSize: 14,
    color: 'black',
  },
  strengthBar: {
    height: 5,
    borderRadius: 2,
    marginTop: 5,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#6Ec1F2',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    marginBottom: 20,
  },
  loginText: {
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'underline',
  },
  termsText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
  },
});
