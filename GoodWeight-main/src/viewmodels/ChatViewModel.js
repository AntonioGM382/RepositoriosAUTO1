import { useState, useEffect} from 'react';
import { Keyboard } from 'react-native';
import { FIRESTORE_DB } from '../firebase/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import ChatModel from '../models/ChatModel';
import ProfileModel from '../models/ProfileModel';

const ChatViewModel = (user, otherUserId, flatListRef) => {
    const [messages, setMessages] = useState([]);
    const [otherUserName, setOtherUserName] = useState("");
    useEffect(() => {
        //console.log(user)
        const messagesRef = collection(FIRESTORE_DB, 'users', user.uid, 'chats', otherUserId, 'mensajes');
        const q = query(messagesRef, orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const loadedMessages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setMessages(loadedMessages);
        });

        loadName();
        return () => unsubscribe();
    }, [user.uid, otherUserId]);

    useEffect(() => {
        // Cuando el teclado se muestra, desplazamos la lista al final
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            flatListRef.current?.scrollToEnd({ animated: true });
        });
        
        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages]);
    
    const loadName = async() =>{
        const profileModel = new ProfileModel();
        const otherUserData = await profileModel.fetchProfileData(otherUserId);
        const name = otherUserData?.name || "Usuario No Encontrado";
        const surname = otherUserData?.surname || "";
        setOtherUserName(name +" " +surname);
    }

    const sendMessage = async (text) => {
        const chatModel = new ChatModel();
        await chatModel.sendMessage(user.uid, otherUserId, text)
    };
    
    const handleSend = async () => {
        if (input.trim()) {
            await sendMessage(user.uid, otherUserId, input);
            setInput('');
        }
    };

    return {
        messages,
        otherUserName,
        sendMessage
    };

};

export default ChatViewModel;