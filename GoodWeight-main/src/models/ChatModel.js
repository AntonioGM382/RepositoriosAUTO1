import { FIRESTORE_DB } from '../firebase/firebaseConfig';
import { collection, doc, addDoc, setDoc, serverTimestamp } from 'firebase/firestore';

class ChatModel{

  async sendMessage (senderId, receiverId, text){
    const message = {
      text,
      createdAt: serverTimestamp(),
      senderId,
      receiverId,
    };

    await addDoc(collection(FIRESTORE_DB, 'users', senderId, 'chats', receiverId, 'mensajes'), message);
    await setDoc(doc(FIRESTORE_DB, 'users', senderId, 'chats', receiverId), {
      lastMessage: text,
      lastMessageTimestamp: serverTimestamp(),
    }, { merge: true });

    await addDoc(collection(FIRESTORE_DB, 'users', receiverId, 'chats', senderId, 'mensajes'), message);
    await setDoc(doc(FIRESTORE_DB, 'users', receiverId, 'chats', senderId), {
      lastMessage: text,
      lastMessageTimestamp: serverTimestamp(),
    }, { merge: true });
  }
}

export default ChatModel;

