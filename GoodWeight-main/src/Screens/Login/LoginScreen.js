import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      await user.reload();

      if (user.emailVerified) {
        onLoginSuccess();
      } else {
        navigation.navigate('Verification');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error de autenticación', error.message || 'Correo electrónico o contraseña inválidos.');
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      Alert.alert('Correo enviado', 'Por favor, revisa tu correo electrónico para restablecer la contraseña.');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo enviar el correo de restablecimiento. Prueba a escribir tu correo electronico en el campo "Mail"');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.login}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>Introduce tus credenciales</Text>
          <TextInput
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Mail"
            keyboardType="email-address"
            placeholderTextColor="#A7A7A7"
          />
          <TextInput
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={true}
            placeholderTextColor="#A7A7A7"
          />
          <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
            Has olvidado tu contraseña?
          </Text>
          <TouchableOpacity onPress={handleSignIn} style={styles.button}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={styles.button}>
            <Text style={styles.buttonText}> Crear una cuenta </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#044389',
    //6Ec1F2
    //fc9e4f
    backgroundColor: '#FFFFFA',
    justifyContent: 'space-between',
    padding: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#044389',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#A7A7A7',
    marginBottom: 30,
  },
  login: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    width: '100%',
    borderWidth: 2,
    borderColor: '#044389'
  },
  button: {
    backgroundColor: '#6Ec1F2',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    left: 110,
    color: 'black',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 20,
    textDecorationLine: 'underline',

  },
  registerText: {
    color: 'white',
    fontSize: 14,
    marginTop: 20,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
});
