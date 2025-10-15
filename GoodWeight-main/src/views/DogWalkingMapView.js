import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const DogWalkingMap = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [usersNearby, setUsersNearby] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      
      // Simula usuarios cercanos
      setUsersNearby([
        { id: 1, latitude: currentLocation.coords.latitude + 0.001, longitude: currentLocation.coords.longitude + 0.001, name: 'Usuario 1' },
        { id: 2, latitude: currentLocation.coords.latitude - 0.001, longitude: currentLocation.coords.longitude - 0.001, name: 'Usuario 2' },
      ]);
    })();
  }, []); 

  if (!location) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        {usersNearby.map(user => (
          <Marker
            key={user.id}
            coordinate={{ latitude: user.latitude, longitude: user.longitude }}
            title={user.name}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFA',
  },
  map: {
    width: '100%',
    height: '90%',
  },
});

export default DogWalkingMap;
