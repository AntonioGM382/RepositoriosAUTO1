import { collection, addDoc, query, where, getDocs, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';

import { FIRESTORE_DB } from '../firebase/firebaseConfig';

class WalkingModel {
    async addAnnouncement(newAnnouncement) {
        try {
            // Guardar el anuncio en Firestore
            const docRef = await addDoc(collection(FIRESTORE_DB, 'announcements'), newAnnouncement);
            console.log('Anuncio añadido con ID:', docRef.id);
            return { success: true, id: docRef.id }; // Return success and the doc ID
        } catch (error) {
            console.error('Error al agregar el anuncio:', error);
            return { success: false, error: error.message };
        }
    }

    async getUserAnnouncements(userId) {
        try {
            const q = query(collection(FIRESTORE_DB, 'announcements'), where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            const announcements = [];
            querySnapshot.forEach((doc) => {
                announcements.push({ ...doc.data(), id: doc.id }); // Ensure the 'id' is set
            });
            return announcements;
        } catch (error) {
            console.error('Error al obtener los anuncios:', error);
            return [];
        }
    }

    async sendRequest(request) {
        try {
            const senderRef = await addDoc(collection(FIRESTORE_DB, 'users', request.senderId, 'requests'), request);
            console.log('Solicitud enviada exitosamente:', senderRef.id);
            const receiverRef = await addDoc(collection(FIRESTORE_DB, 'users', request.receiverId, 'requests'), request);
            console.log('Solicitud enviada exitosamente:', receiverRef.id);
            return { success: true}; // Return success and the doc ID
            } catch (error) {
            console.error("Error al enviar la solicitud: ", error);
            alert("Hubo un error al enviar la solicitud. Inténtalo de nuevo.");
            return { success: false, id: docRef.id }; // Return success and the doc ID
        }
    }
    async getSentRequests(userId) {
        try {
          const sentRequestsRef = query(
            collection(FIRESTORE_DB, 'users', userId, 'requests'),
            where('senderId', '==', userId)
          );
          const sentRequestsSnapshot = await getDocs(sentRequestsRef);
          
          const requests = await Promise.all(
            sentRequestsSnapshot.docs.map(async (requestDoc) => {
              const requestData = requestDoc.data();
              
              // Fetch announcement details
              const announcementRef = doc(FIRESTORE_DB, 'announcements', requestData.announcementId);
              const announcementDoc = await getDoc(announcementRef);
              const announcementData = announcementDoc.exists() ? announcementDoc.data() : null;
    
              // Fetch receiver (user) details
              const receiverRef = doc(FIRESTORE_DB, 'users', requestData.senderId);
              const receiverDoc = await getDoc(receiverRef);
              const receiverData = receiverDoc.exists() ? receiverDoc.data() : null;
    
              return {
                id: requestDoc.id,
                ...requestData,
                announcement: announcementData,
                sender: receiverData,
              };
            })
          );
    
          return requests;
        } catch (error) {
          console.error('Error al obtener solicitudes enviadas:', error);
          return [];
        }
      }
    
      async getReceivedRequests(userId) {
        try {
          const receivedRequestsRef = query(
            collection(FIRESTORE_DB, 'users', userId, 'requests'),
            where('receiverId', '==', userId)
          );
          const receivedRequestsSnapshot = await getDocs(receivedRequestsRef);
    
          const requests = await Promise.all(
            receivedRequestsSnapshot.docs.map(async (requestDoc) => {
              const requestData = requestDoc.data();
    
              // Fetch announcement details
              const announcementRef = doc(FIRESTORE_DB, 'announcements', requestData.announcementId);
              const announcementDoc = await getDoc(announcementRef);
              const announcementData = announcementDoc.exists() ? announcementDoc.data() : null;
    
              // Fetch sender (user) details
              const senderRef = doc(FIRESTORE_DB, 'users', requestData.senderId);
              const senderDoc = await getDoc(senderRef);
              const senderData = senderDoc.exists() ? senderDoc.data() : null;
    
              return {
                id: requestDoc.id,
                ...requestData,
                announcement: announcementData,
                sender: senderData,
              };
            })
          );
    
          return requests;
        } catch (error) {
          console.error('Error al obtener solicitudes recibidas:', error);
          return [];
        }
      }
      async updateRequestStatus(userId, requestId, newStatus) {
        try {
          const requestRef = doc(FIRESTORE_DB, 'users', userId, 'requests', requestId);
          
          // Actualizar el campo 'status'
          await updateDoc(requestRef, { status: newStatus });
      
          console.log('Estado de la solicitud actualizado con éxito:', requestId);
          return { success: true };
        } catch (error) {
          console.error('Error al actualizar el estado de la solicitud:', error);
          return { success: false, error: error.message };
        }
      }

      async deleteRequest(userId, requestId) {
        try {
          const requestRef = doc(FIRESTORE_DB, 'users', userId, 'requests', requestId);

          // Eliminar el documento
          await deleteDoc(requestRef);

          console.log('Solicitud eliminada con éxito:', requestId);
          return { success: true };
        } catch (error) {
          console.error('Error al eliminar la solicitud:', error);
          return { success: false, error: error.message };
        }
      }

}


export default WalkingModel;
