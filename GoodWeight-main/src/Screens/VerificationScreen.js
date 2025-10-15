import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, sendEmailVerification } from 'firebase/auth'; // Asegúrate de importar getAuth y sendEmailVerification

const VerificationScreen = () => {
  const navigation = useNavigation();

  const handleGoToLogin = () => {
    navigation.navigate('Login'); // Cambia 'Login' por el nombre exacto de tu pantalla de inicio de sesión
  };

  const handleResendVerification = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        await sendEmailVerification(user);
        Alert.alert('Verificación reenviada', 'Se ha enviado un nuevo correo de verificación a tu dirección de correo electrónico.');
      } catch (error) {
        console.error("Error al reenviar el correo de verificación: ", error);
        Alert.alert('Error', 'No se pudo reenviar el correo de verificación. Inténtalo de nuevo más tarde.');
      }
    } else {
      Alert.alert('Error', 'No hay usuario autenticado.'); // Maneja el caso donde no hay usuario
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Verificación de Correo Enviada!</Text>
      <Text style={styles.message}>
        Hemos enviado un correo electrónico de verificación. Por favor, verifica tu bandeja de entrada.
      </Text>
      <TouchableOpacity onPress={handleResendVerification} style={styles.link}>
        <Text style={styles.linkText}>Reenviar correo de verificación</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGoToLogin}>
        <Text style={styles.buttonText}>¿Ya has verificado? Inicia Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFA',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#044389',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#A7A7A7',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6ec1f2',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    marginTop: '3%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: 'black',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default VerificationScreen;
