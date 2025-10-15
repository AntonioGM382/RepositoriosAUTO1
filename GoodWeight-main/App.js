import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import LoginScreen from './src/Screens/Login/LoginScreen';
import RegistrationScreen from './src/views/RegistrationView';
import HomeScreen from './src/Screens/Home/HomeScreen';
import FoodScreen from './src/Screens/Home/FoodScreen'; 
import CreateAnimalScreen from './src/Screens/CreateAnimal/CreateAnimalScreen';
import AnimalDataScreen from './src/Screens/CreateAnimal/AnimalDataScreen';
import AnimalFoodScreen from './src/Screens/CreateAnimal/AnimalFoodScreen';
import QAScreen from './src/Screens/QA/QAScreen';
import SettingsScreen from './src/views/SettingsScreen'; 
import HomeAnimal from './src/views/HomeAnimalView';
import WeightAnimal from './src/views/WeightAnimalView';
import VeterinaryAnimal from './src/views/VeterinaryAnimalView';
import MedicationsPage from './src/views/MedicationPageView';
import AddVisitAnimal from './src/Screens/AnimalScreen/AddVisitAnimal';
import AddMedication from './src/views/AddMedicationView';
import AllMedications from './src/views/AllMedicationsView';
import VaccineAnimal from './src/views/VaccineAnimalView';
import AddVaccine from './src/views/AddVaccineView';
import FoodDetailScreen from './src/Screens/Home/FoodDetailView';
import VerificationScreen from './src/Screens/VerificationScreen'; // Ajusta la ruta según tu estructura
import EditAnimal from './src/views/EditAnimalView';
import EditProfile from './src/views/EditProfile';
import ProfileView from './src/views/ProfileView';
import PaseoStackScreen from './src/navegation/PaseoStackScreen'
import ChatView from './src/views/ChatView'
import RequestView from './src/views/RequestView';
import AllRequestsView from './src/views/AllRequestsView'

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MainAppStack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Verificar si el usuario existe y si su correo ha sido verificado
      if (user && user.emailVerified) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  
  const handleCreateAccount = () => {
    setIsLoggedIn(true);
  }
  const MainAppTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? require('./assets/paw-focused.png') : require('./assets/paw.png');
          } 
          else if (route.name === 'Piensos') {
            iconName = focused ? require('./assets/food-focused.png') : require('./assets/food.png');
          }
          else if (route.name === 'Paseo') {
            iconName = focused ? require('./assets/walking_dog_focused.png') : require('./assets/walking_dog.png');
          }
          return <Image source={iconName} style={focused ? styles.tabIconFocused : styles.tabIcon} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.tabBar,
          position: 'absolute',
          height: '9%',
          paddingBottom: 0,
          backgroundColor: '#044389',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen}  />
      <Tab.Screen name="Piensos" component={FoodScreen} />
      <Tab.Screen name="Paseo" component={PaseoStackScreen} />
    </Tab.Navigator>
  );
  

  return (<ActionSheetProvider>
      <NavigationContainer>
        {!isLoggedIn ? (
          <AuthStack.Navigator>
            <AuthStack.Screen 
              name="Login" 
              children={() => <LoginScreen onLoginSuccess={handleLoginSuccess} />} 
              options={{ headerShown: false }} 
            />
            <AuthStack.Screen 
              name="Registration" 
              children={() => <RegistrationScreen onLoginSuccess={handleCreateAccount} />} 
              options={{ headerShown: false }} 
            />
            <AuthStack.Screen 
              name="Verification" 
              component={VerificationScreen} 
              options={{ headerShown: false }} 
            />
          </AuthStack.Navigator>
      ) : (
        <MainAppStack.Navigator>
          <MainAppStack.Screen
            name="Página principal"
            component={MainAppTabs}
            options={{ headerShown: false }}
          />
          <MainAppStack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
          <MainAppStack.Screen
            name="CreateAnimal"
            component={CreateAnimalScreen}
            options={{ 
              headerTitle: 'Crear Animal', 
              title: 'Crear mascota', 
              headerBackTitle: 'Página Pricipal'
            }} 
          />
          <MainAppStack.Screen
            name="AnimalDataScreen"
            component={AnimalDataScreen}
            options={{ 
              headerTitle: 'Datos del Animal', 
              title: 'Datos del Animal', 
              headerBackTitle: 'Crear Animal' ,
              headerShown: false 

            }}
          />

          <MainAppStack.Screen
            name="AnimalFoodScreen"
            component={AnimalFoodScreen}
            options={{ 
              headerTitle: 'Alimentación del Animal', 
              title: 'Alimentación del Animal', 
              headerBackTitle: 'Datos del Animal' ,
              headerShown: false 

            }}
          />
          <MainAppStack.Screen
            name="FoodDetailScreen"
            component={FoodDetailScreen}
            options={{ 
              headerTitle: 'Detalles del Alimento', 
              headerBackTitle: 'Alimentos' 
            }}
          />
          <MainAppStack.Screen
            name="HomeAnimal"
            component={HomeAnimal}
            options={{
              headerShown: false,
              headerTitle: 'Detalles de la mascota',
              title: 'Detalles de la mascota',
            }}

          />
          <MainAppStack.Screen 
            name="EditAnimal" 
            component={EditAnimal} 
            options={{
              //headerShown: false,
              headerTitle: 'Editar tu mascota',
              title: 'Editar tu mascota',
              headerBackTitle: 'Mascota' 
            }}
          />
          <MainAppStack.Screen
            name='WeightAnimal'
            component={WeightAnimal}
            options={{
              headerTitle: 'Peso de la mascota',
              title: 'Peso de la mascota',
              headerBackTitle: 'Mascota',
            }}
          />
          <MainAppStack.Screen
            name='VeterinaryAnimal'
            component={VeterinaryAnimal}
            options={{
              headerTitle: 'Ficha de la mascota',
              title: 'Ficha de la mascota',
              headerBackTitle: 'Mascota',
            }}
          />
          <MainAppStack.Screen
            name='MedicationsPage'
            component={MedicationsPage}
            options={{
              headerTitle: 'Tratamientos de la visita',
              title: 'Tratamientos de la visita',
              headerBackTitle: 'Ficha',
            }}
          />
          <MainAppStack.Screen
            name='AddVisitAnimal'
            component={AddVisitAnimal}
            options={{
              headerTitle: 'Nueva visita veterinaria',
              title: 'Nueva visita veterinaria',
              headerBackTitle: 'Ficha',
            }}
          />
          <MainAppStack.Screen
            name='AddMedication'
            component={AddMedication}
            options={{
              headerTitle: 'Nuevo tratamiento',
              title: 'Nuevo tratamiento',
              headerBackTitle: 'Mascota',
            }}
          />
          <MainAppStack.Screen
            name='AllMedications'
            component={AllMedications}
            options={{
              headerTitle: 'Tratamientos actuales',
              title: 'Tratamientos actuales ',
              headerBackTitle: 'Mascota',
            }}
          />
          <MainAppStack.Screen
            name='VaccineAnimal'
            component={VaccineAnimal}
            options={{
              headerTitle: 'Vacunas proximas',
              title: 'Vacunas proximas ',
              headerBackTitle: 'Mascota',
            }}
          />
          <MainAppStack.Screen
            name='AddVaccine'
            component={AddVaccine}
            options={{
              headerTitle: 'Añadir Vacuna',
              title: 'Añaadir Vacuna',
              headerBackTitle: 'Mascota',
            }}
          />
          <MainAppStack.Screen
            name='QAScreen'
            component={QAScreen}
            options={{
              headerShown: false,
            }}
          />
          <MainAppStack.Screen
            name='ProfileView'
            component={ProfileView}
            options={{
              headerShown: false,
            }}
          />
          <MainAppStack.Screen
            name='EditProfile'
            component={EditProfile}
            options={{
              headerShown: false,
            }}
          />
          <MainAppStack.Screen
            name='ChatView'
            component={ChatView}
            options={{
              headerShown: false,
            }}
          />
          <MainAppStack.Screen
            name='RequestView'
            component={RequestView}
            options={{
              headerShown: false,
            }}
          />
          <MainAppStack.Screen
            name='AllRequestsView'
            component={AllRequestsView}
            options={{
              headerShown: false,
            }}
          />
        </MainAppStack.Navigator>
      )}
    </NavigationContainer>
    </ActionSheetProvider>);
};

export default App;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#303656',
    borderTopColor: 'transparent',
  },
  tabIcon: {
    width: 30,
    height: 30,
    opacity: 0.7,
  },
  tabIconFocused: {
    width: 30,
    height: 30,
    opacity: 1,
  },
});
