import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth } from './firebase';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = () => {
    auth
    .createUserWithEmailAndPassword(email, password, username)
    .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Kullanıcı ', user.email);
    })
    .catch((error) => alert(error.massage));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Üye Ol</Text>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="E-Posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Üye Ol" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
});

export default SignupScreen;
