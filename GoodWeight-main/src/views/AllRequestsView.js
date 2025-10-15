import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { getAuth } from 'firebase/auth';
import WalkingModel from '../models/WalkingModel';
import RequestCard from '../components/RequestCard'; // Asegúrate de que la ruta sea correcta

const AllRequestsView = () => {
  const user = getAuth().currentUser;
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'sent', title: 'Enviadas' },
    { key: 'received', title: 'Recibidas' },
  ]);
  const walkingModel = new WalkingModel();

  useEffect(() => {
    const fetchRequests = async () => {
      const sent = await walkingModel.getSentRequests(user.uid);
      console.log("hola");
      const received = await walkingModel.getReceivedRequests(user.uid);
      setSentRequests(sent);
      setReceivedRequests(received);
    };
    fetchRequests();
  }, []);

  
  const  handleAccept = async (requestId) => {
    const result = await walkingModel.updateRequestStatus(user.uid, requestId, 'accepted')
    
    if (result.success) {
      console.log('Solicitud Aceptada exitosamente.');
    } else {
      console.error('Error eliminando la solicitud:', response.error);
    }
  };

  const handleDeny = async (requestId) => {
    const result = await walkingModel.deleteRequest(user.uid, requestId)


    if (result.success) {
      console.log('Solicitud eliminada exitosamente.');
    } else {
      console.error('Error eliminando la solicitud:', response.error);
    }

  };

  const renderSentRequestCard = ({ item }) => (
    <RequestCard
      request={item}
      user = {item.sender}
      
    />
  );

  const renderReceivedRequestCard = ({ item }) => (
    
    <RequestCard
      request={item}
      user = {item.sender}
      onAccept={() => handleAccept(item.id)}
      onDeny={() => handleDeny(item.id)}
    />
  );

  const SentRequestsRoute = () => (
    <FlatList
      data={sentRequests}
      renderItem={renderSentRequestCard}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.flatListContent}
    />
  );

  const ReceivedRequestsRoute = () => (
    <FlatList
      data={receivedRequests}
      renderItem={renderReceivedRequestCard}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.flatListContent}
    />
  );

  const renderScene = SceneMap({
    sent: SentRequestsRoute,
    received: ReceivedRequestsRoute,
  });

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: '100%' }}
        style={styles.tabView}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFA',
  },
  tabView: {},
  flatListContent: {
    paddingHorizontal: '2%',
    paddingVertical: 10,
  },
});

export default AllRequestsView;
