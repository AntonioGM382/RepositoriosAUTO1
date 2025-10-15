import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const MessageBubble = ({ children, isUser }) => {
  return (
    <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.serverBubble]}>
      <Text style={[styles.messageText, isUser ? styles.userText : styles.serverText]}>{children}</Text>
    </View>
  );
};

const QAScreen = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hola, soy el bot de GoodWeight! Puedo resolver dudas sobre tu mascota. ¿En qué te puedo ayudar?",
      isUser: false,
    }
  ]);  
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    const userMessage = { text: inputText, isUser: true };
    setMessages([...messages, userMessage]);
    setInputText('');

    // Scroll to the bottom when a message is sent
    scrollViewRef.current.scrollToEnd({ animated: true });

    try {
      const response = await axios.post('http://localhost:3001/generateCompletion', { prompt: inputText });
      const serverMessage = { text: response.data.completion, isUser: false };
      setMessages(messages => [...messages, serverMessage]);
    } catch (error) {
      setMessages(messages => [...messages, { text: 'Error al comunicarse con el servidor...', isUser: false }]);
    }
  };

  const Disclaimer = () => {
    return (
      <View style={styles.disclaimerContainer}>
        <Text style={styles.disclaimerText}>
        Esto es sólo para fines informativos y no sustituye el asesoramiento médico profesional.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <Disclaimer />
        <ScrollView 
          style={styles.messagesContainer}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, index) => (
            <MessageBubble key={index} isUser={msg.isUser}>
              {msg.text}
            </MessageBubble>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Introduce tu pregunta..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    marginVertical: 4,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    elevation: 2,  // Sombra ligera para mayor profundidad
  },
  userBubble: {
    backgroundColor: '#007bff',
    marginLeft: '20%',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,  // Borde superior derecho plano para mayor estilo
  },
  serverBubble: {
    backgroundColor: '#e0e0e0',
    borderTopLeftRadius: 0,  // Borde superior izquierdo plano para mayor estilo
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
  userText: {
    color: 'white',
  },
  serverText: {
    color: 'black',
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimerContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  disclaimerText: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
  },
});

export default QAScreen;
