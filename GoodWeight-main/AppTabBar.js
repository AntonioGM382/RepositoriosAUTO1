import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import HomeScreen from './src/Screens/Home/HomeScreen';
import FoodScreen from './src/Screens/Home/FoodScreen'; // Assuming you have this screen
import QAScreen from './src/Screens/Home/QAScreen'; // Assuming you have this screen
import SettingsScreen from './src/Screens/Home/SettingsScreen'; // Assuming you have this screen
import InitialScreen from './src/Screens/InitialScreen'; // Assuming you have this screen
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Initial"
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#7',
            height: 60,
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarIcon: ({ focused }) => {
            let iconName;
            let iconStyle = focused
              ? { width: 40, height: 40, borderRadius: 20, backgroundColor: 'white' } // Larger icon for focused
              : { width: 30, height: 30 }; // Smaller icon for unfocused

            if (route.name === 'Home') {
              iconName = focused
                ? require('../GoodWeight/assets/paw.png') // Use your focused icon
                : require('../GoodWeight/assets/paw.png');
            } else if (route.name === 'Food') {
              iconName = focused
                ? require('../GoodWeight/assets/food.png') // Use your focused icon
                : require('../GoodWeight/assets/food.png');
            } else if (route.name === 'QA') {
              iconName = focused
                ? require('../GoodWeight/assets/faq.png') // Use your focused icon
                : require('../GoodWeight/assets/faq.png');
            } else if (route.name === 'Settings') {
              iconName = focused
                ? require('../GoodWeight/assets/settings.png') // Use your focused icon
                : require('../GoodWeight/assets/settings.png');
            }
            return (
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                ...iconStyle
              }}>
                <Image source={iconName} style={{ width: iconStyle.width, height: iconStyle.height }} />
              </View>
              );
          },
          
        })}
      >
        <Tab.Screen name="Initial" component={InitialScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Food" component={FoodScreen} />
        <Tab.Screen name="QA" component={QAScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="CreateAnimal" component={CreateAnimalScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
